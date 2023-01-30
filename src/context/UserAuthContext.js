import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("" || localStorage.getItem("token"));
  const [token, setToken] = useState("");
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    // window.localStorage.setItem("token", auth.accessToken);
    signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    localStorage.removeItem("token");
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      if (currentUser) {
        localStorage.setItem("token", currentUser.accessToken);
      }
      // setToken(currentUser.accessToken);

      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // setUser();
  }, [user]);
  return (
    <userAuthContext.Provider value={{ user, signUp, login, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
