// console.log(app);

app.component('products', {
    props: {
        pointWithApi: String,

    },
    data() {
        return {
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `${this.pointWithApi}/${item.img_product}`;
                    // console.log(item.imgPath);
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
                // console.log(this.$data.products);
                this.$emit('getProductsEvent', this.$data.products);
            });
    },
    methods: {
        filterCategory(category) {
            if (category && category.toUpperCase() !== "ALL") {
                this.filtered = this.products.filter((product) => {
                    return product.category == category;
                });
            } else {
                this.filtered = this.products;
            }
        },
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
    },
    template: `
        <div class="products d-flex align-content-around justify-content-center flex-wrap">
        <product v-for="item of filtered" :key="item.id_product" :img="item.imgPath" :product="item"
            @add-product="$parent.$refs.cart.changeCountProduct">
        </product>
        </div>`
});

app.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="card p-3 col-12 col-lg-3 m-1">
    <div class="wrapper h-100">
        <div class="d-flex justify-content-between align-items-center">
            <div class="mt-2">
                <h4 class="product-name text-uppercase">{{ product.title }}</h4>
                <div class="mt-5">
                    <div class="d-flex flex-row user-ratings">
                        <div class="ratings">
                            <i class="fa fa-star" v-for="product in product.rating"></i>
                            <i class="fa fa-star-o" v-for="product in 5 - product.rating"></i>
                        </div>
                        <h6 class="product-rating text-muted ms-1">
                            {{ product.rating }}/5
                        </h6>
                    </div>
                </div>
            </div>
            <div class="image">
                <img class="product-image" :src="img" width="110" />
            </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
    </div>
    <p class="product-price">{{ product.price }}</p>
    <button class="btn btn-danger" @click="$emit('add-product', product, 1)">Купить</button>
    </div>
    `
})