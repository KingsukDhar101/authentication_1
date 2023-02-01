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
    if (auth.currentUser?.emailVerified) {
      return signInWithEmailAndPassword(auth, email, password);
    } else {
      
    }
  }
  function logOut() {
    localStorage.removeItem("token");
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth", currentUser?.email, currentUser?.emailVerified);
      if(!!currentUser){
        await currentUser.reload();
      }

      if (!!currentUser && currentUser?.emailVerified) {
        console.log("email verified");
        // localStorage.setItem("token", currentUser.accessToken);
      } else {
        console.log("email not verified");
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
