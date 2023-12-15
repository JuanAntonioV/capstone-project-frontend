import { formatRupiah } from '@/utils/helpers';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Typography,
} from '@material-tailwind/react';
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md';

export default function ProductItem({ item, editAction, deleteAction }) {
    return (
        <Card className='overflow-hidden bg-white border rounded-lg shadow-md'>
            <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='relative m-0 rounded-none'
            >
                <Chip
                    size='sm'
                    value={item?.status ? 'Tersedia' : 'Tidak Tersedia'}
                    color={item?.status ? 'green' : 'red'}
                    className='absolute shadow-lg top-4 right-4'
                />

                <img
                    src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
                    alt='ui/ux review check'
                />
            </CardHeader>
            <CardBody>
                <Typography
                    variant='h5'
                    color='blue-gray'
                    className='font-semibold'
                >
                    {item?.name}
                </Typography>
                <Typography
                    variant='small'
                    color='gray'
                    className='font-normal'
                >
                    Harga {formatRupiah(item?.price, true)}
                </Typography>
            </CardBody>
            <CardFooter className='pt-0 flexCenter'>
                <ButtonGroup fullWidth variant='outlined'>
                    <Button
                        className='flex items-center w-full gap-2 text-blue-500 border-blue-500'
                        onClick={editAction}
                    >
                        <MdModeEditOutline size={20} />
                        <span>Edit</span>
                    </Button>
                    <Button
                        className='flex items-center w-full gap-2 text-red-500 border-red-500'
                        onClick={() => deleteAction(item)}
                    >
                        <MdDeleteForever size={20} />
                        Hapus
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}
