import products from 'assets/data/products.json';

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
    items: products.items,
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
        shippingAddress: true,
        billingAddress: true
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
          checkout.items.push(item.uid);
          checkout.quantity += item.quantity;
          checkout.cost += (item.quantity * this.stickerCost);
        }
      }
      window.cartItems = checkout.items;
      return checkout;
    }
  }
};
