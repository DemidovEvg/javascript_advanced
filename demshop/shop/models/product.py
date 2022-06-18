from django.db import models
from django.conf import settings
from django.urls import reverse


class Product(models.Model):
    RATING_CHOICES = [(i, i) for i in range(1, 6)]

    title = models.CharField(
        verbose_name='Название товара',
        max_length=255,
        unique=True
    )

    rating = models.IntegerField(
        verbose_name='Оценка',
        null=True,
        blank=True,
        choices=RATING_CHOICES
    )

    short_description = models.CharField(
        verbose_name='Короткое описание',
        max_length=128
    )

    description = models.TextField(
        verbose_name='Описание',
        null=True,
        blank=True
    )

    price = models.DecimalField(
        verbose_name='Цена',
        max_digits=15,
        decimal_places=3,
    )

    date_updated = models.DateField(
        verbose_name='Дата изменения записи',
        auto_now=True
    )

    category = models.ForeignKey(
        verbose_name='Категория товара',
        to='ProductCategory',
        on_delete=models.CASCADE,
    )

    img = models.ImageField(
        verbose_name="Изображение товара",
        upload_to="img/%Y/%m/%d/",
    )

    quantity = models.PositiveIntegerField(
        verbose_name='Количество',

    )

    buyer = models.ManyToManyField(
        'Buyer',
        verbose_name='Покупатель',
    )

    def get_absolute_url(self):
        return reverse('products', kwargs={'id': self.pk})

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        ordering = ('title', 'date_updated')
