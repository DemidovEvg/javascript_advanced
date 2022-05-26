<template>
  <div>
    <ul class="nav nav-tabs menu-products">
      <li class="nav-item">
        <a
          @click="filterCategory('all')"
          class="nav-link text-dark active"
          aria-current="page"
          href="#"
          data-category="all"
        >
          Все
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="filterCategory('chair')"
          class="nav-link text-dark"
          aria-current="page"
          href="#"
          data-category="chair"
        >
          Стулья
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="filterCategory('lamp')"
          class="nav-link text-dark"
          aria-current="page"
          href="#"
          data-category="lamp"
        >
          Лампы
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="filterCategory('kitchen')"
          class="nav-link text-dark"
          aria-current="page"
          href="#"
          data-category="kitchen"
        >
          Для кухни
        </a>
      </li>
    </ul>

    <form>
      <input
        v-model="search"
        class="input"
        type="text"
        placeholder="Поиск товаров"
      />
      <button @click.prevent="searchCard">Найти</button>
    </form>
  </div>
  <div
    class="
      products
      d-flex
      align-content-around
      justify-content-center
      flex-wrap
    "
  >
    <div
      class="card p-3 col-12 col-lg-3 m-1"
      v-for="product in products"
      v-bind:key="product.id"
    >
      <div class="wrapper h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div class="mt-2">
            <h4 class="product-name text-uppercase">{{ product.title }}</h4>
            <div class="mt-5">
              <div class="d-flex flex-row user-ratings">
                <div class="ratings">
                  <i class="fa fa-star" v-for="product in product.rating"></i>
                  <i
                    class="fa fa-star-o"
                    v-for="product in 5 - product.rating"
                  ></i>
                </div>
                <h6 class="product-rating text-muted ms-1">
                  {{ product.rating }}/5
                </h6>
              </div>
            </div>
          </div>
          <div class="image">
            <img class="product-image" :src="product.img" width="110" />
          </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
      </div>
      <p class="product-price">{{ product.price }}</p>
      <button class="btn btn-danger">Купить</button>
    </div>
  </div>

  <div class="clr"></div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          title: "Лампа l-1000",
          price: 1500,
          img: "/static/shop/img/product-1.jpg",
          rating: 4,
          description: "Овальная лампа для дома",
          category: "lamp",
        },
        {
          id: 2,
          title: "Стул h-2000",
          price: 2500,
          img: "/static/shop/img/product-2.jpg",
          rating: 5,
          description: "Стул для чтения с овальной лампой",
          category: "chair",
        },
        {
          id: 3,
          title: "Чайник p-3000",
          price: 1700,
          img: "/static/shop/img/product-3.jpg",
          rating: 3,
          description: "Инновационный чайник с wifi",
          category: "kitchen",
        },
        {
          id: 4,
          title: "Стул h-2001",
          price: 3800,
          img: "/static/shop/img/product-4.jpg",
          rating: 2,
          description: "Данный стул всегда будет улыбаться вам",
          category: "chair",
        },
        {
          id: 5,
          title: "Лампа l-1001",
          price: 1200,
          img: "/static/shop/img/product-11.jpg",
          rating: 5,
          description: "Лампа с датчиком движения",
          category: "chair",
        },
        {
          id: 6,
          title: "Стул h-2002",
          price: 5500,
          img: "/static/shop/img/product-21.jpg",
          rating: 3,
          description: "Стул как у Кристиан Стюарт",
          category: "chair",
        },
        {
          id: 7,
          title: "Лампа l-1002",
          price: 2200,
          img: "/static/shop/img/product-31.jpg",
          rating: 4,
          description: "Настольная лампа, с со встроенным ионизатором воздуха",
          category: "lamp",
        },
        {
          id: 8,
          title: "Лампа l-1003",
          price: 3500,
          img: "/static/shop/img/product-41.jpg",
          rating: 5,
          description: "Беспроводная настенная лампа",
          category: "lamp",
        },
        {
          id: 9,
          title: "Ступка p-3001",
          price: 500,
          img: "/static/shop/img/product-51.jpg",
          rating: 2,
          description: "Ступка для алхимика",
          category: "kitchen",
        },
      ],
      productTmp: null,
      search: "",
    };
  },
  methods: {
    searchCard() {
      if (!this.productTmp) {
        this.productTmp = [...this.products];
      }

      if (this.search) {
        this.products = this.productTmp.filter((product) => {
          return product.title
            .toUpperCase()
            .startsWith(this.search.toUpperCase());
        });
      } else {
        this.products = this.productTmp;
      }
    },
    filterCategory(category) {
      if (!this.productTmp) {
        this.productTmp = [...this.products];
      }

      if (category && category !== "all") {
        this.products = this.productTmp.filter((product) => {
          return product.category == category;
        });
      } else {
        this.products = this.productTmp;
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.post {
  padding: 15px;
  border: 1px solid teal;
}
</style>
