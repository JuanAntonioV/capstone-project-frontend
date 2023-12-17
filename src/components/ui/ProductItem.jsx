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
import LazyLoadImageHandler from './LazyLoadImageHandler';

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

                <LazyLoadImageHandler
                    src={item?.image}
                    alt={item?.name}
                    className='object-cover w-full h-56 rounded-t-lg'
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
                        onClick={() => editAction(item)}
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
