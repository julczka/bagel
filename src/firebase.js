// import firebase from "firebase";
import { firebaseConfig } from "../firebaseConfig";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const dbMenuAdd = db.collection("menuItems");

// export utils/refs
export { db, auth, dbMenuAdd };
