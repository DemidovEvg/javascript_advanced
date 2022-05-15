export class ProductMenu {
    constructor(config = {
        menuProductSelector: '.menu-products',
    }, renderPage) {
        this.config = config;
        this.renderPage = renderPage;
        this.menuProduct = document.querySelector(this.config.menuProductSelector);

    }
    activate() {
        this.menuProduct.addEventListener('click', (event) => this.productMenuHandler(event));
    }
    productMenuHandler(event) {
        let link = event.target.closest('a');

        if (!link) return;

        const categoryRequired = link.dataset.category;

        this.selectNewCategoryInMenu(link);

        this.renderPage(categoryRequired);

    }
    resetCategoryMenu() {
        let categories = document.querySelectorAll('.menu-products a');
        categories.forEach(tag => {
            if (tag.classList.contains('active')) {
                tag.classList.remove('active')
            }
        });
    }
    selectNewCategoryInMenu(link) {
        this.resetCategoryMenu();
        link.classList.add('active');
    }

}