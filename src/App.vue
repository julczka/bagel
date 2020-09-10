<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
        <!--        <v-row align="center" justify="center">-->
        <!--          <v-col class="text-center">-->
        <!--            <v-tooltip left>-->
        <!--              <template v-slot:activator="{ on }">-->
        <!--                <v-btn :href="source" icon large target="_blank" v-on="on">-->
        <!--                  <v-icon large>mdi-code-tags</v-icon>-->
        <!--                </v-btn>-->
        <!--              </template>-->
        <!--              <span>Source</span>-->
        <!--            </v-tooltip>-->
        <!--          </v-col>-->
        <!--        </v-row>-->
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
    Navigation
  },
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  })
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
