import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { getAuthEndpoint } from '../config/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'), // Start as true if token exists
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const hasCheckedAuth = useRef(false); // Ref to prevent duplicate auth checks
  const isFetchingUserData = useRef(false); // Ref to prevent multiple user data fetches
  const hasAttemptedUserDataFetch = useRef(false); // Ref to prevent multiple attempts
  const hasSuccessfullyFetchedUserData = useRef(false); // Ref to prevent any additional calls once we have user data

  // Single function to fetch user data
  const fetchUserData = useCallback(async (token) => {
    if (isFetchingUserData.current || hasSuccessfullyFetchedUserData.current) {
      return null;
    }

    try {
      isFetchingUserData.current = true;
      const response = await axios.get(getAuthEndpoint('ME'));
      hasSuccessfullyFetchedUserData.current = true; // Mark that we've successfully fetched user data
      return response.data.user;
    } catch (error) {
      console.error('AuthContext: Failed to fetch user data:', error.response?.data?.message);
      return null;
    } finally {
      isFetchingUserData.current = false;
    }
  }, []);

  // Set up axios interceptor for automatic token management
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error('AuthContext: 401 Unauthorized, logging out...');
          // Token expired or invalid
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          dispatch({ type: 'LOGOUT' });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Check authentication on app start - only run once
  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    
    const checkAuth = async () => {
      // Prevent duplicate calls in React StrictMode
      if (hasCheckedAuth.current) {
        return;
      }
      hasCheckedAuth.current = true;
      
      const token = localStorage.getItem('token');
      
      if (token && isMounted && !hasSuccessfullyFetchedUserData.current) {
        const userData = await fetchUserData(token);
        if (isMounted) {
          if (userData) {
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user: userData,
                token: token
              }
            });
          } else {
            // If token exists but /me fails, still set authenticated but without user data
            // This prevents the user from being logged out when the API is temporarily unavailable
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user: null, // Will be fetched later if needed
                token: token
              }
            });
          }
        }
      } else if (isMounted) {
        if (!token) {
          dispatch({ type: 'AUTH_FAIL', payload: null });
        }
      }
    };

    // Add a small delay to ensure axios interceptors are set up
    timeoutId = setTimeout(() => {
      checkAuth();
    }, 100);

    // Don't set user immediately - wait for the actual auth check
    // This prevents showing "User" instead of the real username

    // No fallback timeout needed - the main auth check handles everything
    // This prevents overriding user data that was successfully fetched
    
    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      isFetchingUserData.current = false; // Reset the ref
      hasAttemptedUserDataFetch.current = false; // Reset the attempt ref
      hasSuccessfullyFetchedUserData.current = false; // Reset the success ref
    };
  }, []); // Empty dependency array - only run once on mount

  // Retry fetching user data if we have a token but no user data
  useEffect(() => {
    const retryFetchUserData = async () => {
      if (state.isAuthenticated && state.token && !state.user && !isFetchingUserData.current && !hasSuccessfullyFetchedUserData.current) {
        const userData = await fetchUserData(state.token);
        if (userData) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: userData,
              token: state.token
            }
          });
        }
      }
    };

    // Only retry if we're authenticated but don't have user data
    if (state.isAuthenticated && state.token && !state.user) {
      const retryTimeout = setTimeout(retryFetchUserData, 500); // Retry after 500ms
      return () => clearTimeout(retryTimeout);
    }
  }, [state.isAuthenticated, state.token, state.user, fetchUserData]);

  const register = useCallback(async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(getAuthEndpoint('REGISTER'), userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAIL', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  const login = useCallback(async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await axios.post(getAuthEndpoint('LOGIN'), userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAIL', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    register,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};