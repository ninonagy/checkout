import firebase from 'firebase/app';
import 'firebase/firebase-database';

// Firebase Config
const config = {
  apiKey: "AIzaSyCwMtOZx8GpILiGn2nkDsvuPKyv79iC8Ho",
  authDomain: "kodius-ea795.firebaseapp.com",
  databaseURL: "https://kodius-ea795.firebaseio.com",
  projectId: "kodius-ea795",
  storageBucket: "kodius-ea795.appspot.com",
  messagingSenderId: "1044348982235",
  appId: "1:1044348982235:web:e0cb15970839ad6e"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();