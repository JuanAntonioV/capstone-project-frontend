import { getMeApi } from '@/apis/authApi';
import MainNavbar from '@/components/headers/MainNavbar';
import ScreenLoading from '@/components/ui/ScreenLoading';
import { useQuery } from '@tanstack/react-query';
import { useSignOut } from 'react-auth-kit';
import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

export default function DashboardLayout({ className = '' }) {
    const signOut = useSignOut();

    const meQuery = useQuery({
        queryKey: ['me'],
        queryFn: getMeApi,
        retry: 1,
    });

    if (meQuery.isLoading) {
        return <ScreenLoading />;
    }

    if (meQuery.isError) {
        toast.error(meQuery.error.message);
        signOut();
        return <Navigate to='/login' replace />;
    }

    return (
        <main className={`max-w-7xl px-4 mx-auto mb-20 ${className}`}>
            <MainNavbar />
            <main className='mt-32'>
                <Outlet />
            </main>
        </main>
    );
}
