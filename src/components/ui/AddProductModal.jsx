import { Input } from '@material-tailwind/react';
import Form from './Form';
import FormGroup from './FormGroup';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { formatRupiah, parseRupiah } from '@/utils/helpers';
import { useState } from 'react';
import { createProductApi } from '@/apis/productApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ErrorAlert from './ErrorAlert';

export default function AddProductModal({ open, toggle }) {
    const [form, setForm] = useState({
        name: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const priceFormated = formatRupiah(value);
            setForm((prev) => ({ ...prev, [name]: priceFormated }));
            return;
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const queryClient = useQueryClient();

    const createProductQuery = useMutation({
        mutationFn: createProductApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('products');
                toast.success('Berhasil menambahkan produk baru');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        const priceParsed = parseRupiah(form.price);

        const payload = {
            ...form,
            price: priceParsed,
        };

        createProductQuery.mutate(payload);
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Tambah Produk'
            formId='addProduct'
            loading={createProductQuery.isPending}
        >
            <Form id={'addProduct'} onSubmit={handleAddProduct}>
                <ErrorAlert
                    error={createProductQuery.error}
                    isError={createProductQuery.isError}
                />

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
            </Form>
        </Modal>
    );
}
