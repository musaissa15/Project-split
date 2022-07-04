import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz91CImqXNM1vT7ufqbaE7GpHXmw9hOiI",
  authDomain: "split-chores.firebaseapp.com",
  projectId: "split-chores",
  storageBucket: "split-chores.appspot.com",
  messagingSenderId: "230807290415",
  appId: "1:230807290415:web:a006d091511ba74a3d7cda",
  measurementId: "G-DS8JZKBVJE",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
