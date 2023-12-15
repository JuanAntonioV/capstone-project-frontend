import api from '@/configs/api';

export const getAllProductsApi = async () => {
    const res = await api.get('/products');
    return res.data;
};
