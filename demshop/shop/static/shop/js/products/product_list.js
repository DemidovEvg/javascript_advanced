import { ProductItem } from './product_item.js'
import { Api } from '../___api.js';

export class ProductList {
    constructor({ container_selector = '.products' }) {
        this.container = document.querySelector(container_selector);
        this.productsData = [];
    }
    async updateData(categoryRequired = 'all') {
        let api = new Api();
        let response = await api.getProducts();

        let data = await response.json();

        // Имитация долгого запроса
        await new Promise(_ => setTimeout(_, 1000));

        if (categoryRequired !== 'all') {
            this.productsData = data.filter(product => product.category === categoryRequired);
        } else {
            this.productsData = data;
        }
    }
    renderProductList() {
        this.container.textContent = '';
        for (let product of this.productsData) {
            const item = new ProductItem(product);
            this.container.insertAdjacentHTML("beforeend", item.renderItem());
        }
    }
}