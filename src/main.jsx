import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment-timezone';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        },
    },
});

moment.tz.setDefault('Asia/Jakarta');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider authName='auth' authType='localstorage'>
                <ThemeProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
            <ReactQueryDevtools
                initialIsOpen={
                    import.meta.env.MODE === 'development' ? true : false
                }
            />
        </QueryClientProvider>
    </React.StrictMode>
);
