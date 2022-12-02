<template>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>

      <div class="content__catalog">
        <ProductFilter :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId"
        :product-color.sync="filterColor"/>
        <section class="catalog">
            <PreloaderIndicator v-if="productsLoading"/>
          <div v-if="productsLoadingFailed">
            <h3>Произошла ошибка при загрузке товаров</h3>
            <button @click.prevent="loadProducts">Попробовать еще раз</button>
          </div>
          <ProductList :products="products"
          />
          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
        </section>
      </div>
    </main>
  </template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import PreloaderIndicator from '@/components/PreloaderIndicator.vue';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, PreloaderIndicator,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 9,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        })) : [];
    },
    countProducts() {
      return this.productsData
        ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 3000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

  <style lang="stylus">
  #app
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px
  </style>
