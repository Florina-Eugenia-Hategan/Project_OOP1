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

class RecoverPasswordView(APIView):
	def post(self, request):
		email = request.data.get('email')
		if not email:
			return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
		users = User2FA.objects.filter(email=email)
		if users.exists():
			for user in users:
				token = get_random_string(32)
				cache.set(f"reset_token_{token}", user.id, timeout=3600)  # valabil 1 oră
				reset_link = f"http://localhost:3000/reset-password/{token}/"
				send_mail(
					'Password Recovery',
					f'Click the link to reset your password: {reset_link}',
					settings.EMAIL_HOST_USER,
					[email],
					fail_silently=False,
				)
		# Mesaj generic, indiferent dacă emailul există sau nu
		return Response({'message': 'Dacă adresa de email există, vei primi un link de resetare.'}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
	def post(self, request, token):
		new_password = request.data.get('password')
		if not new_password:
			return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)
		user_id = cache.get(f"reset_token_{token}")
		if not user_id:
			return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = User2FA.objects.get(id=user_id)
			user.set_password(new_password)
			user.save()
			cache.delete(f"reset_token_{token}")
			return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
		except User2FA.DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

class SignupView(APIView):
	def post(self, request):
		serializer = User2FASerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			return Response({'message': f'Cont creat cu succes pentru {user.username}!'}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(username=username, password=password)
		if user:
			refresh = RefreshToken.for_user(user)
			return Response({'access': str(refresh.access_token), 'refresh': str(refresh)}, status=status.HTTP_200_OK)
		return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

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
