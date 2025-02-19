import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from './Spinner'
import { useSearchParams } from 'react-router-dom';

export const ResetRoutes = () => {
    const { user, isLoading } = useAuth();
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    const secretUserID = searchParams.get("secretUserID");

    if (isLoading) {
        return <Spinner />
    }

    if (user || !oobCode || !secretUserID) {
        return <Navigate to="/" />
    }

    return <Outlet />;
}