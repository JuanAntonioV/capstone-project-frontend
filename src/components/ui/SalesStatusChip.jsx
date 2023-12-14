import { salesStatus } from '@/utils/globalEntities';

export default function SalesStatusChip({ status }) {
    if (!status)
        return (
            <span className='text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded bg-gray-500'>
                Tidak ada status
            </span>
        );

    const colors = {
        [salesStatus.MENUNGGU_PEMBAYARAN]: 'bg-blue-500',
        [salesStatus.PROSES]: 'bg-orange-500',
        [salesStatus.SELESAI]: 'bg-green-500',
        [salesStatus.GAGAL]: 'bg-red-500',
        [salesStatus.DIBATALKAN]: 'bg-gray-500',
    };

    const texts = {
        [salesStatus.MENUNGGU_PEMBAYARAN]: 'Menunggu Pembayaran',
        [salesStatus.PROSES]: 'Sedang Diproses',
        [salesStatus.SELESAI]: 'Selesai',
        [salesStatus.GAGAL]: 'Gagal',
        [salesStatus.DIBATALKAN]: 'Dibatalkan',
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
