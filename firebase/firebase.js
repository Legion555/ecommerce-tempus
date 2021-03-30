import firebase from 'firebase/app';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCIwIkKb5FfkbkfX9OGmnTcsZbn_oN2cso",
    authDomain: "sa-boerewors.firebaseapp.com",
    projectId: "sa-boerewors",
    storageBucket: "sa-boerewors.appspot.com",
    messagingSenderId: "928319523508",
    appId: "1:928319523508:web:63a75c9fda095192c125e1",
    measurementId: "G-S1MQ11GTBB"
  };
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }

const storage = firebase.storage();

export { 
    storage, firebase
as default}