from django import forms

from django.contrib.auth.models import User
from django.contrib.auth import password_validation
from django.contrib.auth.forms import *
from shop.models import *


class CustomUserCreateForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email")
        field_classes = {"username": UsernameField}


class CustomUserUpdateForm(UserChangeForm):
    class Meta:
        model = User
        fields = "__all__"
        field_classes = {"username": UsernameField}

# ===============================================
# Категории


class CategoryCreateForm(forms.ModelForm):
    class Meta:
        model = ProductCategory
        fields = ['name', 'slug']


class CategoryUpdateForm(CategoryCreateForm):
    pass

# ===============================================
# Продукты


class ProductCreateForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["title", "rating", "description", "price", "category", "img"]


class ProductUpdateForm(ProductCreateForm):
    pass
