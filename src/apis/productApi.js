import api from '@/configs/api';

export const getAllProductsApi = async ({ status, search }) => {
    const res = await api.get(
        `/products${status ? `?status=${status}` : ''}${
            search ? `&search=${search}` : ''
        }`
    );
    return res.data;
};

export const getProductByIdApi = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
};

export const createProductApi = async (product) => {
    const res = await api.post('/products', product, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const deleteProductApi = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
};

export const updateProductApi = async ({ id, product }) => {
    const res = await api.put(`/products/${id}`, product, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
