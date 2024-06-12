from django.contrib import admin
from django.urls import path, include
from Products.views import CreateProduct, GetProducts, GetProductById, DeleteProduct, UpdateProduct
from User.views import CreateUser, LoginUser, getUsers, getOneUser, DeleteUser, UpdateUser, LogOut
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
		path('admin/', admin.site.urls),
		path('create-product/', csrf_exempt(CreateProduct)),
		path('products/', csrf_exempt(GetProducts)),
		path('products/<str:id>/', csrf_exempt(GetProductById)),
		path('product/delete/<str:id>/', csrf_exempt(DeleteProduct)),
		path('products/update/<str:id>/', csrf_exempt(UpdateProduct)),
		path('sign-in/', csrf_exempt(CreateUser)),
		path('login/', csrf_exempt(LoginUser)),
		path('logout/', csrf_exempt(LogOut)),
		path('users/', csrf_exempt(getUsers)),
		path('users/<str:id>/', csrf_exempt(getOneUser)),
		path('user/delete/<int:id>/', csrf_exempt(DeleteUser)),
		path('user/update/<int:id>/', csrf_exempt(UpdateUser)),
		#path('logout/', csrf_exempt(LogOut)),
]
