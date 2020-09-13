<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6" class="deep-orange lighten-4 rounded-lg">
        <h1>Admin login</h1>

        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
          ></v-text-field>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>

          <v-btn color="warning" @click.prevent="signIn">
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container></template
>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "LogIn",
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    signIn() {
      console.log("hello");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/admin");
          console.log("logged in");
        })
        .catch(function(error) {
          // Handle Errors

          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") alert("haslo kurwa");
          else alert(errorMessage);
          // ...
        });
    }
  }
};
</script>

<style scoped></style>
