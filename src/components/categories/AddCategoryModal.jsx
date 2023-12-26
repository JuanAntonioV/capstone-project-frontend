import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import FormGroup from '../ui/FormGroup';
import { Input } from '@material-tailwind/react';
import { createCategoryApi } from '@/apis/categoryApi';
import UploadInput from '../ui/UploadInput';

export default function AddCategoryModal({ open, toggle }) {
    const [form, setForm] = useState({
        name: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'image') {
            setForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
            return;
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            return;
        }
    };

    const queryClient = useQueryClient();

    const createCategoryQuery = useMutation({
        mutationFn: createCategoryApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('category');
                toast.success('Berhasil menambahkan kategori baru');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleAddCategory = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
        };

        createCategoryQuery.mutate(payload);
    };

    const handleClearImage = () => {
        setForm((prev) => ({ ...prev, image: null }));
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Tambah Kategori'
            formId='addCategoryModal'
            loading={createCategoryQuery.isPending}
        >
            <Form id={'addCategoryModal'} onSubmit={handleAddCategory}>
                <ErrorAlert
                    error={createCategoryQuery.error}
                    isError={createCategoryQuery.isError}
                />
                <FormGroup>
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
                        label='Nama Kategori'
                        className='w-full'
                        onChange={handleChange}
                        value={form.name}
                        autoFocus
                        required
                    />
                </FormGroup>
            </Form>
        </Modal>
    );
}
