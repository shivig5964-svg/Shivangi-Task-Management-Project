// API Configuration
// This file handles environment-based API URL configuration

const getApiUrl = () => {
  // Auto-detect environment based on hostname
  const isProduction = window.location.hostname.includes('vercel.app') || 
                      window.location.hostname.includes('netlify.app') ||
                      window.location.hostname.includes('github.io') ||
                      process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return process.env.REACT_APP_API_URL_PRODUCTION || 'https://shivangi-task-management-project.onrender.com/api';
  } else {
    return process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:5000/api';
  }
};

const API_CONFIG = {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me'
    },
    TASKS: {
      BASE: '/tasks',
      STATS: '/tasks/stats/summary'
    }
  }
};

// Helper function to get full API URL
export const getApiEndpoint = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get full API URL for auth endpoints
export const getAuthEndpoint = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH[endpoint]}`;
};

// Helper function to get full API URL for task endpoints
export const getTaskEndpoint = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS[endpoint]}`;
};

export default API_CONFIG;
