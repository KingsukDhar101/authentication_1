import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwY8aXqt6ppp6Zt0i64tUv7Lsk53R9zBs",
  authDomain: "email-based-authentication-1.firebaseapp.com",
  projectId: "email-based-authentication-1",
  storageBucket: "email-based-authentication-1.appspot.com",
  messagingSenderId: "357306923039",
  appId: "1:357306923039:web:e5f3984f1a1d0869bfbd2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
