<template>
  <div class="container-wrapper">
    <div class="share">
      <div class="share__advertisements">
        <div class="share__advertisements-advertisement">
          <Advertising />
        </div>
        <div class="share__advertisements-advertisement">
          <Advertising />
        </div>
      </div>
      <div class="share__media">
        <div class="share__media-text">Поделиться в:</div>
        <SocialIcons />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Advertising from "@/components/Advertising/Advertising.vue";
import SocialIcons from "@/components/SocialIcons/SocialIcons.vue";

export default Vue.extend({
  name: "ShareTo",
  components: { Advertising, SocialIcons },
});
</script>

<style lang="scss" src="./ShareTo.scss"></style>
