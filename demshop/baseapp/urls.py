from django.urls import path

from .views import *

app_name = 'baseapp'

urlpatterns = [
    path('', IndexPageView.as_view(), name='index'),

    path('language/', ChangeLanguageView.as_view(), name='change_language'),
]
