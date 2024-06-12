from django import forms
from Products.models import Product

class ProductCreateForm(forms.ModelForm):
	class Meta:
		model = Product
		fields = ['name', 'photo', 'description', 'price']

class ProductUpdateForm(forms.ModelForm):
	class Meta:
		model = Product
		fields = ['name', 'photo', 'description', 'price']
