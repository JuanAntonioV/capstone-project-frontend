import { getRoleByIdApi, updateRoleApi } from '@/apis/roleApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import { Checkbox, Input, Spinner } from '@material-tailwind/react';
import RetryFetch from '../ui/RetryFetch';
import Form from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import FormGroup from '../ui/FormGroup';

export default function EditRoleModal({ open, toggle, roleId }) {
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

    const updateRoleQuery = useMutation({
        mutationFn: updateRoleApi,
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries('roles');
                toast.success('Berhasil mengubah role');
                toggle();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleUpdateRole = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
        };

        updateRoleQuery.mutate({ id: roleId, payload });
    };

    const roleQuery = useQuery({
        queryKey: ['role', roleId],
        enabled: Boolean(roleId),
        queryFn: () => getRoleByIdApi(roleId),
        select: (data) => data.data,
    });

    useEffect(() => {
        if (roleQuery.data) {
            setForm({
                name: roleQuery.data.name,
                status: roleQuery.data.status,
            });
        }
    }, [roleQuery.data]);

    return (
        <Modal
            open={open}
            toggle={toggle}
            title='Ubah Role'
            formId='editRoleModal'
            loading={updateRoleQuery.isPending || roleQuery.isPending}
        >
            {roleQuery.isLoading ? (
                <div className='gap-2 flexCenterCol'>
                    <Spinner color='blue' className='w-8 h-8' />
                    Memuat
                </div>
            ) : roleQuery.isError ? (
                <RetryFetch
                    refetchAction={() => roleQuery.refetch()}
                    text='Role tidak dapat dimuat'
                />
            ) : (
                <Form id={'editRoleModal'} onSubmit={handleUpdateRole}>
                    <ErrorAlert
                        error={updateRoleQuery.error}
                        isError={updateRoleQuery.isError}
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
