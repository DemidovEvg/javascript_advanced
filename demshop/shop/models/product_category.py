from django.db import models
from django.conf import settings
from django.urls import reverse


class ProductCategory(models.Model):
    name = models.CharField(
        verbose_name='Категория товара',
        max_length=255
    )

    slug = models.SlugField(
        verbose_name='URL',
        max_length=255,
        unique=True,
        db_index=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория товара'
        verbose_name_plural = 'Категории товаров'
        ordering = ('name',)
