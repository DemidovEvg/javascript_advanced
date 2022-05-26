from django.db import models
from django.conf import settings


class Review(models.Model):
    user = models.ForeignKey(
        verbose_name='Пользователь',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    product = models.ForeignKey(
        verbose_name='Товар',
        to='Product',
        on_delete=models.CASCADE,
    )

    review = models.TextField(
        verbose_name='Отзыв',
    )

    date_update = models.DateTimeField(
        verbose_name='Дата отзыва',
        auto_now=True
    )

    # def __str__(self):
    #     return f'({self.user} {self.review[:15]}...)'

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        ordering = ('product', 'date_update')
