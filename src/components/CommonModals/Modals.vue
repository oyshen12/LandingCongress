<template>
  <div>
    <PersonalCabinetModal />
    <OrderCallModal />
    <AlertModal />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonalCabinetModal from "@/components/CommonModals/PersonalCabinet/PersonalCabinet.vue";
import OrderCallModal from "@/components/CommonModals/OrderCall/OrederCall.vue";
import AlertModal from "@/components/CommonModals/AlertModal/AlertModal.vue";

export default Vue.extend({
  name: "ModalsComponent",
  components: {
    PersonalCabinetModal,
    OrderCallModal,
    AlertModal,
  },
});
</script>
