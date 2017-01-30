<template>
  <div class="cart-item">
    <div class="cart-item__delete" @click="remove">
      <i class="el-icon-circle-close"></i>
    </div>
    <svg class="cart-item__thumb" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 308 268" xmlns:xlink="http://www.w3.org/1999/xlink">
      <polygon
        class="hex"
        points="304,134 229,264 79,264 4,134 79,4 229,4"
        :stroke="item.border ? item.border : '#4144B8'">
      </polygon>
    </svg>
    <div class="cart-item__count">
      <el-input-number v-model="count" @change="handleItemCount" :min="1" :max="10"></el-input-number>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
        count: 1
    }),
    props: [
      'item',
      'remove'
    ],
    methods: {
      handleItemCount(value) {
        console.log(value)
      }
    }
  };
</script>
