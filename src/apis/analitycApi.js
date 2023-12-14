import api from '@/configs/api';

export const getStatsApi = async () => {
    const res = await api.get('/stats');
    return res.data;
};
