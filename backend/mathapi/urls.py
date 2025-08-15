"""
URL configuration for mathapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from operations.views import HealthView
from django_prometheus import exports

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('operations.urls')),
    path('auth/', include('app.urls')),
    path('api/health/', HealthView.as_view(), name='health'),
    path('', lambda request: HttpResponse("<h2>Backend Django REST API - vezi /api/ pentru endpointuri</h2>", content_type="text/html")),
    path('metrics/', exports.ExportToDjangoView, name='metrics'),
]
