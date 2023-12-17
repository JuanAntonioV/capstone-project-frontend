import api from '@/configs/api';

export const getAllRolesApi = async () => {
    const res = await api.get('/roles');
    return res.data;
};

export const getRoleByIdApi = async (id) => {
    const res = await api.get(`/roles/${id}`);
    return res.data;
};

export const createRoleApi = async (role) => {
    const res = await api.post('/roles', role);
    return res.data;
};

export const updateRoleApi = async ({ id, payload }) => {
    const res = await api.put(`/roles/${id}`, payload);
    return res.data;
};

export const deleteRoleApi = async (id) => {
    const res = await api.delete(`/roles/${id}`);
    return res.data;
};
