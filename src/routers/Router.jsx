import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/notFound/NotFoundPage';
import { Route, Routes } from 'react-router-dom';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
