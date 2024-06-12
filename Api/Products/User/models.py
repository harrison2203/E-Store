from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
	username = models.CharField(max_length=25)
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)
	email = models.EmailField(max_length=255, unique=True)
	password = models.CharField(max_length=50)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True, null=False)

	USERNAME_FIELD = 'username'

	class Meta:
		managed = False
		db_table = 'auth_user'
