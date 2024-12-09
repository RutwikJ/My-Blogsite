// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blogspot-1d2a3.firebaseapp.com",
  projectId: "my-blogspot-1d2a3",
  storageBucket: "my-blogspot-1d2a3.firebasestorage.app",
  messagingSenderId: "107852428221",
  appId: "1:107852428221:web:e79f0321d3d6141936d8d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

