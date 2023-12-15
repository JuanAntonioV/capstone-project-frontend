import api from '@/configs/api';

export const getAllProductsApi = async () => {
    const res = await api.get('/products');
    return res.data;
};

export const createProductApi = async (product) => {
    const res = await api.post('/products', product);
    return res.data;
};

export const deleteProductApi = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
};
