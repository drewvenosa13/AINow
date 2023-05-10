// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/auth";
import "firebase/compat/firestore";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLpH_aWQJiWEcCe4W4P4FGHtapZPAE_c8",
  authDomain: "ai-now-79fbd.firebaseapp.com",
  projectId: "ai-now-79fbd",
  storageBucket: "ai-now-79fbd.appspot.com",
  messagingSenderId: "184267690811",
  appId: "1:184267690811:web:461093adc2d189af501d1e",
  measurementId: "G-RRGWD02PTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { firebaseConfig, app, auth, db, analytics };