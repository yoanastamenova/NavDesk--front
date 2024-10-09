import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const isAuthenticated = () => {
    const passport = localStorage.getItem('passport');
    return !!passport;
  };

  return (
    <Route
      path={path}
      element={
        isAuthenticated() 
          ? element 
          : <Navigate to="/login" replace state={{ from: path }} />
      }
    />
  );
};

export default ProtectedRoute;