import { Typography } from '@material-tailwind/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCopy } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

export default function CopyText({
    value,
    className = '',
    variant = 'paragraph',
    ...props
}) {
    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopySuccess(true);
            toast.success('Berhasil menyalin');
        } catch (err) {
            setCopySuccess(false);
            toast.error('Gagal menyalin');
        }
    };

    return (
        <Typography
            variant={variant}
            color='blue-gray'
            className={`flex items-center gap-2 font-bold cursor-pointer ${className}`}
            onClick={copyToClipboard}
            {...props}
        >
            {value}{' '}
            {copySuccess ? (
                <FaCircleCheck size={16} color='#10B981' />
            ) : (
                <FaRegCopy size={14} color='#6B7280' />
            )}
        </Typography>
    );
}
