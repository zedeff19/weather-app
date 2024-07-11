// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOONSHGsjVKXImzMdBgqn33qQf4sGyu5M",
  authDomain: "weather-d2874.firebaseapp.com",
  projectId: "weather-d2874",
  storageBucket: "weather-d2874.appspot.com",
  messagingSenderId: "169340750897",
  appId: "1:169340750897:web:710ee5b8e3d840b4d2d910",
  measurementId: "G-7GPL7YQ9DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;