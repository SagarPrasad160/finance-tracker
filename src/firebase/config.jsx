import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnClZ0n7O7UDhufbCnUQ0KCLFJRQRsxFg",
  authDomain: "finance-tracker-fb52c.firebaseapp.com",
  projectId: "finance-tracker-fb52c",
  storageBucket: "finance-tracker-fb52c.appspot.com",
  messagingSenderId: "894050390528",
  appId: "1:894050390528:web:bf47b87f859a218da3fee5",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);
// init auth
const auth = getAuth();

export { db, auth };
