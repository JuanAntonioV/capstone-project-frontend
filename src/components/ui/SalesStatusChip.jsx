import { SALES_STATUS } from '@/utils/globalEntities';

export default function SalesStatusChip({ status }) {
    if (!status)
        return (
            <span className='text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded bg-gray-500'>
                Tidak ada status
            </span>
        );

    const colors = {
        [SALES_STATUS.MENUNGGU_PEMBAYARAN]: 'bg-blue-500',
        [SALES_STATUS.PROSES]: 'bg-orange-500',
        [SALES_STATUS.SELESAI]: 'bg-green-500',
        [SALES_STATUS.GAGAL]: 'bg-red-500',
        [SALES_STATUS.DIBATALKAN]: 'bg-gray-500',
    };

    const texts = {
        [SALES_STATUS.MENUNGGU_PEMBAYARAN]: 'Menunggu Pembayaran',
        [SALES_STATUS.PROSES]: 'Sedang Diproses',
        [SALES_STATUS.SELESAI]: 'Selesai',
        [SALES_STATUS.GAGAL]: 'Gagal',
        [SALES_STATUS.DIBATALKAN]: 'Dibatalkan',
    };

    const color = colors[status];
    const text = texts[status];

    return (
        <span
            className={`text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded ${color}`}
        >
            {text}
        </span>
    );
}
