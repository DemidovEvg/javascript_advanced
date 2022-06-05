import { SelectedProductItem } from './selected_product_item.js'
import { Api } from '../___api.js';


export class SelectedProductList {
    constructor({ container_selector = '.basket' }) {
        this.container = document.querySelector(container_selector);
        this.selectedProductsData = null;
    }

    isDataFetched() {
        if (this.selectedProductsData) return true;
    }

    async fetchSelectedProductData() {
        let api = new Api();
        let response = await api.getBasket();

        this.selectedProductsData = await response.json();

        // Имитация долгого запроса
        await new Promise(_ => setTimeout(_, 1000));
    }

    removeProductFromList(id) {
        let index = this.selectedProductsData.indexOf(p => p.id === id);
        this.selectedProductsData.splice(index, 1, 0);
    }

    changeCount(id, value) {
        let productData = this.selectedProductsData.find(p => p.id == id);
        productData.count = value;
    }

    remove(id) {
        let productData = this.selectedProductsData.find(p => p.id == id);
        let index = this.selectedProductsData.indexOf(productData);
        this.selectedProductsData.splice(index, 1);
    }

    renderProductList() {
        this.container.textContent = '';
        for (let product of this.selectedProductsData) {
            const item = new SelectedProductItem(product);
            this.container.insertAdjacentHTML("beforeend", item.renderItem());
        }
    }

    getBasketValue() {
        const initialValue = 0;
        const sumWithInitial = this.selectedProductsData.reduce(
            (previousValue, product) => previousValue + product.price * product.count,
            initialValue
        );
        return sumWithInitial;
    }
}