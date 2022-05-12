`use strict`

const products = [
    {
        id: 1,
        title: 'Лампа l-1000',
        price: 1500,
        img: '/static/shop/img/product-1.jpg',
        rating: 4,
        description: 'Овальная лампа для дома',
        category: 'lamp'
    },
    {
        id: 2,
        title: 'Стул h-2000',
        price: 2500,
        img: '/static/shop/img/product-2.jpg',
        rating: 5,
        description: 'Стул для чтения с овальной лампой',
        category: 'chair'
    },
    {
        id: 3,
        title: 'Чайник p-3000',
        price: 1700,
        img: '/static/shop/img/product-3.jpg',
        rating: 3,
        description: 'Инновационный чайник с wifi',
        category: 'kitchen'
    },
    {
        id: 4,
        title: 'Стул h-2001',
        price: 3800,
        img: '/static/shop/img/product-4.jpg',
        rating: 2,
        description: 'Данный стул всегда будет улыбаться вам',
        category: 'chair'
    },
    {
        id: 5,
        title: 'Лампа l-1001',
        price: 1200,
        img: '/static/shop/img/product-11.jpg',
        rating: 5,
        description: 'Лампа с датчиком движения',
        category: 'chair'
    },
    {
        id: 6,
        title: 'Стул h-2002',
        price: 5500,
        img: '/static/shop/img/product-21.jpg',
        rating: 3,
        description: 'Стул как у Кристиан Стюарт',
        category: 'chair'
    },
    {
        id: 7,
        title: 'Лампа l-1002',
        price: 2200,
        img: '/static/shop/img/product-31.jpg',
        rating: 4,
        description: 'Настольная лампа, с со встроенным ионизатором воздуха',
        category: 'lamp'
    },
    {
        id: 8,
        title: 'Лампа l-1003',
        price: 3500,
        img: '/static/shop/img/product-41.jpg',
        rating: 5,
        description: 'Беспроводная настенная лампа',
        category: 'lamp'
    },
    {
        id: 9,
        title: 'Ступка p-3001',
        price: 500,
        img: '/static/shop/img/product-51.jpg',
        rating: 2,
        description: 'Ступка для алхимика',
        category: 'kitchen'
    },
];


const productsPage = {
    init() {
        this.renderPage(products);
        let menuProduct = document.querySelector('.menu-products');
        menuProduct.addEventListener('click', (event) => this.productMenuHandler(event));
    },
    renderProduct({ title, price, img, rating, description }) {

        let template = document.querySelector('.card-template').cloneNode(true);

        template.classList.remove('card-template');

        template.hidden = false;

        template.querySelector('.product-name').textContent = title;
        template.querySelector('.product-rating').textContent = `${rating}/5`;
        template.querySelector('.product-price').textContent = price;

        let starHTML = template.querySelector('.ratings .fa-star').outerHTML;
        let starOHTML = template.querySelector('.ratings .fa-star-o').outerHTML;

        template.querySelector('.ratings').innerHTML = starHTML.repeat(rating) + starOHTML.repeat(5 - rating);

        template.querySelector('.product-image').setAttribute('src', img);
        template.querySelector('.product-description').textContent = description;

        return template.outerHTML
    },

    renderPage(list) {
        this.deleteCards();
        const productsList = list.map(item => this.renderProduct(item));
        document.querySelector('.products').insertAdjacentHTML('beforeend', productsList.join(''));
    },

    deleteCards() {
        let cards = document.querySelectorAll('.products .card');

        if (cards.length === 1) return;

        cards.forEach(card => {
            if (!card.classList.contains('card-template')) {
                card.remove()
            }
        });

    },
    productMenuHandler(event) {
        let link = event.target.closest('a');

        if (!link) return;

        const categoryRequired = link.dataset.category;

        let products_tmp = null;

        if (categoryRequired !== 'all') {
            products_tmp = products.filter(product => product.category === categoryRequired);
        } else {
            products_tmp = products;
        }

        this.renderPage(products_tmp);

    }
};


productsPage.init();





