// import firebase from "firebase";
import { firebaseConfig } from "../firebaseConfig";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service

// collection references
const dbMenuAdd = db.collection("menuItems");

// export utils/refs
export { db, auth, dbMenuAdd, storage };
