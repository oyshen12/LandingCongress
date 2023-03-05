<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
    <Modals />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import Modals from "@/components/CommonModals/Modals.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "App",
  components: { Header, Modals, Footer },
  mounted() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setUser(JSON.parse(savedUser));
      this.setAuthed(true);
    }
    this.api
      .get(process.env.VUE_APP_API_USER_DATA, {
        cancelErrorHandle: true,
      })
      .then((data: any) => {
        const user = {
          id: data.data.id,
          accessBack: data.data.access_back,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          patronymic: data.data.patronymic,
        };
        this.setUser(user);
        this.setAuthed(true);
      })
      .catch(() => {
        this.setAuthed(false);
      });
  },
  methods: {
    ...mapMutations(["setUser", "setAuthed"]),
  },
});
</script>
