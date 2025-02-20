import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa_-pBEDd_lEnQKR5u92P4627mKrkl8PU",
  authDomain: "toyproject2-baa7f.firebaseapp.com",
  projectId: "toyproject2-baa7f",
  storageBucket: "toyproject2-baa7f.firebasestorage.app",
  messagingSenderId: "1031936527159",
  appId: "1:1031936527159:web:fb88f370e55a48efa4a8b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
