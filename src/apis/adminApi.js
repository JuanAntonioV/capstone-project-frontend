import api from '@/configs/api';

export const getAllUsersApi = async ({ search }) => {
    const res = await api.get('/users?search=' + search);
    return res.data;
};

export const getUserByIdApi = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const createUserApi = async (data) => {
    const res = await api.post('/users', data);
    return res.data;
};

export const updateUserApi = async ({ id, payload }) => {
    const res = await api.put(`/users/${id}`, payload);
    return res.data;
};

export const deleteUserApi = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};

export const activedUserApi = async (payload) => {
    const res = await api.post('/users/active', payload);
    return res.data;
};
