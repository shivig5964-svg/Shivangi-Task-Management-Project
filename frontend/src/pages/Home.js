import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container">
      <div className="hero-section" style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '15px',
        marginBottom: '40px'
      }}>
        <h1 className="responsive-heading" style={{ marginBottom: '20px' }}>
          Task Management Made Simple
        </h1>
        <p className="responsive-subheading" style={{ marginBottom: '30px', opacity: 0.9 }}>
          Organize your tasks, boost your productivity, and achieve your goals
        </p>
        
        {isAuthenticated ? (
          <div>
            <p className="responsive-text" style={{ marginBottom: '20px' }}>
              Welcome back, <strong>{user?.username}</strong>!
            </p>
            <Link to="/dashboard" className="btn btn-light btn-lg">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="btn-group-responsive justify-content-center">
            <Link to="/register" className="btn btn-light btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
          </div>
        )}
      </div>

      <div className="features-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <h3>Create Tasks</h3>
          <p style={{ color: '#6c757d' }}>
            Easily create and organize your tasks with titles, descriptions, and status tracking.
          </p>
        </div>

        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
          <h3>Track Progress</h3>
          <p style={{ color: '#6c757d' }}>
            Mark tasks as completed and track your productivity with detailed statistics.
          </p>
        </div>

        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h3>Secure & Private</h3>
          <p style={{ color: '#6c757d' }}>
            Your tasks are secure with JWT authentication and private to your account.
          </p>
        </div>
      </div>

      <div className="card text-center">
        <h2>Features</h2>
        <div className="feature-cards" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <div>
            <h4>User Authentication</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              Secure registration and login with JWT tokens
            </p>
          </div>
          <div>
            <h4>Task Management</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              Create, edit, delete, and organize your tasks
            </p>
          </div>
          <div>
            <h4>Status Tracking</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              Mark tasks as pending or completed
            </p>
          </div>
          <div>
            <h4>Filtering</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              Filter tasks by status for better organization
            </p>
          </div>
          <div>
            <h4>Statistics</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              View your productivity statistics and completion rates
            </p>
          </div>
          <div>
            <h4>Responsive Design</h4>
            <p style={{ color: '#6c757d', fontSize: '14px' }}>
              Works perfectly on desktop and mobile devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
