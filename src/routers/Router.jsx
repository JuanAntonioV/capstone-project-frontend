import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/notFound/NotFoundPage';
import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import GuestMiddleware from './GuestMiddleware';
import ProductPage from '@/pages/products/ProductPage';

export default function Router() {
    return (
        <Routes>
            <Route
                path='/login'
                element={
                    <GuestMiddleware>
                        <LoginPage />
                    </GuestMiddleware>
                }
            />

            <Route element={<DashboardLayout />}>
                <Route
                    path='/'
                    element={
                        <RequireAuth loginPath='/login'>
                            <HomePage />
                        </RequireAuth>
                    }
                />

                <Route path='/settings'>
                    <Route path='daftar-produk' element={<ProductPage />} />
                </Route>
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
