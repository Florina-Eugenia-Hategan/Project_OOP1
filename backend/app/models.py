# Pentru 2FA, extindem modelul User cu un cod 2FA
from django.contrib.auth.models import AbstractUser
from django.db import models

class User2FA(AbstractUser):
	email = models.EmailField(unique=True, blank=False, null=False)
	two_factor_code = models.CharField(max_length=6, blank=True, null=True)
	two_factor_expiry = models.DateTimeField(blank=True, null=True)
