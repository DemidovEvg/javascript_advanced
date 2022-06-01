from shop.models import BasketRecord


class BasketCountMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['basket_count'] = BasketRecord.get_basket_count(
            self.request.user)
        return context
