app.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `   
    <div class="container my-2">
    <div class="input-group row">
    <form action="#" class="search-form d-flex col-3" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input class="form-control border-end-0 border rounded-pill" type="text" placeholder="поиск" v-model="userSearch">
            <span class="input-group-append">
                <button class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-1" type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </span>
    </form>
    </div>
    </div>
`
})