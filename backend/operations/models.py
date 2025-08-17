from django.db import models

class RequestLog(models.Model):
    OPERATION_CHOICES = [
        ('pow', 'Power'),
        ('fibonacci', 'Fibonacci'),
        ('factorial', 'Factorial'),
    ]
    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES)
    input_data = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=100, blank=True, null=True)
from django.db import models

class OperationRequest(models.Model):
    OPERATION_CHOICES = [
        ('pow', 'Power'),
        ('fibonacci', 'Fibonacci'),
        ('factorial', 'Factorial'),
    ]
    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES)
    input_data = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.operation}({self.input_data}) = {self.result}"
