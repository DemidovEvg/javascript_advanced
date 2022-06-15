// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

app.component('cart', {
    props: {
        pointWithApi: String
    },
    data() {
        return {
            cartItems: [],
            imgCart: 'https://placehold.it/200x150',
            showCart: false
        }
    },
    mounted() {
        console.log('Монтирую корзину');
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `${this.pointWithApi}/${item.img_product}`;
                    this.$data.cartItems.push(item);
                }

            });
    },
    methods: {
        changeCountProduct(item, count) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: count })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity = find.quantity + count
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                item.imgPath = `${this.pointWithApi}/${item.img_product}`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                })
        },

        cartCount() {
            let count = this.cartItems.reduce((summ, item) => summ + item.quantity, 0);
            console.log(count);
            return count;
        },
        cartSumm() {
            return this.cartItems.reduce((summ, item) => summ + item.quantity * item.price, 0);
        }
    },
    template: `
    <a href="#" class="nav-link position-relative" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div>Корзина</div>
        <div>(для курса JS) </div>
        <span v-if=" cartItems.length === 0">(пуста)</span>
        <span v-else class="position-absolute top-0 end-0 badge rounded-pill bg-danger">{{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }}</span>
    </a>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Корзина</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="cart-block">
                        <h6 class="ms-1"> {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товара(ров)</h6>
                        <h6 class="ms-1"> Итого:{{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }} рублей </h6>
                        <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item"
                            :cart-count="cartCount" :cart-summ="cartSumm" @remove="remove"
                            @change-count-product="changeCountProduct">
                        </cart-item>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `
});

app.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="card p-3 col-12 m-1">
        <div class="wrapper h-100">
            <div class="d-flex justify-content-between align-items-center">
                <div class="mt-2">
                    <h4 class="product-name text-uppercase">{{ cartItem.title }}</h4>
                </div>
                <div class="image">
                    <img class="product-image" :src="img" width="110" />
                </div>
            </div>
        </div>
        <p class="product-price">Цена за 1 шт.: {{ cartItem.price }}</p>
        <div class="d-flex changeQuantity">
            
            <p class="my-1">Количество: {{ cartItem.quantity }}</p>
            <button class="btn btn-secondary p-1 ms-2" @click="$emit('changeCountProduct', cartItem, -1)" style="width: 30px"> - </button>
            <button class="btn btn-secondary p-1 ms-2" @click="$emit('changeCountProduct', cartItem, 1)" style="width: 30px"> + </button>
        </div>  
        <button class="btn btn-secondary w-100 mt-4" @click="$emit('remove', cartItem)">Удалить</button> 
    </div>
    `
})