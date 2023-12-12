import MainNavbar from '@/components/headers/MainNavbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout({ className = '' }) {
    return (
        <main className={`max-w-7xl px-4 mx-auto min-h-screen ${className}`}>
            <MainNavbar />
            <main className='mt-28'>
                <Outlet />
            </main>
        </main>
    );
}
