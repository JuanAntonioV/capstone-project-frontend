import { Typography } from '@material-tailwind/react';
import { RiErrorWarningFill } from 'react-icons/ri';
import Modal from '../ui/Modal';

export default function ConfirmationModal({
    open,
    toggle,
    onConfirm,
    title,
    description,
    confirmText = 'Hapus',
    cancelText = 'Batal',
}) {
    return (
        <Modal
            open={open}
            toggle={toggle}
            title={title}
            btnActionOnClick={onConfirm}
            btnActionText={confirmText}
            btnCloseText={cancelText}
            btnActionColor='red'
        >
            <div className='gap-2 pb-4 flexCenterCol'>
                <RiErrorWarningFill size={82} className='text-yellow-700' />
                <Typography
                    color='blue-gray'
                    variant='paragraph'
                    className='max-w-sm text-center '
                >
                    {description}
                </Typography>
            </div>
        </Modal>
    );
}
