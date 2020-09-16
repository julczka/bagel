<template>
  <v-container>
    <v-row align="start" justify="space-around">
      <v-col cols="6" class="deep-orange lighten-4 rounded-lg">
        <v-row align="center" justify="space-between" class="pa-4">
          <div>
            <span class="primary--text  text-h4">MENU</span>
          </div>
          <v-btn color="primary" rounded link to="/add">
            <span>add item</span>
          </v-btn>
        </v-row>
        <v-simple-table fixed-header height="600">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Edit</th>
              <th class="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.id">
              <td class="pa-3">
                <span class="font-weight-bold">{{ item.name }} </span> <br />
                <span class="caption">{{ item.description }}</span>
              </td>
              <!--                <td>{{ item.price }}</td>-->
              <td class="pa-3">{{ item.price }}</td>
              <td>
                <v-btn small icon color="accent"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </td>
              <td>
                <v-btn small icon color="red" @click="deleteItem(item.id)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { dbMenuAdd } from "@/firebase";

export default {
  name: "Admin",

  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },

  computed: {
    ...mapGetters({ basket: "getBasket", desserts: "getMenuItems" }),
    subTotal() {
      let subCost = 0;
      for (let items in this.basket) {
        let individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },

    total() {
      let deliveryPrice = 10;
      return this.subTotal + deliveryPrice;
    },
  },

  methods: {
    ...mapActions(["setMenuItems", "deleteItem"]),

    // deleteItem(id) {
    //   if (id)
    //     dbMenuAdd
    //       .doc(id)
    //       .delete()
    //       .then(function() {
    //         console.log("Document successfully deleted!");
    //       })
    //       .catch(function(error) {
    //         console.error("Error removing document: ", error);
    //       });
    //   // this.setMenuItems();
    // },
  },
};
</script>

<style scoped lang="scss"></style>
