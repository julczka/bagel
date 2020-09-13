<template>
  <v-container>
    <v-row align="start" justify="space-around" class="rel">
      <v-col cols="6" class="deep-orange lighten-4 rounded-lg">
        <div class="pb-4"><span class="primary--text  text-h4">MENU</span></div>
        <v-simple-table fixed-header height="600">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">ASS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in desserts" :key="index">
              <td class="pa-3">
                <span class="font-weight-bold">{{ item.name }} </span> <br />
                <span class="caption">{{ item.description }}</span>
              </td>
              <!--                <td>{{ item.price }}</td>-->
              <td class="pa-3">{{ item.price }}</td>
              <td>
                <v-btn small icon color="primary" @click="addToBasket(item)"
                  ><v-icon>mdi-plus-box</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table></v-col
      >
      <v-col cols="4" class="deep-orange lighten-4 rounded-lg sticky">
        <div class="pb-4">
          <span class="primary--text text-h4">BASKET</span>
        </div>
        <v-simple-table v-if="basket.length > 0">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in basket" :key="index">
              <td class="pa-3">
                <span class="font-weight-bold">{{ item.name }} </span> <br />
              </td>

              <td class="pa-3">
                <v-btn small icon color="primary"
                  ><v-icon @click="decreaseQuantity(item)"
                    >mdi-minus-box</v-icon
                  ></v-btn
                >
                {{ item.quantity }}
                <v-btn
                  small
                  icon
                  color="primary"
                  @click="increaseQuantity(item)"
                  ><v-icon>mdi-plus-box</v-icon></v-btn
                >
              </td>
              <td>
                {{ item.price }}
              </td>
            </tr>
            <v-divider></v-divider>
          </tbody>
        </v-simple-table>
        <p v-else>basket is empty</p>
        <v-row class="pa-5 ">
          <v-col class="font-italic"
            ><p>Subtotal</p>
            <p>Delivery</p>
            <p>Sum</p></v-col
          >
          <v-col class="text-right font-weight-bold"
            ><p>{{ subTotal }} DKK</p>
            <p>10 DKK</p>
            <p>{{ total }} DKK</p></v-col
          >
        </v-row>
        <v-row class="pa-5" justify="end">
          <v-btn color="primary">checkout</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "@/firebase";

export default {
  name: "Menu",
  data() {
    return {
      desserts: [],
      basket: []
    };
  },

  created() {
    dbMenuAdd.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let menuItemData = doc.data();
        this.desserts.push(menuItemData);
      });
    });
  },

  computed: {
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
    }
  },

  methods: {
    addToBasket(item) {
      if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
        item = this.basket.find(itemInArray => item.name === itemInArray.name);
        this.increaseQuantity(item);
      } else
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
        });
    },

    increaseQuantity(item) {
      item.quantity++;
    },

    decreaseQuantity(item) {
      if (item.quantity > 0) item.quantity--;
      else if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.rel {
  position: relative;
}
.sticky {
  position: sticky;
}
</style>
