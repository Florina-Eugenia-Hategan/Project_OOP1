from rest_framework.decorators import api_view
# Suggest email(s) for a given username
@api_view(['POST'])
def suggest_email(request):
	username = request.data.get('username')
	if not username:
		return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)
	users = User2FA.objects.filter(username=username)
	emails = list(users.values_list('email', flat=True))
	if emails:
		return Response({'emails': emails}, status=status.HTTP_200_OK)
	return Response({'error': 'No email found for this username.'}, status=status.HTTP_404_NOT_FOUND)
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User2FA
from .serializers import User2FASerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import random
import datetime
from django.http import JsonResponse
import pika

# Helper for sending logs to RabbitMQ
def send_to_rabbitmq(message):
	try:
		connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
		channel = connection.channel()
		channel.queue_declare(queue='app_logs', durable=True)
		channel.basic_publish(
			exchange='',
			routing_key='app_logs',
			body=message,
			properties=pika.BasicProperties(delivery_mode=2)
		)
		connection.close()
	except Exception as e:
		pass  # Optionally log locally if RabbitMQ is down
class RecoverPasswordView(APIView):
	def post(self, request):
		email = request.data.get('email')
		if not email:
			return Response({'error': 'Please enter your email address.'}, status=status.HTTP_400_BAD_REQUEST)
		users = User2FA.objects.filter(email=email)
		if users.exists():
			for user in users:
				token = get_random_string(32)
				cache.set(f"reset_token_{token}", user.id, timeout=3600)  # valid for 1 hour
				reset_link = f"http://localhost:3000/reset-password/{token}/"
				send_mail(
					'Password Recovery',
					f'To reset your password, please click the following link: {reset_link}\nIf you did not request a password reset, please ignore this email.',
					settings.EMAIL_HOST_USER,
					[email],
					fail_silently=False,
				)
		# Generic message, regardless if the email exists or not
		return Response({'message': 'If an account with that email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
	def post(self, request, token):
		new_password = request.data.get('password')
		if not new_password:
			return Response({'error': 'Please enter a new password.'}, status=status.HTTP_400_BAD_REQUEST)
		user_id = cache.get(f"reset_token_{token}")
		if not user_id:
			return Response({'error': 'This password reset link is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = User2FA.objects.get(id=user_id)
			user.set_password(new_password)
			user.save()
			cache.delete(f"reset_token_{token}")
			return Response({'message': 'Your password has been reset successfully. You can now log in with your new password.'}, status=status.HTTP_200_OK)
		except User2FA.DoesNotExist:
			return Response({'error': 'User account not found.'}, status=status.HTTP_404_NOT_FOUND)

class SignupView(APIView):
	def post(self, request):
		serializer = User2FASerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			send_to_rabbitmq(f"Signup: username={user.username}, email={user.email}")
			return Response({'message': f'Account created successfully for {user.username}!'}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(username=username, password=password)
		if user:
			send_to_rabbitmq(f"Login: username={username}")
			refresh = RefreshToken.for_user(user)
			return Response({'access': str(refresh.access_token), 'refresh': str(refresh)}, status=status.HTTP_200_OK)
		return Response({'error': 'Invalid credentials or inactive user'}, status=status.HTTP_401_UNAUTHORIZED)

class Verify2FAView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        code = request.data.get('code')
        user = User2FA.objects.filter(id=user_id).first()
        if user and user.verify_code(code):
            refresh = RefreshToken.for_user(user)
            return Response({'access': str(refresh.access_token), 'refresh': str(refresh)}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid 2FA code'}, status=status.HTTP_401_UNAUTHORIZED)

def test_cache(request):
    cache.set('test_key', 'test_value', timeout=30)  # Setăm o valoare în cache
    value = cache.get('test_key')  # Recuperăm valoarea din cache
    return JsonResponse({'cached_value': value})
