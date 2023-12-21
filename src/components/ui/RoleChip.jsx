import { ROLE } from '@/utils/globalEntities';

export default function RoleChip({ roleId }) {
    const texts = {
        [ROLE.ADMIN]: ['Admin'],
        [ROLE.USER]: ['User'],
    };

    const colors = {
        [ROLE.ADMIN]: ['bg-red-500'],
        [ROLE.USER]: ['bg-blue-500'],
    };

    const text = texts[roleId];
    const color = colors[roleId];

    return (
        <span
            className={`text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded-lg ${color}`}
        >
            {text}
        </span>
    );
}
