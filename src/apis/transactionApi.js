import api from '@/configs/api';

export const getAllTransactionApi = async ({
    page,
    limit = 10,
    from,
    to,
    search,
}) => {
    const res = await api.get(
        `/transactions${page ? `?page=${page}&limit=${limit}` : ''}${
            from ? `&from=${from}` : ''
        }${to ? `&to=${to}` : ''}${search ? `&search=${search}` : ''}`
    );
    return res.data;
};

export const getTransactionDetailApi = async (id) => {
    const res = await api.get(`/transaction/${id}`);
    return res.data;
};

export const confirmTransactionApi = async (id) => {
    const res = await api.post(`/transaction/${id}/confirm`);
    return res.data;
};

export const cancelTransactionApi = async (id) => {
    const res = await api.post(`/transaction/${id}/cancel`);
    return res.data;
};

export const finishTransactionApi = async (id) => {
    const res = await api.post(`/transaction/${id}/finish`);
    return res.data;
};

export const createTransactionApi = async (data) => {
    const res = await api.post(`/transaction`, data);
    return res.data;
};
