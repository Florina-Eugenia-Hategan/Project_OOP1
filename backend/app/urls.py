from django.urls import path
from .views import SignupView, LoginView, Verify2FAView, RecoverPasswordView, ResetPasswordView, test_cache

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-2fa/', Verify2FAView.as_view(), name='verify-2fa'),
    path('recover-password/', RecoverPasswordView.as_view(), name='recover-password'),
    path('reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset-password'),
    path('test-cache/', test_cache, name='test_cache'),
]
