import { getCategoryByIdApi, updateCategoryApi } from '@/apis/categoryApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import { Checkbox, Input, Spinner } from '@material-tailwind/react';
import RetryFetch from '../ui/RetryFetch';
import ErrorAlert from '../ui/ErrorAlert';
import Form from '../ui/Form';
import FormGroup from '../ui/FormGroup';

export default function EditCategoryModal({ open, toggle, categoryId }) {
    const [form, setForm] = useState({
        name: '',
        status: false,
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'status') {
            setForm((prev) => ({ ...prev, [name]: checked }));
            return;
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            return;
        }
    };

    const queryClient = useQueryClient();

    const updateCategoryQuery = useMutation({
        mutationFn: updateCategoryApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('category');
                toast.success('Berhasil mengubah kategori');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleUpdateCategory = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
        };

        updateCategoryQuery.mutate({ id: categoryId, payload });
    };

    const categoryQuery = useQuery({
        queryKey: ['category', categoryId],
        enabled: Boolean(categoryId),
        queryFn: () => getCategoryByIdApi(categoryId),
        select: (data) => data.data,
    });

    useEffect(() => {
        if (categoryQuery.data) {
            setForm({
                name: categoryQuery.data.name,
                status: categoryQuery.data.status,
            });
        }
    }, [categoryQuery.data]);

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Ubah Category'
            formId='editCategoryModal'
            loading={updateCategoryQuery.isPending || categoryQuery.isPending}
        >
            {categoryQuery.isLoading ? (
                <div className='gap-2 flexCenterCol'>
                    <Spinner color='blue' className='w-8 h-8' />
                    Memuat
                </div>
            ) : categoryQuery.isError ? (
                <RetryFetch
                    refetchAction={() => categoryQuery.refetch()}
                    text='Category tidak dapat dimuat'
                />
            ) : (
                <Form id={'editCategoryModal'} onSubmit={handleUpdateCategory}>
                    <ErrorAlert
                        error={updateCategoryQuery.error}
                        isError={updateCategoryQuery.isError}
                    />
                    <FormGroup>
                        <Input
                            type='text'
                            name='name'
                            label='Nama Category'
                            className='w-full'
                            onChange={handleChange}
                            value={form.name}
                            autoFocus
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
