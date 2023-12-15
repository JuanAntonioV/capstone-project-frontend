import { Card, Typography } from '@material-tailwind/react';
import ProductItem from './ProductItem';
import { MdAddCircleOutline } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '@/apis/productApi';
import RetryFetch from './RetryFetch';
import ProductItemSkeleton from './ProductItemSkeleton';

export default function ProductList() {
    const handleAddProduct = () => {
        toast.success('Berhasil menambahkan produk baru');
    };

    const productQuery = useQuery({
        queryKey: ['products'],
        queryFn: getAllProductsApi,
        select: (data) => data.data,
    });

    if (productQuery.isError) {
        return (
            <RetryFetch
                text='Produk tidak dapat dimuat'
                refetchAction={() => productQuery.refetch()}
                className='rounded-lg bg-gray-50 h-80 flexCenter'
            />
        );
    }

    return (
        <main className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {!productQuery.isPending && (
                <Card
                    className='gap-2 py-4 overflow-hidden text-gray-400 bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg shadow-none cursor-pointer flexCenterCol'
                    onClick={handleAddProduct}
                >
                    <MdAddCircleOutline className='w-16 h-16' />
                    <Typography variant='paragraph'>Tambah Produk</Typography>
                </Card>
            )}

            {productQuery.isPending ? (
                [...Array(8)].map((_, i) => <ProductItemSkeleton key={i} />)
            ) : (
                <>
                    {productQuery.data?.map((product, i) => (
                        <ProductItem key={i} item={product} />
                    ))}
                </>
            )}
        </main>
    );
}
