import Vue from "vue";
import Vuex from "vuex";
import { dbMenuAdd } from "@/firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    basket: [],
    currentUser: null,
    menuItems: [{ name: "a", price: "7", description: "ijdij" }],
  },
  mutations: {
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if (
            state.basket.find(itemInArray => item.name === itemInArray.name)
          ) {
            item = state.basket.find(
              itemInArray => item.name === itemInArray.name
            );
            item.quantity++;
          } else
            state.basket.push({
              name: item.name,
              price: item.price,
              quantity: 1,
            });
        });
      }
    },
    userStatus: (state, user) => {
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    },

    grabMenuItems: (state, payload) => {
      console.log("is this even happening?");
      state.menuItems = payload;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("userStatus", user);
    },

    setMenuItems: context => {
      let menu = [];
      dbMenuAdd.onSnapshot(snapshotItems => {
        snapshotItems.forEach(doc => {
          let menuItemData = doc.data();
          // console.log("data", menuItemData);
          menu.push({
            id: doc.id,
            name: menuItemData.name,
            description: menuItemData.description,
            price: menuItemData.price,
          });
        });
        menu = [];
      });
      context.commit("grabMenuItems", menu);
      console.log("is this the real life");
    },
  },
  modules: {},
  getters: {
    getBasket: state => state.basket,
    getUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
  },
});

export default store;
