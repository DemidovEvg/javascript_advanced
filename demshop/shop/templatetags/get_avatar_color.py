from django import template
import hashlib

register = template.Library()


@register.simple_tag()
def get_background_color(name):
    b = hashlib.sha1(name.encode('utf-8')).hexdigest()

    as_int = int(b, 16) % int('FFFFFF', 16)

    background = hex(as_int)[2:].upper()

    return background


@register.simple_tag()
def get_text_color(name):
    b = hashlib.sha1(name.encode('utf-8')).hexdigest()

    as_int = int(b, 16) % int('FFFFFF', 16)

    background = hex(as_int)[2:].upper()

    # Найдем сумму чисел, если сумма больше 42,
    # то цвет текста будем делать черным иначе белым
    COLOR_EDGE = 42

    sum_digit = sum([int(d, 16) for d in list(background)])

    if sum_digit > COLOR_EDGE:
        text_color = '000000'
    else:
        text_color = 'FFFFFF'

    return text_color
