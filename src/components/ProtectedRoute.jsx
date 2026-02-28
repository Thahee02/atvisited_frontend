import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { isAuthenticated, user, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white font-sans">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 mb-4"></div>
                <p className="ml-4 font-black uppercase tracking-widest text-xs">Transmitting...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        const redirectPath = adminOnly ? "/admin/login" : "/login";
        return <Navigate to={redirectPath} replace />;
    }

    if (adminOnly && user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;
