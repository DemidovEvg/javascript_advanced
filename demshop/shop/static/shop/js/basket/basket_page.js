import { SelectedProductList } from './selected_product_list.js';
import { spinnerShow } from '../utils.js';

export class BasketPage {
    constructor(config = {
        basketSelector: '.basket-container',
    }) {
        this.config = config;

        this.selectedProductList = new SelectedProductList({
            container_selector: this.config.basketSelector
        });
        this.basket = document.querySelector(this.config.basketSelector);
        this.basketValueTag = document.querySelector('#basket-value');
        this.basket.addEventListener('input', (event) => this.changeCount(event))
        this.basket.addEventListener('click', (event) => this.removeProduct(event))
    }

    async renderPage() {
        spinnerShow(this.config.basketSelector);
        this.deleteOldCards();
        if (!this.selectedProductList.isDataFetched()) {
            await this.selectedProductList.fetchSelectedProductData();
        }
        this.selectedProductList.renderProductList();
        this.renderBasketValue();
    }

    renderBasketValue() {
        this.basketValueTag.textContent = this.selectedProductList.getBasketValue();
        this.basketValueTag.textContent += ' р';
    }

    changeCount(event) {
        let input = event.target.closest('.counter');

        if (!input) return;

        let newCounter = input.value;
        let productId = input.dataset.productId;
        this.selectedProductList.changeCount(productId, newCounter);
        this.renderBasketValue();
    }

    removeProduct(event) {
        let removeProduct = event.target.closest('.remove-product');

        if (!removeProduct) return;

        let productId = removeProduct.dataset.productId;
        this.selectedProductList.remove(productId);
        this.renderPage();
    }

    deleteOldCards() {
        let cards = document.querySelectorAll('.basket-container .card');
        cards.forEach(card => card.remove());
    }
}
