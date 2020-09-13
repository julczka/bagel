<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col cols="6" class="white rounded-lg pa-10">
        <v-row align="center" justify="space-between" class="pa-4">
          <div>
            <span class="primary--text  text-h4">Add new item</span>
          </div>
        </v-row>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="30"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>

          <v-text-field
            v-model="price"
            label="Price"
            required
            type="number"
          ></v-text-field>

          <v-row justify="space-between" class="px-3 pt-6">
            <v-btn color="error" class="mr-4" @click="reset">
              Reset
            </v-btn>
            <v-btn
              color="light-green accent-4"
              class="mr-4"
              @click="addNewMenuItem()"
            >
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="4" class="deep-orange lighten-4 rounded-lg">
        <v-row align="center" justify="space-between" class="pa-4">
          <div>
            <span class="primary--text  text-h4">Preview</span>
          </div>
        </v-row>
        <v-alert
          prominent
          type="info"
          v-if="added"
          transition="scroll-y-transition"
        >
          <v-row align="center">
            <v-col class="grow">Item added to the menu</v-col>
          </v-row>
        </v-alert>
        <v-simple-table class="pb-4">
          <thead>
            <tr>
              <th class="text-left">Name</th>

              <th class="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pa-3">
                <span class="font-weight-bold">{{ name }} </span> <br />
                <span class="caption">{{ description }}</span>
              </td>
              <td class="text-right">{{ price }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "@/firebase";

export default {
  data: () => ({
    added: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "E-mail is required",
      v =>
        (v && v.length <= 200) || "Description must be less than 200 characters"
    ],
    price: null
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    showAlertSuccess() {
      this.added = !this.added;
    },

    addNewMenuItem() {
      let self = this;
      dbMenuAdd
        .add({
          name: this.name,
          description: this.description,
          price: this.price
        })
        .then(function(docRef) {
          self.reset();
          self.showAlertSuccess();
          setTimeout(self.showAlertSuccess, 3000);
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
