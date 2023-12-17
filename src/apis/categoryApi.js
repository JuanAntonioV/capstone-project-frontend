import api from '@/configs/api';

export const getAllCategoriesApi = async () => {
    const res = await api.get('/categories');
    return res.data;
};

export const getCategoryByIdApi = async (id) => {
    const res = await api.get(`/categories/${id}`);
    return res.data;
};

export const createCategoryApi = async (category) => {
    const res = await api.post('/categories', category);
    return res.data;
};

export const updateCategoryApi = async ({ id, payload }) => {
    const res = await api.put(`/categories/${id}`, payload);
    return res.data;
};

export const deleteCategoryApi = async (id) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
};
