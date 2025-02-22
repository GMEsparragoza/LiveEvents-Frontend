import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from './Spinner'

export const AdminRoutes = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner />
    }

    if(!user) {
        return <Navigate to='/login' />
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/profile" />
    }

    return <Outlet />;
}