<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <main class="content container" >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{totalProducts}} товара
      </span>
    </div>
    <div v-if="$store.state.cartLoading">
      <PreloaderIndicator/>
    </div>
    <div v-else-if="$store.state.cartLoadingFailed">
        <h3>Произошла ошибка при загрузке товаров</h3>
        <button @click.prevent="loadProducts">Попробовать еще раз</button>
    </div>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <router-link tag="button" v-if="(products.length > 0)"
          class="cart__button button button--primery" :to="{name:'order'}">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import PreloaderIndicator from '@/components/PreloaderIndicator.vue';

export default {
  components: { CartItem, PreloaderIndicator },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'cartDatailProducts', totalPrice: 'cartTotalPrice', totalProducts: 'cartTotalProducts' }),
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
