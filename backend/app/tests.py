from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from app.models import User2FA

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.verify_url = reverse('verify-2fa')

    def test_signup_and_login_2fa(self):
        # Signup
        response = self.client.post(self.signup_url, {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpass123'
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User2FA.objects.filter(username='testuser').exists())

        # Login
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'testpass123'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        user_id = response.data['user_id']
        user = User2FA.objects.get(id=user_id)
        code = user.two_factor_code

        # Verify 2FA
        response = self.client.post(self.verify_url, {
            'user_id': user_id,
            'code': code
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
