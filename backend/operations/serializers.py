from rest_framework import serializers
from .models import OperationRequest

class OperationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperationRequest
        fields = '__all__'
