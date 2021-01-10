import firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBQ7CJpvWjySe-Ay1haJMAmudLBo4f5rDU",
    authDomain: "social-app-470f5.firebaseapp.com",
    projectId: "social-app-470f5",
    storageBucket: "social-app-470f5.appspot.com",
    messagingSenderId: "191959905068",
    appId: "1:191959905068:web:46f21ad417ddf1c6c8f289"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const firestore = firebase.firestore();

  export default firebase;

  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
