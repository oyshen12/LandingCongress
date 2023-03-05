<template>
  <div
    class="advertising"
    :style="{
      backgroundImage: img ? `url(${img})` : '',
    }"
  >
    <div>Место рекламы</div>
    <div>1150х150px</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdvertisingComponent",
  props: {
    img: {
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
.advertising {
  width: 100%;
  height: 100%;
  background-size: contain;

  // delete
  background: #d1d1d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
