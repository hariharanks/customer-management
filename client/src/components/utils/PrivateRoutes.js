import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({isAuthenticated}) => {
    // let isAuthenticated = localStorage.getItem('isLoggedIn') === 'true' || false;
    console.log("isAuthenticated======", isAuthenticated);
    
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;
