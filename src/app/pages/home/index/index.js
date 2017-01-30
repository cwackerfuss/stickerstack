/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */

export default {
  components: {
    VLayout: require('layouts/default/default.vue'),
    HiveGrid: require('components/HiveGrid.vue'),
    ShopItem: require('components/ShopItem.vue'),
    CartItem: require('components/CartItem.vue'),
  },
  data: () => ({
    items: [
      {name: 'Vue', inCart: false, border: '#41B883'},
      {name: 'React', inCart: false, border: '#53C1DE'},
      {name: 'Angular', inCart: false, border: '#E23237'},
      {name: 'HTML5', inCart: false, border: '#41B883'},
      {name: 'CSS3', inCart: false, border: '#53C1DE'},
      {name: 'Vue', inCart: false, border: '#E23237'},
      {name: 'React', inCart: false, border: '#41B883'},
      {name: 'Angular', inCart: false, border: '#53C1DE'},
      {name: 'HTML5', inCart: false, border: '#E23237'},
      {name: 'CSS3', inCart: false, border: '#41B883'},
      {name: 'CSS3', inCart: false, border: '#53C1DE'},
      {name: 'CSS3', inCart: false, border: '#E23237'},
    ],
    cartItems: [
      {name: 'Vue', inCart: false, border: '#41B883'},
      {name: 'React', inCart: false, border: '#53C1DE'},
      {name: 'Angular', inCart: false, border: '#E23237'}
    ],
    shopGridConfig: {
      columns: {
        sm: 2,
        md: 3,
        lg: 5
      }
    },
    cartGridConfig: {
      columns: {
        sm: 2,
        md: 2,
        lg: 2
      }
    },
  }),
  methods: {
    clearCartItem(index) {
      this.cartItems.splice(index, 1)
    },
    toggleItemInCart(index) {
      this.cartItems.push(this.items[index]);
    }
  }
};
