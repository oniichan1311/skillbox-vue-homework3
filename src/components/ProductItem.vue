<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}}
    </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="itemColor in product.colors"
        v-bind:key="product.id + '-' + itemColor">
          <label class="colors__label" :for="'color-'+ product.id + '-' + itemColor">
            <input class="colors__radio sr-only" type="radio" v-model="checkedColor"
            :value="itemColor" :id="'color-'+ product.id + '-' + itemColor">
            <span class="colors__value" v-bind:style="{backgroundColor: itemColor}">
            </span>
          </label>
        </li>
      </ul>
  </li>
</template>

<script>

export default {
  data() {
    return {
      checkedColor: [],
    };
  },
  props: ['product', 'index'],
};
</script>
