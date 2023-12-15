import { Button, Typography } from '@material-tailwind/react';
import { TfiReload } from 'react-icons/tfi';

export default function RetryFetch({
    text = 'Gagal memuat data',
    refetchAction,
    className = '',
}) {
    return (
        <div className={`flex-col gap-3 flexCenter ${className}`}>
            <Typography color='blue-gray' variant='paragraph'>
                {text}
            </Typography>
            <Button
                onClick={refetchAction}
                variant='outlined'
                color='blue-gray'
                size='sm'
                className='flex gap-2'
            >
                Retry <TfiReload />
            </Button>
        </div>
    );
}
