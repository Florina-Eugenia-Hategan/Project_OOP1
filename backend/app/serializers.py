from rest_framework import serializers
from .models import User2FA

class User2FASerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    class Meta:
        model = User2FA
        fields = ['id', 'username', 'email', 'password', 'two_factor_code', 'two_factor_expiry']

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email')
        if not email:
            raise serializers.ValidationError({'email': 'Email is required.'})
        if User2FA.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists.'})
        user = User2FA(**validated_data)
        user.set_password(password)
        user.save()
        return user
