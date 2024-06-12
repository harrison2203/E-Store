from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from Products.forms.forms import ProductCreateForm
from django.core.serializers import serialize
from django.forms.models import model_to_dict
from Products.models import Product
import json, jwt
import environ
import os

env = environ.Env()
SECRET_KEY = os.environ.get('SECRET_KEY', "secret")

#good - all
def GetProducts(request):
	if request.method == 'GET':
		products = Product.objects.all()
		serialized_data = serialize('json', products)
		serialized_data = json.loads(serialized_data)
		return JsonResponse({'The producs are': serialized_data}, status=200)
	else:
		return JsonResponse({'Message': 'This method is not allowed'}, status=405)

#good -all
def GetProductById (request, id):
	if request.method =='GET':
		product = get_object_or_404(Product, id=id)
		return JsonResponse(model_to_dict(product), status=200)
	else:
		return JsonResponse({'Message': 'This method is not allowed'}, status=405)

# ADMIN - good
def CreateProduct (request):
	if request.method == 'POST':
		tokenAccess = decodeToken(request)
		if tokenAccess is not None:
			defineUser = tokenAccess['is_super_user']
			if defineUser == True:
				form = ProductCreateForm(request.POST)
				if form.is_valid():
					product = Product(
					name = form.cleaned_data.get('name'),
					photo = form.cleaned_data.get('photo'),
					description = form.cleaned_data.get('description'),
					price = form.cleaned_data.get('price'),
					)
					product.save()
					return JsonResponse({'name': product.name,
															'photo': product.photo,
															'description': product.description,
															'price': product.price}, status=201)
			else:
				return JsonResponse({'Message': 'You dont have the rights to create products'}, status=403)
		else:
			return JsonResponse({'Message': 'You are not authenticated'}, status=401)
	else:
		form =  ProductCreateForm()
		return JsonResponse({'Message': 'This method is not allowed'}, status=405)

#ADMIN - Good
def DeleteProduct(request, id):
	print( "test deleete")
	if request.method == 'DELETE':
		tokenAccess = decodeToken(request)
		defineUser = tokenAccess['is_super_user']
		if tokenAccess is not None and defineUser == True:
			try:
				product = Product.objects.get(id=id)
				product.delete()
				return JsonResponse({'Message': 'Product deleted succesfully'}, status=200)
			except:
				return JsonResponse({'Message': 'This product doesnt not exist'}, status=404)
		else:
			return JsonResponse({'Message': 'You dont have the rights to delete products'}, status=403)
	else:
		return JsonResponse({'Message': 'this method is not allowed'}, status=405)


# ADMIN -good
def UpdateProduct (request, id):
	if request.method == 'PUT':
		tokenAccess = decodeToken(request)
		if tokenAccess is not None:
			defineUser = tokenAccess['is_super_user']
			if defineUser == True:
				try:
					toJson = json.loads(request.body)
					dataQuery = Product.objects.filter(id = id).values('id', 'name', 'photo', 'description', 'price')
					dataQuery.update(name = toJson['name'],
														photo = toJson['photo'],
														description = toJson['description'],
														price= toJson['price'])
					return JsonResponse({'The news values are': dataQuery[0]})
				except:
					return JsonResponse({'Message': 'the id does not correspond from database id'}, status=404)
		else:
				return JsonResponse({'Message': 'You are not authenticated'}, status=401)
	else:
		return JsonResponse({'Message': 'This method is not allowed'}, status=405)


def decodeToken (request):
	auth = request.headers.get('Authorization')
	if auth is not None:
		if auth.startswith('Bearer '):
			encoded_jwt = auth.split(' ')[1]
			#print('test if encoded', encoded_jwt)
			decoded_jwt = jwt.decode(encoded_jwt, 
															SECRET_KEY, 
															algorithms="HS256")
			print("decoded", decoded_jwt)
			return decoded_jwt
