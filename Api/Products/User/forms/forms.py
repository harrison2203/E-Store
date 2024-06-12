from django import forms
from User.models import User

class UserCreateForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email', 'password']
		widgets = {
			'password': forms.PasswordInput(),
		}

class UserLoginForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ['username', 'password']
		widgets = {
			'password': forms.PasswordInput(),
		}