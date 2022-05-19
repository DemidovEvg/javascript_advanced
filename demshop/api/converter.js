let data = [
    {
        id: 1,
        title: 'Лампа l-1000',
        price: 1500,
        img: '/static/shop/img/product-1.jpg',
        rating: 4,
        description: 'Овальная лампа для дома',
        category: 'lamp',
        count: 1,
    },
    {
        id: 2,
        title: 'Стул h-2000',
        price: 2500,
        img: '/static/shop/img/product-2.jpg',
        rating: 5,
        description: 'Стул для чтения с овальной лампой',
        category: 'chair',
        count: 2,

    },
    {
        id: 3,
        title: 'Чайник p-3000',
        price: 1700,
        img: '/static/shop/img/product-3.jpg',
        rating: 3,
        description: 'Инновационный чайник с wifi',
        category: 'kitchen',
        count: 3,
    },
    {
        id: 4,
        title: 'Стул h-2001',
        price: 3800,
        img: '/static/shop/img/product-4.jpg',
        rating: 2,
        description: 'Данный стул всегда будет улыбаться вам',
        category: 'chair',
        count: 2,
    },
]

let json = JSON.stringify(data);
console.log(json);