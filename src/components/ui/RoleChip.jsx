import { ROLE } from '@/utils/globalEntities';

export default function RoleChip({ roleId }) {
    const texts = {
        [ROLE.ADMIN]: ['Admin'],
        [ROLE.USER]: ['User'],
    };

    const text = texts[roleId];

    return (
        <span
            className={`text-xs capitalize w-fit px-3 py-1.5 font-medium text-white rounded bg-blue-500`}
        >
            {text}
        </span>
    );
}
