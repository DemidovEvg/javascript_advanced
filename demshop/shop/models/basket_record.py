from django.db import models
from django.conf import settings
from django.urls import reverse


class BasketRecord(models.Model):
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

    count = models.PositiveSmallIntegerField(verbose_name='Количество')

    def __str__(self):
        return f'{self.user.username} - {self.product} - {self.count}'

    class Meta:
        verbose_name = 'Запись в корзине'
        verbose_name_plural = 'Записи в корзинах'
        ordering = ('user', 'product')
        unique_together = [['user', 'product']]
