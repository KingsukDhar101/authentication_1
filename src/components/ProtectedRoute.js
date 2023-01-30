import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  let {user} = useUserAuth();
  console.log("User: ", user);
  if (!user) {
    return <Navigate to="/signup" />
  }
  return children;
};

export default ProtectedRoute;
