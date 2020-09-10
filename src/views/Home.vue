<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col v-for="n in 4" :key="n"
          ><h1 class="white--text border">OUR BAGELS</h1>
          <div class="white border">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, hic?
            </p>
          </div></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped lang="scss">
.border {
  border: 2px white solid;
  padding: 1em;
}
</style>
