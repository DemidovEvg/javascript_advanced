from django.shortcuts import get_object_or_404, redirect, render
from django.urls import resolve, reverse, reverse_lazy
from django.views.generic import (TemplateView,
                                  ListView,
                                  CreateView,
                                  DetailView,
                                  DeleteView,
                                  )
from .models import *
from .forms import *
from django.db.models import F, Q


class MainView(TemplateView):
    template_name = 'shop/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ContactView(TemplateView):
    template_name = 'shop/contact.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class JsProductsView(TemplateView):
    template_name = 'shop/js_products.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class JsBasketView(TemplateView):
    template_name = 'shop/js_basket.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

# =================================================================


class DjangoProductsView(ListView):
    template_name = 'shop/django_products.html'
    model = Product
    context_object_name = 'products'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = ProductCategory.objects.all()
        return context

    def get_queryset(self):
        query = Q()
        if 'category_slug' in self.kwargs:
            category_slug = self.kwargs['category_slug']
            query = Q(category__slug=category_slug)
        return Product.objects.filter(query)


class DjangoBasketView(ListView):
    template_name = 'shop/django_basket.html'
    model = BasketRecord
    context_object_name = 'records'

    def reverse_sort_value(self, sort_value):
        if sort_value == '-':
            sort_value = sort_value[1:]
        else:
            sort_value = f'-{sort_value}'
        return sort_value

    def reverse_sort_parameter(self, sort_parameters, context):
        current_sort_value = self.request.GET.get('sort')
        current_sort_value = self.reverse_sort_value(current_sort_value)
        for sort_parameter in sort_parameters:
            if context[sort_parameter].replace('-', '') in current_sort_value:
                context[sort_parameter] = current_sort_value
                break

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['basket_value'] = 0
        records = BasketRecord.objects.filter(user=self.request.user)

        for record in records:
            context['basket_value'] += record.product.price * record.count

        context['sort_price'] = 'product__price'
        context['sort_title'] = 'product__title'
        if self.request.GET and self.request.GET.get('sort'):
            self.reverse_sort_parameter(
                ['sort_price', 'sort_title'],
                context
            )

        return context

    def get_queryset(self):
        queryset = BasketRecord.objects.filter(user=self.request.user)
        if self.request.GET and self.request.GET.get('sort'):
            sort_parameter = self.request.GET.get('sort')
            queryset = queryset.order_by(sort_parameter)

        return queryset


def add_to_basket(request, pk):
    # Добавляем товар для данного юзера в корзину
    curent_user = request.user
    current_product = get_object_or_404(Product, pk=pk)

    if BasketRecord.objects.filter(product_id=pk, user=request.user).exists():
        current_record = BasketRecord.objects.get(product_id=pk)
        current_record.count += 1
        current_record.save()
    else:
        BasketRecord.objects.create(
            user=curent_user,
            product=current_product,
            count=1
        )

    return redirect(reverse('django_basket'))


class DjangoProductDetailView(DetailView):
    model = Product
    template_name = 'shop/django_product_detail.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['reviews'] = (
            Review.objects.filter(product_id=self.kwargs.get('pk'))
                          .order_by('-date_update')
                          .prefetch_related('user')
        )

        return context


class DjangoRemoveBasketRecordView(DeleteView):
    model = BasketRecord
    success_url = reverse_lazy('django_basket')


class DjangoCreateReviewView(CreateView):
    form_class = AddReviewForm

    def post(self, *args, **kwargs):
        print(self.request.POST)
        return super().post(*args, **kwargs)

    def get_success_url(self):
        return reverse('django_product_detail', kwargs={'pk': self.kwargs.get('pk')})

    # def get_queryset(self):
    #     product
    #     return
