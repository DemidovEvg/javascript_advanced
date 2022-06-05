from django import template


register = template.Library()


@register.filter(name='get_verbose_name')
def get_verbose_name(instance):
    return type(instance)._meta.verbose_name.title()
