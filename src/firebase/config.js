import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


/* --------------------------- configure firebase --------------------------- */

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "drift-music-be719.firebaseapp.com",
    projectId: "drift-music-be719",
    storageBucket: "drift-music-be719.appspot.com",
    messagingSenderId: "207775918077",
    appId: "1:207775918077:web:609d2f45c8ee77d1f5db94"
  };

  /* --------------------------- initialize firebase -------------------------- */

  firebase.initializeApp(firebaseConfig)

  /* --------------------------- initialize services -------------------------- */

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  /* -------------------------------- timestamp ------------------------------- */

  const timeStamp = firebase.firestore.FieldValue.serverTimestamp




  /* --------------------------------- Export --------------------------------- */
  export {projectAuth,projectFirestore,projectStorage,timeStamp}