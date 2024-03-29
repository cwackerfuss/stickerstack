/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';
import authService from './app/services/auth';

Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
    }
  });
Vue.$http = Axios;


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from './app/store';

store.dispatch('checkAuthentication');


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './app/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login.index',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: 'home.index',
    });
  } else {
    next();
  }
});
VuexRouterSync.sync(store, router);

Vue.router = router;


/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js
 *
 * https://kazupon.github.io/vue-i18n/
 */
import VueI18n from 'vue-i18n';
import locale from './app/locale';

Vue.use(VueI18n);

Vue.config.lang = 'en';

Object.keys(locale).forEach((lang) => {
  Vue.locale(lang, locale[lang]);
});


/* ============
 * Element UI
 * ============
 *
 * Vue 2.0 based component library
 *
 * http://element.eleme.io/#/en-US
 */
import 'element-ui/lib/theme-default/index.css';
import { Button, Select, InputNumber, Dialog } from 'element-ui';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(InputNumber);


/* ============
 * Vue Local Storage
 * ============
 *
 * The Vue plugin for work with LocalStorage from Vue context
 *
 * https://github.com/Radyushin/vue-localstorage
 */
import VueLocalStorage from 'utils/VueLocalStorage';

Vue.use(new VueLocalStorage);

/* ============
 * jQuery
 * ============
 *
 * Require jQuery
 *
 * http://jquery.com/
 */
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

/* ============
 * Stripe Checkout
 * ============
 *
 * https://stripe.com/docs/checkout#integration-custom
 *
 */
window.StripeHandler = StripeCheckout.configure({
  key: 'pk_test_mJVwUhTalFALu5E6H4IvurO7',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    let data = {
      token: token.id,
      email: token.email,
      items: window.cartItems
    };

    $.ajax({
      url: '/order',
      data: JSON.stringify(data),
      contentType : 'application/json',
      type: 'POST',
    })
    .then(function(resp) {
      console.log(resp);
    });
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    // console.log(token.id);
  }
});

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */
require('./assets/scss/styles.scss');


export default {
  router,
};
