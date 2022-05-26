from django.contrib import admin
from .models import *


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'get_cut_review'
    )

    list_display_links = (
        'id',
        'user',
    )

    def get_cut_review(self, object):
        return f'{object.review[0:15]}...'

    get_cut_review.short_description = 'Отзыв'

    save_on_top = True


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'date_updated'
    )

    list_display_links = (
        'id',
        'title',
    )

    save_on_top = True


@admin.register(BasketRecord)
class BasketRecordAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'product'
    )

    list_display_links = (
        'id',
        'user',
        'product'
    )

    save_on_top = True


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )

    list_display_links = (
        'id',
        'name',
    )

    prepopulated_fields = {'slug': ('name',)}

    save_on_top = True
