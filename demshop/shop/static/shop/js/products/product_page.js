import { ProductList } from './product_list.js';
import { ProductMenu } from './product_menu.js';
import { spinnerShow } from '../utils.js';

export class ProductPage {
    constructor(config = {
        productContainerSelector: '.products',
        menuProductSelector: '.menu-products'
    }) {
        this.config = config;

        this.productMenu = new ProductMenu({
            menuProductSelector: this.config.menuProductSelector,
        },
            this.renderPage.bind(this)
        );
        this.productMenu.activate();

        this.productList = new ProductList({
            container_selector: this.config.productContainerSelector
        });
    }
    async renderPage(category = 'all') {
        this.deleteOldCards();
        spinnerShow(this.config.productContainerSelector);
        await this.productList.updateData(category);
        this.productList.renderProductList();
    }

    deleteOldCards() {
        let cards = document.querySelectorAll('.products .card');
        cards.forEach(card => card.remove());
    }
}