<template>
    <ul class="catalog__list">
      <ProductItem v-for="(product, index) in products"
          v-bind:product="product"
          v-bind:index="index"
          v-bind:key="product.id">
      </ProductItem>
    </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
