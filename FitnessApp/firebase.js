// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCzkoVsfzmbk289IQOG1g9O6KGLHmJybY",
  authDomain: "fitnessapp411.firebaseapp.com",
  projectId: "fitnessapp411",
  storageBucket: "fitnessapp411.appspot.com",
  messagingSenderId: "1018160144795",
  appId: "1:1018160144795:web:ae53ad113f59aa7881413e"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
export { auth };

//const app = initializeApp(firebaseConfig);