import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD1IshS9OR2bSwNb5yIlGVcfotrJ5m9lQI",
  authDomain: "capstone-2-e7474.firebaseapp.com",
  projectId: "capstone-2-e7474",
  storageBucket: "capstone-2-e7474.appspot.com",
  messagingSenderId: "694086489082",
  appId: "1:694086489082:web:2e978c0364d01a42c94a43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { authentication, provider, db };
