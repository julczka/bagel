<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="primary" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  },
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>

<style>
main {
  background-image: url("assets/brian-suman-Bfnh11jCv2E-unsplash (1).jpg");
  background-position: center;
  background-size: cover;
}

a {
  text-decoration: none;
}
</style>
