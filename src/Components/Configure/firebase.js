import firebase from 'firebase';
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyB66yUhIak54RhU95ZZabSE4d3nShcP7y4",
  authDomain: "biblioteca1134.firebaseapp.com",
  databaseURL: "https://biblioteca1134.firebaseio.com",
  projectId: "biblioteca1134",
  storageBucket: "biblioteca1134.appspot.com",
  messagingSenderId: "401323055462",
  appId: "1:401323055462:web:111c1254621bb07b00d0a7",
  measurementId: "G-BH3ZMJ7SCN"
};

  firebase.initializeApp(firebaseConfig);

  export const myFirebase = firebase;
  export const myFirestore = firebase.firestore();
 
