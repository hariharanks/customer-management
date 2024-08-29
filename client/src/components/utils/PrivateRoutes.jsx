import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const handleNavigateWithRefresh = () => {
        navigate("/login");
        window.location.reload(); // This will refresh the page after navigation
      };
    
    return isAuthenticated ? <Outlet /> : handleNavigateWithRefresh();
}

export default PrivateRoutes;