
export class Api {
    constructor() {
        this.apiUrl = 'https://raw.githubusercontent.com/DemidovEvg/javascript_and_django/js_dz3/demshop/api';
    }

    async getProducts() {
        return fetch(`${this.apiUrl}/products.json`);
    }

    async getBasket() {
        return fetch(`${this.apiUrl}/basket.json`);
    }
}


