from django.urls import path
from .views import *


urlpatterns = [
    path('',
         MainView.as_view(),
         name='main'),

    path('contact/',
         ContactView.as_view(),
         name='contact'),

    path('products/',
         ProductsView.as_view(),
         name='products'),

    path('basket/',
         BasketView.as_view(),
         name='basket')

]
