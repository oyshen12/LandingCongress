<template>
  <div class="confirm">
    <Spinner size="80" width="6" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "@/components/CommonComponents/Spinner/Spinner.vue";

export default Vue.extend({
  name: "ConfirmEmail",
  components: { Spinner },
  mounted() {
    const key = this.$route.query.key;
    const id = this.$route.query.id;
    this.api
      .post(
        process.env.VUE_APP_API_CONFIRM_EMAIL,
        {
          id: +id,
          key,
        },
        {
          cancelErrorHandle: true,
        }
      )
      .then(() => {
        this.$router.push({ name: "Login" });
        this.openAlert("Email успешно подтвержден");
      })
      .catch(() => {
        this.$router.push({ name: "Main" });
        this.openAlert("Ошибка при подтверждении почты");
      });
  },
});
</script>

<style lang="scss" scoped>
.confirm {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
