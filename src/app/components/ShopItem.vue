<template>
  <div class="hive-item" @click="handleItemClick()">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 308 268" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="alphaGradient">
          <stop class="alphaGradient-1" offset="0%"/>
          <stop class="alphaGradient-2" offset="100%"/>
        </linearGradient>
      </defs>
      <polygon
        class="hex"
        points="304,134 229,264 79,264 4,134 79,4 229,4"
        :stroke="item.border ? item.border : '#4144B8'">
      </polygon>
      <polygon
        v-if="isSelected"
        points="304,134 229,264 79,264 4,134 79,4 229,4"
        class="hex-selected"
        fill-opacity="0.3">
      </polygon>
      <polygon
        v-if="isSelected"
        points="183,31.8 198,57.8 228,57.8 243,31.8 228,5.8 198,5.8"
        class="hex-selected">
      </polygon>
      <path class="checkmark__check" fill="none" d="M201 33l7.1 7.2 16.7-16.8" stroke-width="3" stroke="white"/>
    </svg>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isSelected: false
    }),
    props: [
      'item', 'toggleInCart'
    ],
    methods: {
      handleItemClick() {
        this.isSelected = !this.isSelected;
        this.toggleInCart();
      }
    }
  };
</script>
