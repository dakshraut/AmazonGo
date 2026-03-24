// frontend/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCojfSfIm0H7-dgoeBKt2ADb1rx3NBwLX0",
  authDomain: "go-ccb14.firebaseapp.com",
  projectId: "go-ccb14",
  storageBucket: "go-ccb14.firebasestorage.app",
  messagingSenderId: "1049671726131",
  appId: "1:1049671726131:web:433a9b3b97af18fb25df46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Email/Password Sign Up
export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign Out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth State Observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, googleProvider };