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
      {name: 'Vue', uid: '001', inCart: false, border: '#41B883', quantity: 1},
      {name: 'React', uid: '002', inCart: false, border: '#53C1DE', quantity: 1},
      {name: 'Angular', uid: '003', inCart: false, border: '#E23237', quantity: 1},
      {name: 'HTML5', uid: '004', inCart: false, border: '#41B883', quantity: 1},
      {name: 'CSS3', uid: '005', inCart: false, border: '#53C1DE', quantity: 1},
      {name: 'Vue', uid: '006', inCart: false, border: '#E23237', quantity: 1},
      {name: 'React', uid: '007', inCart: false, border: '#41B883', quantity: 1},
      {name: 'Angular', uid: '008', inCart: false, border: '#53C1DE', quantity: 1},
      {name: 'HTML5', uid: '009', inCart: false, border: '#E23237', quantity: 1},
      {name: 'CSS3', uid: '010', inCart: false, border: '#41B883', quantity: 1},
      {name: 'CSS3', uid: '011', inCart: false, border: '#53C1DE', quantity: 1},
      {name: 'CSS3', uid: '012', inCart: false, border: '#E23237', quantity: 1},
    ],
    stickerCost: 275,
    cartTotal: 0,
    cartCount: 0,
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
  filters: {
    toCost: val => (val / 100).toFixed(2)
  },
  beforeDestroy() {
    StripeHandler.close();
  },
  methods: {
    toggleItemInCart(index) {
      this.items[index].quantity = 1;
      this.items[index].inCart = !this.items[index].inCart;
      this.updateCartCost();
    },
    changeItemQuantity(value, index) {
      this.items[index].quantity = value;
      this.updateCartCost();
    },
    updateCartCost() {
      const cartItemCount = this.cartCount = this.cartItemCount();
      this.stickerCost = cartItemCount > 5 ? 200 : 275;
      this.cartTotal = cartItemCount * this.stickerCost;
    },
    handleBuy() {
      const checkout = this.getCheckoutDetails();
      StripeHandler.open({
        image: './static/images/circle-logo.png',
        name: 'Stickerstack',
        description: `${checkout.quantity} stickers`,
        zipCode: true,
        amount: checkout.cost,
        shippingAddress: true
      });
    },
    cartItemCount() {
      let count = 0;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        count = item.inCart ? count + item.quantity : count;
      }
      return count;
    },
    getCheckoutDetails() {
      let checkout = {
        cost: 0,
        quantity: 0,
        items: []
      };
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.inCart) {
          checkout.items.push(item);
          checkout.quantity += item.quantity;
          checkout.cost += (item.quantity * this.stickerCost);
        }
      }
      return checkout;
    }
  }
};
