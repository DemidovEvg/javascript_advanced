from django.urls import path
from .views import *
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path('',
         MainView.as_view(),
         name='main'),

    path('contact/',
         ContactView.as_view(),
         name='contact'),

    path('js_products/',
         JsProductsView.as_view(),
         name='js_products'),

    path('js_basket/',
         JsBasketView.as_view(),
         name='js_basket'),

    path('product/<int:id>',
         JsProductsView.as_view(),
         name='product'),

    path('django_products/',
         DjangoProductsView.as_view(),
         name='django_products'),

    path('django_products/<slug:category_slug>',
         DjangoProductsCategoryView.as_view(),
         name='django_products_category'),

    path('django_product/<int:pk>',
         DjangoProductDetailView.as_view(),
         name='django_product_detail'),

    path('django_basket/',
         login_required(DjangoBasketView.as_view()),
         name='django_basket'),

    path('django_remove_basket_record/<int:pk>',
         login_required(DjangoRemoveBasketRecordView.as_view()),
         name='django_remove_basket_record'),

    path('django_basket/add/<int:product_pk>/',
         login_required(DjangoAddToBasket.as_view()),
         name='django_add_to_basket'),

    path('django_product/<int:pk>/create_review/',
         login_required(DjangoCreateReviewView.as_view()),
         name='django_create_review')

]
