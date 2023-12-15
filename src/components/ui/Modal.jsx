import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Typography,
} from '@material-tailwind/react';
import { MdClose } from 'react-icons/md';
import LoadingText from './LoadingText';

export default function Modal({
    open,
    toggle,
    children,
    btnClose = true,
    btnCloseText = 'Close',
    btnAction = true,
    btnActionColor = 'green',
    btnActionText = 'Save',
    btnActionOnClick = () => {},
    title = 'Modal',
    formId = '',
    loading = false,
}) {
    return (
        <Dialog
            size='xs'
            open={open}
            handler={toggle}
            className='bg-transparent shadow-none'
        >
            <Card className='mx-auto w-full max-w-[32rem]'>
                <header className='relative p-4 border-b'>
                    <Typography variant='h6'>{title}</Typography>
                    <MdClose
                        className='absolute cursor-pointer top-4 right-4'
                        size={24}
                        onClick={toggle}
                    />
                </header>
                <CardBody className='flex flex-col gap-4'>{children}</CardBody>
                <CardFooter className='gap-4 pt-2 flexEnd'>
                    {btnClose && (
                        <Button
                            color='blue-gray'
                            variant='outlined'
                            onClick={toggle}
                        >
                            {btnCloseText}
                        </Button>
                    )}
                    {btnAction && (
                        <Button
                            color={btnActionColor}
                            onClick={btnActionOnClick}
                            form={formId}
                            type='submit'
                            disabled={loading}
                        >
                            <LoadingText
                                loading={loading}
                                text={btnActionText}
                            />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Dialog>
    );
}
