import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);
