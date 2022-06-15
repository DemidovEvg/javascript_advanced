// const linkListSection = document.getElementById('menu');
// const menu = [
//     { link: '#', name: 'Главная' },
//     { link: '#Section_2', name: 'Продукт' },
//     { link: '#', name: 'Контакты' }
// ];
// const renderMenu = (link, name) => `<a class="menuStyle" href="${link}">${name}</a>`;//добавление класса для стилизации меню

// const renderLinkList = (list) => {
//     const linkList = list.map(item => renderMenu(item.link, item.name));
//     document.querySelector('.menu').innerHTML = linkList.join('');
// }
// renderLinkList(menu);



const config_vue = {
    data: function () {
        return {
            products: [],
            userSearch: '',
            pointWithApi: 'http://127.0.0.1:3000'
        }
    },
    computed: {
    },
    methods: {
        getProducts(products) {
            this.products = products;
        },
        filterCategory(categorySlug) {
            console.log(categorySlug);
            this.$refs.products.filterCategory(categorySlug);
        },
        getJson(url) {
            return fetch(`${this.pointWithApi}${url}`)
                .then(result => {
                    console.log(`${this.pointWithApi}${url}`);
                    return result.json();
                })
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        postJson(url, data) {
            return fetch(`${this.pointWithApi}${url}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        putJson(url, data) {
            return fetch(`${this.pointWithApi}${url}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        deleteJson(url, data) {
            return fetch(`${this.pointWithApi}${url}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
    },
    mounted() {
        console.log(1111111)
    }

};
const app = Vue.createApp(config_vue);

