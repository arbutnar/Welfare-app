import os
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

from .models import User, Worksite


class WorksiteDataSerializer(serializers.ModelSerializer):
	class Meta:
		model = Worksite
		fields = ['department', 'address']

class UserSerializer(serializers.ModelSerializer):
	worksite = serializers.CharField(source='worksite.__str__', read_only=True)

	class Meta:
		model = User
		fields = [
			'email', 'name', 'surname', 'birthday',
			'interest', 'marital_status', 'childrens', 'elderly_parents',
			'worksite', 'street', 'postal_code', 'city', 'country',
			'physical', 'economic', 'psychological', 'family',
			'date_joined', 'is_active', 'is_staff', 'is_superuser'
		]
		read_only_fields = ['date_joined', 'is_active', 'is_staff', 'is_superuser']

class SignupSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
	password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

	class Meta:
		model = User
		fields = [
			'email', 'password', 'name', 'surname', 'birthday',
			'interest', 'marital_status', 'childrens', 'elderly_parents',
			'worksite', 'street', 'postal_code', 'city', 'country',
			'physical', 'economic', 'psychological', 'family',
			'date_joined', 'is_active', 'is_staff', 'is_superuser'
		]

	def validate(self, data):
		return super().validate(data)

class LoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ("email", "password")

	def validate(self, data):
		email = data.get('email')
		password = data.get('password')
		user = authenticate(email=email, password=password)
		if user is None:
			raise serializers.ValidationError("Invalid email or password")
		data['user'] = user
		return data

class ForgotPasswordSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)

	def validate_email(self, value):
		try:
			user = User.objects.get(email=value)
		except User.DoesNotExist:
			raise serializers.ValidationError("User with this email does not exist.")
		return value