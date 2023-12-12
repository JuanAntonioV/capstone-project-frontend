import { Outlet } from 'react-router-dom';

export default function DashboardLayout({ className = '' }) {
    return (
        <main
            className={`max-w-screen-desktop mx-auto min-h-screen ${className}`}
        >
            <Outlet />
        </main>
    );
}
