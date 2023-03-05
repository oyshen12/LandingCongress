<template>
  <div class="coupons" id="coupons">
    <div class="container-wrapper">
      <div class="coupons__title">
        <div class="dash"></div>
        <div class="coupons__title-text text24 bold">Купи купон на скидку!</div>
        <div class="dash"></div>
      </div>
      <div class="coupons__images">
        <div class="coupons__images-image coupon1">
          <div class="coupons__images-image-text">
            <div>Скидка 5%</div>
            <div class="coupons__images-image-text-item mt-1 text24 bold">
              Осталось:
            </div>
            <div class="coupons__images-image-text-item text24 bold">35 шт</div>
          </div>
        </div>
        <div class="coupons__images-image coupon2">
          <div class="coupons__images-image-text">
            <div>Скидка 10%</div>
            <div class="coupons__images-image-text-item mt-1 text24 bold">
              Осталось:
            </div>
            <div class="coupons__images-image-text-item text24 bold">20 шт</div>
          </div>
        </div>
        <div class="coupons__images-image coupon3">
          <div class="coupons__images-image-text">
            <div>Скидка 15%</div>
            <div class="coupons__images-image-text-item mt-1 text24 bold">
              Осталось:
            </div>
            <div class="coupons__images-image-text-item text24 bold">1 шт</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CouponsComponent",
});
</script>

<style scoped lang="scss" src="./Coupons.scss"></style>
