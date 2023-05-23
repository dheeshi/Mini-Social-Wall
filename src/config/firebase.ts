import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6ZKpq17vRocj1Ike65bs-jx7kt43iMWg",
  authDomain: "react-typescript-project-4ac66.firebaseapp.com",
  projectId: "react-typescript-project-4ac66",
  storageBucket: "react-typescript-project-4ac66.appspot.com",
  messagingSenderId: "438382382343",
  appId: "1:438382382343:web:266e2e840ec26504cf09a2",
  measurementId: "G-C9PK7PLRT2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
