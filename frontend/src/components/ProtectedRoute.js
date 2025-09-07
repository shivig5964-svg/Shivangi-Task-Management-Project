import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, []);

  // Show loading only if we're still loading and haven't reached timeout
  if (loading && !timeoutReached) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  // If we have a token in localStorage, allow access even if auth state is unclear
  const token = localStorage.getItem('token');
  if (token && (!isAuthenticated || timeoutReached)) {
    console.log('ProtectedRoute: Token exists, allowing access');
    return children;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
