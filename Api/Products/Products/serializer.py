from django.core import serializers
from rest_framework import serializers
from Products.models import Product

class ProductSerializer (serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = ["name", "photo", "description", "price"]
