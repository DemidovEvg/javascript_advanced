from django.urls import path
from adminapp.views import *
from django.contrib.auth.decorators import user_passes_test, login_required

admin_or_staff = user_passes_test(lambda u: u.is_staff or u.is_superuser)

app_name = "adminapp"

urlpatterns = [
    path('',
         admin_or_staff(UserListView.as_view())
         ),
    path('users/create/',
         admin_or_staff(UserCreateView.as_view()),
         name='user_create'
         ),
    path('users/read/',
         admin_or_staff(UserListView.as_view()),
         name='user_list'
         ),
    path('users/update/<pk>',
         admin_or_staff(UserUpdateView.as_view()),
         name='user_update'
         ),
    path('users/delete/<pk>',
         admin_or_staff(UserDeleteView.as_view()),
         name='user_delete'
         ),

    path('users/password/',
         admin_or_staff(UserChangePasswordView.as_view()),
         name='user_password'
         ),

    path('categories/create/',
         CategoryCreateView.as_view(),
         name='category_create'),

    path('categories/read/',
         CategoryListView.as_view(),
         name='all_category_list',
         ),

    path('categories/read/<pk>',
         CategoryListView.as_view(),
         name='category_list',
         ),

    path('categories/update/<pk>',
         CategoryUpdateView.as_view(),
         name='category_update',
         ),

    path('categories/delete/<pk>',
         CategoryDeleteView.as_view(),
         name='category_delete'
         ),


    path('products/create/', ProductCreateView.as_view(), name='product_create'),
    path('products/read/<pk>', ProductDetailView.as_view(), name='product_detail'),
    path('products/update/<pk>', ProductUpdateView.as_view(), name='product_update'),
    path('products/delete/<pk>', ProductDeleteView.as_view(), name='products_delete'),
]
