<template>
  <div class="navigation">
    <v-navigation-drawer v-model="drawer" app>
      <v-row v-if="user">
        <v-card class="mx-auto" max-width="434" tile>
          <v-img
            height="100%"
            src="https://images.unsplash.com/photo-1585445490387-f47934b73b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          >
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content class=" px-2">
                    <v-list-item-title class="title">{{
                      user.email
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Admin Bagel</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-row>
      <v-list dense>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/menu">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-food-fork-drink</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/about">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <!--        <router-link to="/login">-->
        <!--          <v-list-item link>-->
        <!--            <v-list-item-action>-->
        <!--              <v-icon>mdi-account-cog</v-icon>-->
        <!--            </v-list-item-action>-->
        <!--            <v-list-item-content>-->
        <!--              <v-list-item-title>Login</v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--        </router-link>-->
        <router-link to="/admin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-light headline"
        >Jedz bajgla kurwa!</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn v-if="user" @click="signOut()">Log out</v-btn>
      <v-btn v-else link to="/login">Log in</v-btn>
    </v-app-bar>
  </div>
</template>
<script>
// import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: "Navigation",
  props: {},
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters({ user: "getUser" }),
  },

  methods: {
    ...mapActions(["setUser"]),
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
          alert("you are logged out");
        })
        .catch(error => {
          alert(error);
        });
    },
  },

  mounted() {},
};
</script>
<style></style>
