from django.core import serializers
from models import User

class UserSerializer (serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email', 'password']


