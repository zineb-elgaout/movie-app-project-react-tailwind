import React from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../../services/userService"

const ProtectedRoute = ({ children, rolesAllowed }) => {
  const userProfile = getUserProfile();

  if (!userProfile) {
    // pas connecté → redirige vers login
    return <Navigate to="/login" replace />;
  }

  if (rolesAllowed && !rolesAllowed.includes(userProfile.role)) {
    // connecté mais rôle non autorisé → redirige vers page d'accueil
    return <Navigate to="/toontime" replace />;
  }

  return children;
};

export default ProtectedRoute;
