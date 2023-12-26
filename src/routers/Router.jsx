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
import TransactionHistory from '@/pages/transactions/TransactionHistory';
import RoleMiddleware from './RoleMiddleware';
import { ROLE } from '@/utils/globalEntities';

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

                <Route
                    path='/checkout'
                    element={
                        <RequireAuth loginPath='/login'>
                            <CheckoutPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path='riwayat-transaksi'
                    element={
                        <RequireAuth loginPath='/login'>
                            <TransactionHistory />
                        </RequireAuth>
                    }
                />

                <Route element={<RoleMiddleware roles={[ROLE.ADMIN]} />}>
                    <Route path='/settings'>
                        <Route
                            path='daftar-produk'
                            element={
                                <RequireAuth loginPath='/login'>
                                    <ProductPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='roles'
                            element={
                                <RequireAuth loginPath='/login'>
                                    <RolePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='daftar-kategori'
                            element={
                                <RequireAuth loginPath='/login'>
                                    <CategoryPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='akun-saya'
                            element={
                                <RequireAuth loginPath='/login'>
                                    <ProfilePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='admin'
                            element={
                                <RequireAuth loginPath='/login'>
                                    <AdminPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Route>
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
