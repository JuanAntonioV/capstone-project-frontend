import axios from 'axios';

const mode = import.meta.env.MODE; // 'development' or 'production'
const devUrl = import.meta.env.VITE_API_DEV_URL;
const prodUrl = import.meta.env.VITE_API_PROD_URL;
const baseURL = mode === 'development' ? devUrl : prodUrl;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    try {
        const token = localStorage.getItem('auth');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    } catch (err) {
        console.log(err);
    }
});

api.interceptors.response.use(
    (response) => response,
    (err) => {
        return Promise.reject(err.response.data);
    }
);

export default api;
