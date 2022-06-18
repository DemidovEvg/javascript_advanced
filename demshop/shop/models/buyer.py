from django.db import models
from django.conf import settings
from django.urls import reverse


class Buyer(models.Model):
    name = models.CharField(
        verbose_name='Имя',
        max_length=255,
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Покупатель'
        verbose_name_plural = 'Покупатели'
