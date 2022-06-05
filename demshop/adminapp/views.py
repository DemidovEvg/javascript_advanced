from django.shortcuts import get_object_or_404, render
from django.urls import reverse, reverse_lazy
from django.views.generic.edit import (
    CreateView,
    DeleteView,
    UpdateView,
)
from django.views.generic.detail import DetailView
from django.views.generic.base import RedirectView
from django.views.generic.list import ListView
from django.contrib.auth.models import User
from adminapp.forms import *


class UserCreateView(CreateView):
    form_class = CustomUserCreateForm
    template_name = 'adminapp/user_create.html'
    success_url = reverse_lazy('adminapp:user_list')


class UserListView(ListView):
    model = User
    context_object_name = 'users'
    template_name = 'adminapp/user_list.html'
    paginate_by = 10

    def get_queryset(self):
        return User.objects.all().order_by('-is_superuser', '-is_active', 'username')


class UserUpdateView(UpdateView):
    model = User
    form_class = CustomUserUpdateForm
    pk_url_kwarg = "pk"
    template_name = 'adminapp/user_update.html'
    success_url = reverse_lazy('adminapp:user_list')


class UserDeleteView(DeleteView):
    model = User
    template_name = 'adminapp/common_confirm_delete.html'
    success_url = reverse_lazy('adminapp:user_list')


class UserChangePasswordView(RedirectView):
    permanent = False
    query_string = True
    pattern_name = 'accounts:change_password'


# ================================================================
# Категории
class CategoryCreateView(CreateView):
    form_class = CategoryCreateForm
    template_name = 'adminapp/category_create.html'
    success_url = reverse_lazy('adminapp:all_category_list')


class CategoryListView(ListView):
    model = Product
    context_object_name = 'products'
    template_name = 'adminapp/category_list.html'
    paginate_by = 3

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        if self.kwargs.get('pk'):
            context['current_category'] = get_object_or_404(
                ProductCategory,
                pk=self.kwargs['pk']
            )

        context['categories'] = ProductCategory.objects.all()

        return context

    def get_queryset(self):
        queryset = None
        if self.kwargs.get('pk'):
            current_category = get_object_or_404(
                ProductCategory,
                pk=self.kwargs['pk']
            )
            queryset = current_category.product_set.all()
        else:
            queryset = Product.objects.all()
        return queryset


class CategoryUpdateView(UpdateView):
    model = ProductCategory
    form_class = CategoryUpdateForm
    pk_url_kwarg = "pk"
    template_name = 'adminapp/category_update.html'
    success_url = reverse_lazy('adminapp:all_category_list')


class CategoryDeleteView(DeleteView):
    model = ProductCategory
    template_name = 'adminapp/common_confirm_delete.html'
    success_url = reverse_lazy('adminapp:all_category_list')

# ================================================================
# Продукты


class ProductCreateView(CreateView):
    form_class = ProductCreateForm
    template_name = 'adminapp/product_create.html'

    def get_success_url(self):
        return reverse('adminapp:product_detail', args=(self.object.id,))


class ProductDetailView(DetailView):
    model = Product
    context_object_name = 'product'
    template_name = 'adminapp/product_detail.html'


class ProductUpdateView(UpdateView):
    model = Product
    form_class = ProductUpdateForm
    pk_url_kwarg = "pk"
    template_name = 'adminapp/product_update.html'

    def get_success_url(self):
        return reverse('adminapp:product_detail', args=(self.object.id,))


class ProductDeleteView(DeleteView):
    model = Product
    template_name = 'adminapp/common_confirm_delete.html'
    success_url = reverse_lazy('adminapp:all_category_list')
