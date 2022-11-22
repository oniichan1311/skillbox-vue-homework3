import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/database/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1,
      amount: 5,
    }],
  },
  mutations: {
    addProductToCart(state, payload) {
      const item = state.cartProducts.find((product) => product.productId === payload.productId);
      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push({
          productId: payload.productId,
          amount: payload.amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDatailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDatailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalProducts(state) {
      return state.cartProducts.length;
    },
  },
});
