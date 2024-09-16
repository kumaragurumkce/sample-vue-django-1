<template>
  <div class="container mt-5">
    <h2>Shopping Cart</h2>
    <ul class="list-group">
      <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
        <button class="btn btn-danger btn-sm" @click="handleRemoveFromCart(item)">Remove</button>
      </li>
    </ul>
    <h4 class="mt-3">Total: ${{ cartTotal }}</h4>
    <button class="btn btn-success mt-3" @click="handleClearCart">Checkout</button>
    <div v-if="message" class="alert alert-success">{{ message }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal']),
    ...mapState(['message'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'clearCart', 'setMessage']),
    async handleRemoveFromCart(item) {
      await this.removeFromCart(item.id);
      
      // Create the success message
      const deleteMessage = `${item.name} deleted successfully`;
      this.setMessage(deleteMessage);
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        this.setMessage('');
      }, 3000);
    },
    async handleClearCart() {
      await this.clearCart();
      const checkoutsuccess='Checkout successful! Your cart is now empty'
      this.setMessage(checkoutsuccess)
      setTimeout(()=>{
        this.setMessage('')
      },3000)
    }

  }
};
</script>
