import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/notFound/NotFoundPage';
import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import GuestMiddleware from './GuestMiddleware';
import ProductPage from '@/pages/products/ProductPage';
import CheckoutPage from '@/pages/checkout/CheckoutPage';
import RolePage from '@/pages/roles/RolePage';
import CategoryPage from '@/pages/category/CategoryPage';
import ProfilePage from '@/pages/profiles/ProfilePage';
import AdminPage from '@/pages/admins/AdminPage';

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

                <Route path='/checkout' element={<CheckoutPage />} />

                <Route path='/settings'>
                    <Route path='daftar-produk' element={<ProductPage />} />
                    <Route path='roles' element={<RolePage />} />
                    <Route path='daftar-kategori' element={<CategoryPage />} />
                    <Route path='akun-saya' element={<ProfilePage />} />
                    <Route path='admin' element={<AdminPage />} />
                </Route>
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
