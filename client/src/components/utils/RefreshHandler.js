import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useAuth } from '../context/authContext';

const RefreshHandler = ({setIsAuthenticated}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { setIsAuthenticated } = useAuth();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // If there's an error, treat the token as expired
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token", token);
    
    if (token) {
      if (!isTokenExpired(token)) {
        setIsAuthenticated(true);
        // Redirect to /home if on certain paths
        if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signUp') {
          navigate('/home');
        }
      } else {
        // Redirect to /login if token is expired
        setIsAuthenticated(false);
        navigate('/login');
      }
    } else {
      // Redirect to /login if no token is present
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
