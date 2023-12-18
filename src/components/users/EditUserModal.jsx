import { updateUserApi, getUserByIdApi } from '@/apis/adminApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import FormGroup from '../ui/FormGroup';
import {
    Checkbox,
    Input,
    Option,
    Select,
    Spinner,
} from '@material-tailwind/react';
import { getActiveRolesApi } from '@/apis/roleApi';
import RetryFetch from '../ui/RetryFetch';

export default function EditUserModal({ open, toggle, userId }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        status: false,
        roles: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserByIdApi(userId),
        select: (data) => data.data,
        enabled: !!userId,
    });

    useEffect(() => {
        if (userQuery.data) {
            setForm((prev) => ({
                ...prev,
                name: userQuery.data.name,
                email: userQuery.data.email,
                status: userQuery.data.status,
                roles: userQuery.data.roles,
            }));
        }
    }, [userQuery.data]);

    const activeRolesQuery = useQuery({
        queryKey: ['activeRoles'],
        queryFn: getActiveRolesApi,
        select: (data) => data.data,
    });

    const editUserQuery = useMutation({
        mutationFn: updateUserApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('users');
                toast.success('Berhasil mengubah user');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleEditUser = (e) => {
        e.preventDefault();

        if (form.password === '') {
            delete form.password;
            delete form.password_confirmation;
        }

        editUserQuery.mutate({ id: userId, payload: form });
    };

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Tambah Produk'
            formId='editUserModal'
            loading={editUserQuery.isPending || activeRolesQuery.isPending}
        >
            {activeRolesQuery.isPending || userQuery.isPending ? (
                <div className='flex items-center justify-center h-32 bg-gray-100'>
                    <Spinner color='blue' size='lg' />
                </div>
            ) : activeRolesQuery.isError || userQuery.isError ? (
                <RetryFetch
                    refetchAction={() => {
                        activeRolesQuery.refetch();
                        userQuery.refetch();
                    }}
                    className='h-32 bg-gray-100'
                />
            ) : (
                <Form id={'editUserModal'} onSubmit={handleEditUser}>
                    <ErrorAlert
                        error={editUserQuery.error}
                        isError={editUserQuery.isError}
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
                    <FormGroup>
                        <Input
                            type='password'
                            name='password'
                            label='Password'
                            className='w-full'
                            onChange={handleChange}
                            value={form.password}
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            checked={form.status}
                            color='light-blue'
                            onChange={(e) => {
                                const { checked } = e.target;
                                setForm((prev) => ({
                                    ...prev,
                                    status: checked,
                                }));
                            }}
                            label='Aktif'
                        />
                    </FormGroup>
                </Form>
            )}
        </Modal>
    );
}
