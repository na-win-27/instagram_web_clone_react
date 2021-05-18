import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCw-KOHht_gqQrpmL8UQ16gdUdi23kZbJo",
  authDomain: "instagram-f3cae.firebaseapp.com",
  projectId: "instagram-f3cae",
  storageBucket: "instagram-f3cae.appspot.com",
  messagingSenderId: "162684763210",
  appId: "1:162684763210:web:cdef0103edd2715088bab3",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

var provider = new Firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  display: "popup",
});

export { firebase, FieldValue, provider };

// import { seedDatabase } from "../seed";
// console.log(firebase);
// console.log(typeof FieldValue);

// seedDatabase(firebase);
