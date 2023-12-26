import { useMemo } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Navigate, Outlet } from 'react-router-dom';

export default function RoleMiddleware({ roles }) {
    const auth = useAuthUser();

    const canAccess = useMemo(() => {
        if (auth().roles) {
            return roles.includes(auth().roles[0]);
        }
    }, [auth, roles]);

    if (canAccess) {
        return <Outlet />;
    } else {
        return (
            <Navigate to={'/not-found'} replace={true} state={{ from: '/' }} />
        );
    }
}
