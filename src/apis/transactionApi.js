import api from '@/configs/api';

export const getAllTransactionApi = async ({ page, limit = 10, from, to }) => {
    const res = await api.get(
        `/transactions?limit=${limit}${from ? `&from=${from}` : ''}${
            to ? `&to=${to}` : ''
        }${page ? `&page=${page}` : ''}`
    );
    return res.data;
};
