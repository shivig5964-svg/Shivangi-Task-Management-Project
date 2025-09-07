// API Configuration
// This file handles environment-based API URL configuration

const getApiUrl = () => {
  const environment = process.env.REACT_APP_ENVIRONMENT || 'local';
  
  if (environment === 'production') {
    return process.env.REACT_APP_API_URL_PRODUCTION || 'https://your-production-api.com/api';
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
