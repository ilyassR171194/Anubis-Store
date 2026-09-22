// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRCbLiOdZ912O5HpSuRmPb04Qoxy0P7NE",
  authDomain: "anubis-store.firebaseapp.com",
  projectId: "anubis-store",
  storageBucket: "anubis-store.firebasestorage.app",
  messagingSenderId: "263659571541",
  appId: "1:263659571541:web:85ebe6074c6cdc119207dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
