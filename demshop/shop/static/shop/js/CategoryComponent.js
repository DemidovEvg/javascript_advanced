// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

app.component('menu-categories', {
    props: {
        pointWithApi: String,
        products: Array
    },
    data() {
        return {
            curCategory: 'All',
            categories: [{
                slug: 'All',
                translation: 'Все товары'
            }]
        }
    },
    computed: {
        getCategories() {
            let categorySlugs = [];
            for (let product of this.products) {
                if (!categorySlugs.includes(product.category)) {
                    categorySlugs.push(product.category);
                    this.categories.push({
                        slug: product.category,
                        translation: product.category_translation
                    });
                }
            }
            console.log(this.categories);
            return this.categories;
        }
    },
    mounted() {
        // console.log('Вывожу категории' + this.$parent.$refs.products.products)
        // for (let product of this.$refs.products.products) {
        //     console.log(product.category);
        // }
    },
    methods: {
        changeCurrentCategory(categorySlug) {
            this.curCategory = categorySlug;
            this.$emit('filterCategory', categorySlug);
        },
    },
    template: `
    <ul class="nav nav-tabs">
        <category v-for="category of getCategories" :category="category" :cur-category="curCategory" @change-current-category="changeCurrentCategory"></category>
    </ul>
    `
});

app.component('category', {
    props: ['category', 'curCategory'],
    template: `
    <li class="nav-item">
        <a @click="$emit('changeCurrentCategory', category.slug)" :class="[{ active: curCategory == category.slug}, 'nav-link', 'text-dark']" aria-current="page" href="#"
            data-category="all">
            {{ category.translation }}
        </a>
    </li>
    `
})