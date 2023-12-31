import { getProductByIdApi, updateProductApi } from '@/apis/productApi';
import { formatRupiah, parseRupiah } from '@/utils/helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import FormGroup from '../ui/FormGroup';
import { Checkbox, Input, Spinner } from '@material-tailwind/react';
import RetryFetch from '../ui/RetryFetch';
import UploadInput from '../ui/UploadInput';

export default function EditProductModal({ open, toggle, productId }) {
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: null,
        status: false,
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'price') {
            const priceFormated = formatRupiah(value);
            setForm((prev) => ({ ...prev, [name]: priceFormated }));
            return;
        } else if (name === 'status') {
            setForm((prev) => ({ ...prev, [name]: checked }));
            return;
        } else if (name === 'image') {
            setForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
            return;
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            return;
        }
    };

    const queryClient = useQueryClient();

    const updateProductQuery = useMutation({
        mutationFn: updateProductApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('products');
                toast.success('Berhasil mengubah produk');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const priceParsed = parseRupiah(form.price);

        const payload = {
            ...form,
            price: priceParsed,
        };

        updateProductQuery.mutate({ id: productId, product: payload });
    };

    const productQuery = useQuery({
        queryKey: ['product', productId],
        enabled: Boolean(productId),
        queryFn: () => getProductByIdApi(productId),
        select: (data) => data.data,
    });

    useEffect(() => {
        if (productQuery.data) {
            setForm({
                name: productQuery.data.name,
                price: formatRupiah(productQuery.data.price),
                image: productQuery.data.image,
                status: Boolean(productQuery.data.status),
            });
        }
    }, [productQuery.data]);

    const handleClearImage = () => {
        setForm((prev) => ({ ...prev, image: null }));
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Ubah Produk'
            formId='editProduct'
            loading={updateProductQuery.isPending || productQuery.isPending}
        >
            {productQuery.isLoading ? (
                <div className='gap-2 flexCenterCol'>
                    <Spinner color='blue' className='w-8 h-8' />
                    Memuat
                </div>
            ) : productQuery.isError ? (
                <RetryFetch
                    refetchAction={() => productQuery.refetch()}
                    text='Produk tidak dapat dimuat'
                />
            ) : (
                <Form id={'editProduct'} onSubmit={handleUpdateProduct}>
                    <ErrorAlert
                        error={updateProductQuery.error}
                        isError={updateProductQuery.isError}
                    />

                    <FormGroup className={'pb-4'}>
                        <UploadInput
                            formImage={form.image}
                            onChange={handleChange}
                            clearImage={handleClearImage}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Input
                            type='text'
                            name='name'
                            label='Nama Produk'
                            className='w-full'
                            onChange={handleChange}
                            value={form.name}
                            autoFocus
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='text'
                            name='price'
                            label='Harga Produk'
                            className='w-full'
                            onChange={handleChange}
                            value={form.price}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            label='Aktif'
                            color='blue'
                            name='status'
                            checked={form.status}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            )}
        </Modal>
    );
}
