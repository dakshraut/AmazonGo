import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCojfSfIm0H7-dgoeBKt2ADb1rx3NBwLX0",
  authDomain: "go-ccb14.firebaseapp.com",
  projectId: "go-ccb14",
  storageBucket: "go-ccb14.firebasestorage.app",
  messagingSenderId: "1049671726131",
  appId: "1:1049671726131:web:433a9b3b97af18fb25df46"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();