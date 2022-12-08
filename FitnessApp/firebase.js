// Import the functions you need from the SDKs you need

//import * as firebase from "firebase";
import "firebase/app";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//issue is that we were using firebase sdk version 8, need to update to version9

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCzkoVsfzmbk289IQOG1g9O6KGLHmJybY",
  authDomain: "fitnessapp411.firebaseapp.com",
  databaseURL: "https://fitnessapp411-default-rtdb.firebaseio.com/",
  projectId: "fitnessapp411",
  storageBucket: "fitnessapp411.appspot.com",
  messagingSenderId: "1018160144795",
  appId: "1:1018160144795:web:ae53ad113f59aa7881413e"
  
};


//export const db = getDatabase(app);
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
export { auth };

// Initialize Realtime Database and get a reference to the service
const db = firebase.database();

//export default db;
//initialize database
//export const db = getDatabase(app);
//const app = initializeApp(firebaseConfig);

