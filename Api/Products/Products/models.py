from django.db import models

class Product(models.Model):
	name = models.CharField(max_length=50)
	photo = models.CharField(max_length=255, blank=True, null=True)
	description = models.TextField()
	price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True, null=True)

	class Meta:
			managed = False
			db_table = 'products'