// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
   apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "vihhan-tech-ai.firebaseapp.com",
  projectId: "vihhan-tech-ai",
  storageBucket: "vihhan-tech-ai.firebasestorage.app",
  messagingSenderId: "186311664008",
  appId: "1:186311664008:web:dd3391131e11ef4c3b5a3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();