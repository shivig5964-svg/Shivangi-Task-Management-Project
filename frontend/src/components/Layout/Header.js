import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            <h1 style={{ margin: 0, color: '#007bff' }}>Task Manager</h1>
          </Link>
          
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              <span className="responsive-text">Welcome, <strong>{user?.username}</strong></span>
              <div className="btn-group-responsive">
                <Link to="/dashboard" className="btn btn-secondary btn-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="btn-group-responsive">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
