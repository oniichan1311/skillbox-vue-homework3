<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name:'product', params:{id:product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name:'product', params:{id:product.id}}">
        {{product.title}}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="itemColor in product.colors"
        v-bind:key="product.id + '-' + itemColor.code">
          <label class="colors__label" :for="'color-'+ product.id + '-' + itemColor.code">
            <input class="colors__radio sr-only" type="radio" v-model="checkedColor.code"
            :value="itemColor.code" :id="'color-'+ product.id + '-' + itemColor.code">
            <span class="colors__value" v-bind:style="{backgroundColor: itemColor.code}">
            </span>
          </label>
        </li>
      </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      checkedColor: [],
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  props: ['product', 'index'],
};
</script>
