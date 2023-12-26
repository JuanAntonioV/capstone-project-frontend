import { IconButton, Typography } from '@material-tailwind/react';
import { useStore } from '@/stores/useStore';
import { formatPrice } from '@/utils/formaters';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import LazyLoadImageHandler from '../ui/LazyLoadImageHandler';

export default function ProductItem({ product }) {
    const {
        selectedCategory,
        addToCheckout,
        checkoutProducts,
        removeToCheckout,
    } = useStore();

    const handleAddProduct = (product) => addToCheckout(product);
    const handleRemoveProduct = (product) => removeToCheckout(product);

    const currProductCheckout = checkoutProducts.find(
        (p) => p.id === product?.id
    );

    return (
        <div
            className={`flex flex-col px-4 py-5 border border-gray-300 rounded-xl transition-all h-fit ${
                currProductCheckout ? ' !border-blue-500 shadow-lg' : 'bg-white'
            }`}
        >
            <div className='flexCenter'>
                <LazyLoadImageHandler
                    src={product.image}
                    className='mb-4 rounded-2xl'
                />
            </div>

            <Typography color='blue-gray' variant='h6'>
                {product.name}
            </Typography>

            <footer className='items-end mt-4 flexBetween'>
                <div>
                    <Typography
                        variant='small'
                        className='text-xs text-gray-500'
                    >
                        Harga
                    </Typography>
                    <Typography variant='paragraph' className='font-semibold'>
                        Rp.{' '}
                        {selectedCategory?.id === 1
                            ? `${formatPrice(product.price)}`
                            : `${formatPrice(product.price)}`}{' '}
                        <span className='text-xs font-normal text-gray-500'>
                            /{selectedCategory?.id === 1 ? 'pcs' : 'kg'}
                        </span>
                    </Typography>
                </div>
                <div className='gap-4 flexEnd'>
                    {currProductCheckout && (
                        <IconButton
                            color='red'
                            variant='outlined'
                            size='sm'
                            ripple={false}
                            onClick={() => handleRemoveProduct(product)}
                        >
                            <IoMdRemove size={22} />
                        </IconButton>
                    )}

                    {currProductCheckout && (
                        <Typography
                            variant='paragraph'
                            className='font-semibold'
                        >
                            {currProductCheckout.quantity}{' '}
                            {selectedCategory?.id === 1 ? 'pcs' : 'kg'}
                        </Typography>
                    )}
                    <IconButton
                        color='blue'
                        variant='outlined'
                        size='sm'
                        ripple={false}
                        onClick={() => handleAddProduct(product)}
                    >
                        <IoMdAdd size={22} />
                    </IconButton>
                </div>
            </footer>
        </div>
    );
}
