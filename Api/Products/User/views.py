from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from User.forms.forms import UserCreateForm, UserLoginForm
from User.models import User
#from User.serializer import UserSerializer
from django.contrib.auth.hashers import check_password, make_password
from django.core.serializers import serialize
from django.forms.models import model_to_dict
import jwt, json
import environ
import os

env = environ.Env()

SECRET_KEY = os.environ.get('SECRET_KEY', "secret")
print(SECRET_KEY)

#good -all
def CreateUser(request):
	if request.method == 'POST':
		empty_fields = emptyValues(request.POST)
		if empty_fields:
				return empty_fields
		
		form = UserCreateForm(request.POST)
		if form.is_valid():
			user = User(
			username = form.cleaned_data.get('username'),
			first_name = form.cleaned_data.get('first_name'),
			last_name = form.cleaned_data.get('last_name'),
			email = form.cleaned_data.get('email'),
			password = form.cleaned_data.get('password')
			)
			print('test valid values', user.username)
			user.save()
			return JsonResponse({'message': 'Your account has been created',
													'username' : user.username,
													'firstname': user.first_name,
													'lastname': user.last_name,
													'email' : user.email,
													'password': user.password
													}, status=201)

		username = form.cleaned_data.get('username'),
		username = ''.join(username)
		if User.objects.filter(username=username).exists():
			return JsonResponse({'message': 'this username already exists'}, status=409)

	else:
		form = UserCreateForm()
		return JsonResponse({'message': 'This method is not allowed'}, status=405)

#good - all
def LoginUser(request):
	if request.method == 'POST':
		form = UserLoginForm(request.POST)
		if form.is_valid():
			credentials = User(
			username = form.cleaned_data.get('username'),
			password = form.cleaned_data.get('password')
			)
		encryptedPassword = make_password(credentials.password)
		print ("The username and password are", credentials.username, encryptedPassword)

		user = User.objects.filter(username = credentials.username).values('id','username', 'is_superuser')
		print("user values", user)
		idUserDB = user[0]['id']
		usernameDB = user[0]['username']
		isSuperUser = user[0]['is_superuser']
		checkPassword = check_password(credentials.password, encryptedPassword)

		if credentials.username == usernameDB and checkPassword == True:
			try :
				encoded_jwt = jwt.encode({"id" : idUserDB, "username" : usernameDB, "is_super_user" : isSuperUser}, 
																SECRET_KEY,
																algorithm="HS256",
																)
				print('encoded token',encoded_jwt)

				decoded_jwt = jwt.decode(encoded_jwt,
														 SECRET_KEY, 
														 algorithms="HS256")
				print('decoded token', decoded_jwt)
				return JsonResponse({'token': encoded_jwt, 'token_decoded': decoded_jwt})
			except:
				return JsonResponse({"error": "a problem has occured"})
	else:
		form = UserLoginForm()
		return JsonResponse({'message': 'This method is not allowed'})


#ADMIN - good
def getUsers(request):
	if request.method == 'GET':
		tokenAcces = decodeToken(request)
		if tokenAcces is not None:
					defineUser = tokenAcces['is_super_user']
					if defineUser == True:
						users = User.objects.all()
						serialized_data = serialize('json', users)
						serialized_data = json.loads(serialized_data)
						return JsonResponse({'Users List': serialized_data})
	else:
		return JsonResponse({'message': 'This method is not allowed'}, status=405)

#good 
def getOneUser(request, id):
	if request.method == 'GET':
		tokenAccess = decodeToken(request)
		if tokenAccess is not None:
			getUserId = str(tokenAccess['id'])
			if id == getUserId:
				user = get_object_or_404(User, id=getUserId)
				return JsonResponse(model_to_dict(user))
			else:
				return JsonResponse({'Non authorised accces'}, status=403)
	else:
		return JsonResponse({'message': 'This method is not allowed'}, status=405)

# good - user can delete his account - admin can delete every user account
def DeleteUser(request, id):
	if request.method == 'DELETE':
		tokenAccess = decodeToken(request)
		defineUser = tokenAccess['is_super_user']

		if tokenAccess is not None:
			if defineUser == True:
				user = User.objects.get(id=id)
				if user:
					user.delete()
					return JsonResponse({'message': 'admin user has deleted one user account'}, status=200)

			elif defineUser == False:
				userAuthId = tokenAccess['id']
				if id == userAuthId:
					user = User.objects.get(id=userAuthId)
					if user:
						user.delete()
						return JsonResponse({'message': 'User deleted succesfully'}, status=200)
				else:
					return JsonResponse({'message': 'You are not authorized to delete someone else account'}, status=403)
		else:
				return JsonResponse({'message': 'Non authorised accces'}, status=403)
	else:
		return JsonResponse({'message': 'This method is not allowed'}, status=405)

# good - admin -user
def UpdateUser(request, id):
	if request.method == 'PUT':
		tokenAcces = decodeToken(request)
		if tokenAcces is not None:
			toJson = json.loads(request.body)
			dataQuery = User.objects.filter(id = id).values('id', 'username', 'first_name', 'last_name', 'email', 'password')

			userIdDataBase = dataQuery[0]['id']
			userAuthId = tokenAcces['id']
			if userAuthId == userIdDataBase:
				dataQuery.update(username = toJson['username'],
										 		first_name = toJson['first_name'],
												last_name = toJson['last_name'],
												email = toJson['email'],
										 		password = make_password(toJson['password'])
										 		)
				return JsonResponse({'message': 'Your account has been updated', 'The news values are': dataQuery[0], 
												 		'decrypted password': toJson['password']}, status=200)
			else:
				return JsonResponse({'Message': 'you are not authorized'}, status=403)
		else:
			return JsonResponse({'Message': 'You aren not authenticated'}, status=401)
	else:
		return JsonResponse({'Message': 'This method is not allowed'}, status=405)

def decodeToken (request):
		auth = request.headers.get('Authorization')
		print('authentification',auth)
		if auth is not None:
			if auth.startswith('Bearer '):
				encoded_jwt = auth.split(' ')[1]
				print('test if encoded', encoded_jwt)
				decoded_jwt = jwt.decode(encoded_jwt, 
																SECRET_KEY, 
																algorithms="HS256")
				print("decoded", decoded_jwt)
				return decoded_jwt

def encodeToken (request):
		auth = request.headers.get('Authorization')
		if auth is not None:
			if auth.startswith('Bearer '):
				encoded_jwt = auth.split(' ')[1]
				return encoded_jwt


def emptyValues (request):
		for key in request:
			if request[key] == "":
				return JsonResponse({'message': 'All values are required'},status=400)



