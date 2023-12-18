import { activedUserApi, getAllUsersApi } from '@/apis/adminApi';
import AddUserModal from '@/components/users/AddUserModal';
import ConfirmationModal from '@/components/products/ConfirmationModal';
import LoadingText from '@/components/ui/LoadingText';
import RetryFetch from '@/components/ui/RetryFetch';
import RoleChip from '@/components/ui/RoleChip';
import SectionTitle from '@/components/ui/SectionTitle';
import StatusChip from '@/components/ui/StatusChip';
import MainTable from '@/components/ui/tables/MainTable';
import { Button } from '@material-tailwind/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import EditUserModal from '@/components/users/EditUserModal';

export default function AdminPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');

    const usersQuery = useQuery({
        queryKey: ['users', search],
        queryFn: () => getAllUsersApi({ search }),
        select: (data) => data.data,
    });

    const rows = useMemo(() => {
        if (!usersQuery.data) return [];

        return usersQuery.data.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            status: item.status,
            registeredAt: item.registered_at,
            roles: item.roles,
        }));
    }, [usersQuery.data]);

    const queryClient = useQueryClient();

    const [createModal, setCreateModal] = useState(false);
    const [openActived, setOpenActived] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleCreateModal = () => setCreateModal((prev) => !prev);
    const toggleEditModal = (user) => {
        if (user) {
            setSelectedUser(user);
            setEditModal((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const toggleActivedModal = (user) => {
        if (user) {
            setSelectedUser(user);
            setOpenActived((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const activedUserQuery = useMutation({
        mutationFn: activedUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            toast.success('Berhasil mengaktifkan user');
            setOpenActived(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleActivedUser = () => {
        if (selectedUser?.id) {
            const payload = {
                id: selectedUser.id,
            };

            activedUserQuery.mutate(payload);
        } else {
            toast.error('kategori tidak ditemukan');
        }
    };

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Nama Lengkap',
            accessorKey: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Roles',
            accessorKey: 'roles',
            cell: (row) => (
                <span className='flex flex-col'>
                    {row.getValue('roles').map((role) => (
                        <RoleChip key={role} roleId={role} />
                    ))}
                </span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row) => <StatusChip status={row.getValue('status')} />,
        },
        {
            header: 'Dibuat pada',
            accessorKey: 'registeredAt',
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (row) => (
                <span className='flex justify-end space-x-2'>
                    <Button
                        color='light-blue'
                        size='sm'
                        onClick={() => toggleEditModal(row.row.original)}
                    >
                        Edit
                    </Button>
                    <Button
                        color={row.row.original.status ? 'red' : 'green'}
                        size='sm'
                        hidden={row.row.original.status}
                        disabled={activedUserQuery.isPending}
                        onClick={() => toggleActivedModal(row.row.original)}
                    >
                        <LoadingText
                            loading={activedUserQuery.isPending}
                            r
                            text={
                                row.row.original.status
                                    ? 'Nonaktifkan'
                                    : 'Aktifkan'
                            }
                        />
                    </Button>
                </span>
            ),
        },
    ];

    if (usersQuery.isError)
        return (
            <RetryFetch
                refetchAction={usersQuery.refetch}
                text='User tidak dapat dimuat'
                className='rounded-lg bg-gray-50 h-80 flexCenter'
            />
        );

    return (
        <>
            <section>
                <SectionTitle
                    title='Semua User'
                    subtitle='Halaman untuk mengatur user'
                    action={
                        <Button color='light-blue' onClick={toggleCreateModal}>
                            Tambah User
                        </Button>
                    }
                />

                <MainTable
                    columns={columns}
                    data={rows}
                    pagination
                    search={search}
                    setSearch={setSearch}
                    isLoading={usersQuery.isLoading}
                />
            </section>

            <AddUserModal open={createModal} toggle={toggleCreateModal} />
            <EditUserModal
                open={editModal}
                toggle={() => setEditModal((prev) => !prev)}
                userId={selectedUser?.id}
            />

            <ConfirmationModal
                open={openActived}
                btnActionColor={selectedUser?.status ? 'red' : 'green'}
                toggle={() => setOpenActived((prev) => !prev)}
                onConfirm={handleActivedUser}
                title={
                    selectedUser?.status ? 'Nonaktifkan User' : 'Aktifkan User'
                }
                description={
                    selectedUser?.status
                        ? 'Apakah anda yakin ingin menonaktifkan user ini?'
                        : 'Apakah anda yakin ingin mengaktifkan user ini?'
                }
                confirmText={selectedUser?.status ? 'Nonaktifkan' : 'Aktifkan'}
            />
        </>
    );
}
