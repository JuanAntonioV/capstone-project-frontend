import { createUserApi } from '@/apis/adminApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import FormGroup from '../ui/FormGroup';
import { Input, Option, Select, Spinner } from '@material-tailwind/react';
import { getActiveRolesApi } from '@/apis/roleApi';
import RetryFetch from '../ui/RetryFetch';

export default function AddUserModal({ open, toggle }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const queryClient = useQueryClient();

    const activeRolesQuery = useQuery({
        queryKey: ['activeRoles'],
        queryFn: getActiveRolesApi,
        select: (data) => data.data,
    });

    const createUserQuery = useMutation({
        mutationFn: createUserApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('users');
                toast.success('Berhasil menambahkan user baru');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleAddUser = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
        };

        createUserQuery.mutate(payload);
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Tambah User'
            formId='addUserModal'
            loading={createUserQuery.isPending || activeRolesQuery.isPending}
        >
            {activeRolesQuery.isPending ? (
                <div className='flex items-center justify-center h-32 bg-gray-100'>
                    <Spinner color='blue' size='lg' />
                </div>
            ) : activeRolesQuery.isError ? (
                <RetryFetch
                    refetchAction={activeRolesQuery.refetch}
                    className='h-32 bg-gray-100'
                />
            ) : (
                <Form id={'addUserModal'} onSubmit={handleAddUser}>
                    <ErrorAlert
                        error={createUserQuery.error}
                        isError={createUserQuery.isError}
                    />
                    <FormGroup>
                        <Input
                            type='text'
                            name='name'
                            label='Nama Lengkap'
                            className='w-full'
                            onChange={handleChange}
                            value={form.name}
                            autoFocus
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='email'
                            name='email'
                            label='Email'
                            className='w-full'
                            onChange={handleChange}
                            value={form.email}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Input
                            type='password'
                            name='password'
                            label='Password'
                            className='w-full'
                            onChange={handleChange}
                            value={form.password}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='password'
                            name='password_confirmation'
                            label='Konfirmasi Password'
                            className='w-full'
                            onChange={handleChange}
                            value={form.password_confirmation}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Select
                            name='roles'
                            value={form.roles[0] ? String(form.roles[0]) : ''}
                            onChange={(val) => {
                                const roles = [];
                                roles.push(val);
                                setForm((prev) => ({ ...prev, roles: roles }));
                            }}
                            required
                            label='Role'
                            className='capitalize'
                        >
                            {activeRolesQuery.data.map((role, i) => (
                                <Option
                                    key={i}
                                    value={`${role.id}`}
                                    className='capitalize'
                                >
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </FormGroup>
                </Form>
            )}
        </Modal>
    );
}
