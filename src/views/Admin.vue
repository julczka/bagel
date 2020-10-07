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
                <v-btn
                  small
                  icon
                  color="accent"
                  @click.stop="dialog = true"
                  @click="editItem(item)"
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
    <v-row>
      <v-dialog v-model="dialog" max-width="400">
        <v-card class="pa-4">
          <v-row align="center" justify="space-between" class="pa-4">
            <div>
              <span class="primary--text  text-h4">Edit item</span>
            </div>
          </v-row>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="item.name"
              :counter="30"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="item.description"
              :rules="descriptionRules"
              label="Description"
              required
            ></v-text-field>

            <v-text-field
              v-model="item.price"
              label="Price"
              required
              type="number"
            ></v-text-field>

            <v-row justify="space-between" class="px-3 pt-6">
              <v-btn color="error" class="mr-4" @click.stop="dialog = false">
                Cancel
              </v-btn>
              <v-btn
                color="light-green accent-4"
                class="mr-4"
                @click="updateItem(item)"
                @click.stop="dialog = false"
              >
                Update
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      rounded="pill"
      color="primary"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="resetSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { dbMenuAdd } from "@/firebase";

export default {
  name: "Admin",

  data() {
    return {
      dialog: false,
      item: [],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],

      descriptionRules: [
        v => !!v || "E-mail is required",
        v =>
          (v && v.length <= 200) ||
          "Description must be less than 200 characters",
      ],
    };
  },

  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },

  computed: {
    ...mapGetters({
      basket: "getBasket",
      desserts: "getMenuItems",
      snackbar: "getSnackbar",
      text: "getSnackbarText",
      timeout: "getSnackbarTimeout",
    }),
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
    ...mapActions([
      "setMenuItems",
      "deleteItem",
      "updateItem",
      "resetSnackbar",
    ]),
    editItem(item) {
      this.item = item;
    },

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
