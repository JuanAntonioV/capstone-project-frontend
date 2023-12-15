import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

export default function GuestMiddleware({ children }) {
    const isAuthenticated = useIsAuthenticated();
    if (isAuthenticated()) return <Navigate to={'/'} replace />;
    return children;
}
