import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../../services/AuthService";


const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;