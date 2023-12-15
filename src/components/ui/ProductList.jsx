import { Card, Typography } from '@material-tailwind/react';
import ProductItem from './ProductItem';
import { MdAddCircleOutline } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProductApi, getAllProductsApi } from '@/apis/productApi';
import RetryFetch from './RetryFetch';
import ProductItemSkeleton from './ProductItemSkeleton';
import { useState } from 'react';
import AddProductModal from './AddProductModal';
import ConfirmationModal from './ConfirmationModal';
import toast from 'react-hot-toast';

export default function ProductList() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggleCreate = () => setOpenCreate((prev) => !prev);
    const toggleEdit = () => setOpenEdit((prev) => !prev);
    const toggleDelete = (product) => {
        if (product) {
            setSelectedProduct(product);
        }
        setOpenDelete((prev) => !prev);
    };

    const queryClient = useQueryClient();

    const deleteProductQuery = useMutation({
        mutationFn: deleteProductApi,
        onSuccess: () => {
            setOpenDelete(false);
            queryClient.invalidateQueries('products');
            toast.success('Berhasil menghapus produk');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteProduct = () => {
        if (selectedProduct) {
            deleteProductQuery.mutate(selectedProduct.id);
        } else {
            toast.error('Produk tidak ditemukan');
        }
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
        <>
            <main className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {!productQuery.isPending && (
                    <Card
                        className='gap-2 py-4 overflow-hidden text-gray-400 bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg shadow-none cursor-pointer flexCenterCol'
                        onClick={toggleCreate}
                    >
                        <MdAddCircleOutline className='w-16 h-16' />
                        <Typography variant='paragraph'>
                            Tambah Produk
                        </Typography>
                    </Card>
                )}

                {productQuery.isPending ? (
                    [...Array(8)].map((_, i) => <ProductItemSkeleton key={i} />)
                ) : (
                    <>
                        {productQuery.data?.map((product, i) => (
                            <ProductItem
                                key={i}
                                item={product}
                                editAction={toggleEdit}
                                deleteAction={toggleDelete}
                            />
                        ))}
                    </>
                )}
            </main>

            <AddProductModal open={openCreate} toggle={toggleCreate} />
            <ConfirmationModal
                open={openDelete}
                toggle={() => setOpenDelete((prev) => !prev)}
                title={'Hapus Produk'}
                description={'Apakah anda yakin ingin menghapus produk ini?'}
                onConfirm={handleDeleteProduct}
            />
        </>
    );
}
