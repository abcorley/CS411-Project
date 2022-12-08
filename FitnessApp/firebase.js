import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCzkoVsfzmbk289IQOG1g9O6KGLHmJybY',
  authDomain: 'fitnessapp411.firebaseapp.com',
  databaseURL: 'https://fitnessapp411-default-rtdb.firebaseio.com/',
  projectId: 'fitnessapp411',
  storageBucket: 'fitnessapp411.appspot.com',
  messagingSenderId: '1018160144795',
  appId: '1:1018160144795:web:ae53ad113f59aa7881413e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

export { auth, database };
