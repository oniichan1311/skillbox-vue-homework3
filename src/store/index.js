import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    cartLoadingFailed: false,
    orderInfo: null,
    orderInfoError: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateOrderInfoError(state, orderInfoError) {
      state.orderInfoError = orderInfoError;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    updateCartLoadingProcess(state, status) {
      state.cartLoading = status;
    },
    updateCartLoadingFailed(state, status) {
      state.cartLoadingFailed = status;
    },
  },
  getters: {
    cartDatailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDatailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalProducts(state) {
      return state.cartProducts.length;
    },
    orderProductsDetails(state) {
      return state.orderInfo.basket.items;
    },
    orderUserDetails(state) {
      return state.orderInfo;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      context.commit('updateOrderInfoError', null);
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        })
        .catch((error) => {
          context.commit('updateOrderInfoError', error.response.data.error.message);
        });
    },
    loadCart(context) {
      context.commit('updateCartLoadingProcess', true);
      context.commit('updateCartLoadingFailed', false);
      clearTimeout(this.loadCartTimer);
      this.loadCartTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .catch(() => {
            context.commit('updateCartLoadingFailed', true);
          })
          .then(() => {
            context.commit('updateCartLoadingProcess', false);
          });
      }, 3000);
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return;
      }
      axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => context.commit('syncCartProducts'));
    },
    deleteCartProduct(context, { productId }) {
      axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
