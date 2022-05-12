from django.shortcuts import render
from django.views.generic import TemplateView


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


class ProductsView(TemplateView):
    template_name = 'shop/products.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class BasketView(TemplateView):
    template_name = 'shop/basket.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
