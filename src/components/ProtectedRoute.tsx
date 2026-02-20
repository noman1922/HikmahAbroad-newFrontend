import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC<{ allowedType: 'agent' | 'student' }> = ({ allowedType }) => {
    const token = localStorage.getItem('token');
    // For now we assume agent login has a token. Student login isn't fully implemented yet.
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to={`/login?type=${allowedType}`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
