import { STATUS } from '@/utils/globalEntities';

export default function StatusChip({ status }) {
    const colors = {
        [STATUS.AKTIF]: 'bg-green-500',
        [STATUS.NON_AKTIF]: 'bg-red-500',
    };

    const texts = {
        [STATUS.AKTIF]: 'Aktif',
        [STATUS.NON_AKTIF]: 'Tidak Aktif',
    };

    const color = colors[status];
    const text = texts[status];

    return (
        <span
            className={`text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded-lg ${color}`}
        >
            {text}
        </span>
    );
}
