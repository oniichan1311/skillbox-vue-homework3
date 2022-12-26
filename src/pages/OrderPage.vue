<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link >
        </li>
        <li class="breadcrumbs__item">
          <router-link  class="breadcrumbs__link" :to="{name:'cart'}" >
            Корзина
          </router-link >
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProducts }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <PreloaderIndicator v-if="(orderLoading === true)"/>
        <div class="cart__field"  v-else-if="(orderLoading === false)">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" name="name"
            placeholder="Введите ваше полное имя" v-model="formData.name"/>

            <BaseFormText title="Адрес доставки" :error="formError.address" name="address"
            placeholder="Введите ваш адрес" v-model="formData.address"/>

            <BaseFormText title="Телефон" :error="formError.phone" name="phone" type="tel"
            placeholder="Введите ваш телефон" v-model="formData.phone"/>

            <BaseFormText title="Email" :error="formError.email" name="email" type="email"
            placeholder="Введи ваш Email" v-model="formData.email"/>

            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment"
            name="comment" placeholder="Ваши пожелания" v-model="formData.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                  type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li  class="cart__order" v-for="item in products" :key="item.productId" :item="item">
              <h3>{{item.product.title}}</h3>
              <b>{{ (item.product.price*item.amount) | numberFormat }} ₽</b>
              <span> Артикул: {{item.product.id}}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b> {{totalProducts}} </b> товара на сумму
              <b> {{totalPrice | numberFormat}} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
             <span v-if="(orderLoading === false)">Оформить заказ</span>
             <span v-else-if="(orderLoading === true)">Оформляем заказ...</span>
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import PreloaderIndicator from '@/components/PreloaderIndicator.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  filters: {
    numberFormat,
  },
  components: { BaseFormText, BaseFormTextarea, PreloaderIndicator },
  computed: {
    ...mapGetters({ products: 'cartDatailProducts', totalPrice: 'cartTotalPrice', totalProducts: 'cartTotalProducts' }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderLoading = true;
      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.orderLoading = false;
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
          this.orderLoading = false;
        });
    },
  },
};
</script>
