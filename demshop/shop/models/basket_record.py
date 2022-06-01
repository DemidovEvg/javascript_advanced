from django.db import models
from django.conf import settings
from django.urls import reverse
from django.db.models import Sum


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

    created_at = models.DateTimeField(
        verbose_name="Добавлен",
        auto_now_add=True
    )

    def __str__(self):
        return f'{self.user.username} - {self.product} - {self.count}'

    @classmethod
    def get_basket_count(cls, current_user):
        return (BasketRecord.objects.filter(user=current_user)
                .aggregate(basket_count=Sum('count'))
                .get('basket_count'))

    @classmethod
    def get_basket_value(cls, current_user):
        basket_records = BasketRecord.objects.filter(user=current_user)

        basket_value = 0
        for record in basket_records:
            basket_value += record.product.price * record.count

        return basket_value

    class Meta:
        verbose_name = 'Запись в корзине'
        verbose_name_plural = 'Записи в корзинах'
        ordering = ('user', 'product')
        unique_together = [['user', 'product']]
