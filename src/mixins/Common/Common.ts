import Vue from "vue";
import { smoothToElems } from "@/types";
import { mapMutations } from "vuex";

export default Vue.extend({
  methods: {
    ...mapMutations(["openAlert"]),
    async smoothTo(elemId: smoothToElems) {
      if (this.$route.name !== "Main") {
        await this.$router.push({ name: "Main" });
      }
      const myEl = document.getElementById(elemId);
      this.$smoothScroll({
        scrollTo: myEl as Element,
      });
    },
  },
});
