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
    checkout: {
      cost: 0,
      quantity: 0,
      items: []
    },
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
  beforeMount() {
    this.checkLocalStorageForCart()
  },
  beforeDestroy() {
    StripeHandler.close();
  },
  methods: {
    toggleItemInCart(index) {
      this.items[index].quantity = 1;
      this.items[index].inCart = !this.items[index].inCart;
      this.updateCart();
    },
    checkLocalStorageForCart() {
      let persisted = this.$localStorage.get('cart');
      if (persisted) {
        for (let i = 0; i < this.items.length; i++) {
          let item = this.items[i];
          if (persisted[ item.uid ]) {
            this.items[i].inCart = true;
            this.items[i].quantity = persisted[ item.uid ];
          }
        }
        this.updateCart();
      }
    },
    changeItemQuantity(value, index) {
      this.items[index].quantity = value;
      this.updateCart();
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
    updateCart() {
      let checkout = {
        cost: 0,
        quantity: 0,
        items: []
      };
      let persisted = {};

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.inCart) {
          checkout.items.push(item.uid);
          checkout.quantity += item.quantity;
          persisted[item.uid] = item.quantity;
        }
      }

      this.stickerCost = checkout.quantity > 5 ? 200 : 275;
      checkout.cost = checkout.quantity * this.stickerCost;
      this.$localStorage.set('cart', persisted);
      this.checkout = {...checkout};
      window.cartItems = checkout.items;
    }
  }
};
