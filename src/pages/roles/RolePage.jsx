import { deleteRoleApi, getAllRolesApi } from '@/apis/roleApi';
import ConfirmationModal from '@/components/products/ConfirmationModal';
import AddRoleModal from '@/components/roles/AddRoleModal';
import EditRoleModal from '@/components/roles/EditRoleModal';
import LoadingText from '@/components/ui/LoadingText';
import RetryFetch from '@/components/ui/RetryFetch';
import SectionTitle from '@/components/ui/SectionTitle';
import StatusChip from '@/components/ui/StatusChip';
import MainTable from '@/components/ui/tables/MainTable';
import { Button } from '@material-tailwind/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function RolePage() {
    const [selectedRoleId, setSelectedRoleId] = useState(null);

    const rolesQuery = useQuery({
        queryKey: ['roles'],
        queryFn: getAllRolesApi,
        select: (data) => data.data,
    });

    const rows = useMemo(() => {
        if (!rolesQuery.data) return [];

        return rolesQuery.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status,
        }));
    }, [rolesQuery.data]);

    const queryClient = useQueryClient();

    const [createModal, setCreateModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleCreateModal = () => setCreateModal((prev) => !prev);
    const toggleEditModal = (id) => {
        if (id) {
            setSelectedRoleId(id);
            setEditModal((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const toggleDeleteModal = (id) => {
        if (id) {
            setSelectedRoleId(id);
            setOpenDelete((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const deleteRoleQuery = useMutation({
        mutationFn: deleteRoleApi,
        onSuccess: () => {
            queryClient.invalidateQueries('roles');
            toast.success('Berhasil menghapus role');
            setOpenDelete(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteRole = () => {
        if (selectedRoleId) {
            deleteRoleQuery.mutate(selectedRoleId);
        } else {
            toast.error('Role tidak ditemukan');
        }
    };

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Nama Role',
            accessorKey: 'name',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row) => <StatusChip status={row.getValue('status')} />,
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (row) => (
                <span className='flex justify-end space-x-2'>
                    <Button
                        color='light-blue'
                        size='sm'
                        onClick={() => toggleEditModal(row.getValue('id'))}
                    >
                        Edit
                    </Button>
                    <Button
                        color='red'
                        size='sm'
                        disabled={deleteRoleQuery.isPending}
                        onClick={() => toggleDeleteModal(row.getValue('id'))}
                    >
                        <LoadingText
                            loading={deleteRoleQuery.isPending}
                            text={'Hapus'}
                        />
                    </Button>
                </span>
            ),
        },
    ];

    if (rolesQuery.isError)
        return (
            <RetryFetch
                refetchAction={rolesQuery.refetch}
                text='Role tidak dapat dimuat'
                className='rounded-lg bg-gray-50 h-80 flexCenter'
            />
        );

    return (
        <>
            <section>
                <SectionTitle
                    title='Semua Role'
                    subtitle='Halaman untuk mengatur role'
                    action={
                        <Button color='light-blue' onClick={toggleCreateModal}>
                            Tambah Role
                        </Button>
                    }
                />

                <MainTable
                    columns={columns}
                    data={rows}
                    isLoading={rolesQuery.isLoading}
                />
            </section>

            <AddRoleModal open={createModal} toggle={toggleCreateModal} />
            <EditRoleModal
                open={editModal}
                toggle={() => setEditModal((prev) => !prev)}
                roleId={selectedRoleId}
            />
            <ConfirmationModal
                open={openDelete}
                toggle={() => setOpenDelete((prev) => !prev)}
                title={'Hapus Produk'}
                description={'Apakah anda yakin ingin menghapus produk ini?'}
                onConfirm={handleDeleteRole}
            />
        </>
    );
}
