<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product" >
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{item.product.title}}
    </h3>
    <p class="product__info">
      Объем: <span>128GB</span>
    </p>
    <span class="product__code">
      Артикул: {{item.product.id}}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="decrease(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="increase(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price*item.amount) | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины"
    @click.prevent="deleteCartProductItem(item.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        return this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    deleteCartProductItem(id) {
      this.deleteCartProduct({ productId: id });
    },
    increase(value) {
      this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value + 1 });
    },
    decrease(value) {
      if (value > 1) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value - 1 });
      }
    },
  },
};
</script>
