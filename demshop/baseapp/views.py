from django.views.generic import TemplateView


class IndexPageView(TemplateView):
    template_name = 'baseapp/main/index.html'


class ChangeLanguageView(TemplateView):
    template_name = 'baseapp/main/change_language.html'
