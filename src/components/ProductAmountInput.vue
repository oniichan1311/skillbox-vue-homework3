<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар"
    @click.prevent="decreaseAmount(currentAmount)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentAmount" @input.prevent="changeAmount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="increaseAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentAmount: 1,
    };
  },
  props: ['productAmount'],
  watch: {
    productAmount(value) {
      this.currentAmount = value;
    },
  },
  methods: {
    changeAmount() {
      this.$emit('update:productAmount', this.currentAmount);
    },
    increaseAmount() {
      this.$emit('update:productAmount', this.currentAmount + 1);
    },
    decreaseAmount(value) {
      if (value > 1) {
        this.$emit('update:productAmount', this.currentAmount - 1);
      }
    },
  },
};
</script>
