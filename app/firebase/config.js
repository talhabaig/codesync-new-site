// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
export {app, auth, db, storage}





// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import {getAuth} from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: "AIzaSyATJmyLITXEIc_qXAZRB5sJMSQrV6xZXHc",
//   authDomain: "codesync-site-15efb.firebaseapp.com",
//   projectId: "codesync-site-15efb",
//   storageBucket: "codesync-site-15efb.appspot.com",
//   messagingSenderId: "1025009658599",
//   appId: "1:1025009658599:web:84ad7a20295e35e4ba9042"
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const auth = getAuth(app)
// const db = getFirestore(app);
// const storage = getStorage(app);
// export {app, auth, db, storage}