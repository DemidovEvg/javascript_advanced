app.component('filter-comp', {
    template: `
    <form action="#" class="search-form" @submit.prevent="filter">
        <input type="text" class="search-field" v-model="userSearch">
        <button type="submit" class="btn-search">
            <i class="fas fa-search"></i>
        </button>
    </form>`,
    props: ['products',],
    data: function () {
        return {
            userSearch: '',
            filtered: []
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el1 => regexp.test(el1.product_name));
            this.$emit('filter', this.filtered);
        }
    }
});