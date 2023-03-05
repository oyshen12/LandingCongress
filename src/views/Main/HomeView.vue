<template>
  <div>
    <Greetings />
    <Participate />
    <Register v-if="!authed" />
    <Vote />
    <ListParticipant />
    <CongressProgram />
    <Coupons />
    <FullRegistration />
    <ShareTo />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Greetings from "@/components/Greetings/Greetings.vue";
import Participate from "@/components/Participate/Participate.vue";
import Register from "@/components/Register/Register.vue";
import Vote from "@/components/Vote/Vote.vue";
import ListParticipant from "@/components/ListParticipant/ListParticipant.vue";
import Coupons from "@/components/Coupons/Coupons.vue";
import CongressProgram from "@/components/CongressProgram/CongressProgram.vue";
import FullRegistration from "@/components/FullRegistration/FullRegistration.vue";
import ShareTo from "@/components/ShareTo/ShareTo.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    Greetings,
    Participate,
    Register,
    Vote,
    ListParticipant,
    CongressProgram,
    Coupons,
    FullRegistration,
    ShareTo,
  },
  computed: {
    ...mapState(["authed"]),
  },
});
</script>
