import { Input } from '@material-tailwind/react';
import Form from '../ui/Form';
import FormGroup from '../ui/FormGroup';
import Modal from '../ui/Modal';
import ErrorAlert from '../ui/ErrorAlert';
import { useState } from 'react';
import { createRoleApi } from '@/apis/roleApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AddRoleModal({ open, toggle }) {
    const [form, setForm] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const queryClient = useQueryClient();

    const createRoleQuery = useMutation({
        mutationFn: createRoleApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('roles');
                toast.success('Berhasil menambahkan role baru');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleAddRole = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
        };

        createRoleQuery.mutate(payload);
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Tambah Role'
            formId='addRoleModal'
            loading={createRoleQuery.isPending}
        >
            <Form id={'addRoleModal'} onSubmit={handleAddRole}>
                <ErrorAlert
                    error={createRoleQuery.error}
                    isError={createRoleQuery.isError}
                />
                <FormGroup>
                    <Input
                        type='text'
                        name='name'
                        label='Nama Role'
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
