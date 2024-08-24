import react, { useEffect } from 'react';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      // Compare current time with token expiration time
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // If there's an error, treat the token as expired
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (!isTokenExpired(localStorage.getItem('token'))) {
        setIsAuthenticated(true);
        if (location.pathname === '/' || location.pathname === '/login' || location.pathname === 'signUp') {
          navigate('/home', { replace: false });
        }
      } else {
        navigate('/login');
      }
    }
  }, [location, navigate, setIsAuthenticated])

  return (
    null
  )
}
export default RefreshHandler;