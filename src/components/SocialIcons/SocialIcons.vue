<template>
  <div class="icons">
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/vk.png"
        width="39"
        height="39"
      ></v-img>
    </div>
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/tg.png"
        width="39"
        height="39"
      ></v-img>
    </div>
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/whatsapp.png"
        width="39"
        height="39"
      ></v-img>
    </div>
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/ok.png"
        width="39"
        height="39"
      ></v-img>
    </div>
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/viber.png"
        width="39"
        height="39"
      ></v-img>
    </div>
    <div class="icons__icon">
      <v-img
        src="../../assets/SocialIcons/skype.png"
        width="39"
        height="39"
      ></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SocialIcons",
});
</script>

<style scoped lang="scss">
.icons {
  display: flex;
  flex-wrap: wrap;
  width: fit-content;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 18px;
  }

  &__icon {
    margin-left: 18px;
    cursor: pointer;

    @media (max-width: 600px) {
      margin-left: 0;
    }
  }
}
</style>
