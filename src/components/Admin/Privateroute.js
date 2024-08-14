import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import api from './api'; // Axios instance

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/api/verify-token/'); // Create an endpoint to verify the token
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/admin" />}
    />
  );
};

export default PrivateRoute;
