<template>
  <div :class="['hive-grid', 'column-' + colCount]">
    <template v-for="(item, index) of items">
      <slot :item="item" :index="index"></slot>
    </template>
    <div
      v-for="item of emptyCols"
      class="hive-item hive-item--empty">
      <div class="hive-item-inner" />
    </div>
  </div>
</template>

<script>
import { getBrowserWidth } from 'utils/getSizes';
import { throttle } from 'lodash';

export default {
  data: () => ({
    breakpointWidths: {
      sm: 500,
      md: 800,
      lg: 1200
    },
    defaultConfig: {
      columns: {
        sm: 2,
        md: 3,
        lg: 5
      }
    },
    colCount: 5,
    emptyCols: []
  }),
  props: ['items', 'config'],
  mounted() {
    this.setGridLayout();
    this.watchResize();
  },
  methods: {
    watchResize() {
      $(window).resize(throttle(() => {
        this.setGridLayout();
      }, 500));
    },
    setGridLayout() {
      const browserWidth = getBrowserWidth();
      const activeConfig = this.config ? this.config : this.defaultConfig;
      if (this.breakpointWidths.lg <= browserWidth) {
        this.colCount = activeConfig.columns.lg;
      } else if (this.breakpointWidths.md <= browserWidth) {
        this.colCount = activeConfig.columns.md;
      } else {
        this.colCount = activeConfig.columns.sm;
      }
      // add invisible columns to push any stragglers to the left in the last row
      this.emptyCols = new Array(this.colCount - (this.items.length % this.colCount));
    }
  }
};
</script>
