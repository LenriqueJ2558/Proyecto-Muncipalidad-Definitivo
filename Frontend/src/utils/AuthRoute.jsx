import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el token está en localStorage

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default AuthRoute;