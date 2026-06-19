import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../store/Auth";

function ProtectedRoute({children}) {
    const { isLoggedIn } = useAuth();
  return (
     isLoggedIn ? children : <Navigate to="/login" replace/>
  )
}

export default ProtectedRoute
