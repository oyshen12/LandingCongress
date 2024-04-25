<template>
  <div class="advertising">
    <div>Место рекламы</div>
    <div>1150х150px</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdvertisingComponent",
});
</script>

<style scoped lang="scss">
.advertising {
  width: 100%;
  height: 100%;
  background-size: contain;
  background: #d1d1d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
