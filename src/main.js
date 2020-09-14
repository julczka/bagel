import Vue from "vue";
// import firebase from "firebase";
// import { firebaseConfig } from "../firebaseConfig";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";
Vue.config.productionTip = false;

// firebase.initializeApp(firebaseConfig);

let app;

auth.onAuthStateChanged(user => {
  console.log("user", user);
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount("#app");
  }
});
