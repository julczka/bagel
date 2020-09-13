import firebase from "firebase";

export const db = firebase.firestore();
export const dbMenuAdd = db.collection("menuItems");
