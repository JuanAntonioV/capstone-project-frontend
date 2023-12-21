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
