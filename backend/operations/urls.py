from django.urls import path
from .views import PowView, FibonacciView, FactorialView

urlpatterns = [
    path('pow/', PowView.as_view(), name='pow'),
    path('fibonacci/', FibonacciView.as_view(), name='fibonacci'),
    path('factorial/', FactorialView.as_view(), name='factorial'),
]
