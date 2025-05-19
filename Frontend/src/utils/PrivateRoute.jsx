import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el token está en localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;