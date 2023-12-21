import { deleteCategoryApi, getAllCategoriesApi } from '@/apis/categoryApi';
import AddCategoryModal from '@/components/categories/AddCategoryModal';
import EditCategoryModal from '@/components/categories/EditCategoryModal';
import ConfirmationModal from '@/components/products/ConfirmationModal';
import LoadingText from '@/components/ui/LoadingText';
import RetryFetch from '@/components/ui/RetryFetch';
import SectionTitle from '@/components/ui/SectionTitle';
import StatusChip from '@/components/ui/StatusChip';
import MainTable from '@/components/ui/tables/MainTable';
import { Button } from '@material-tailwind/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function CategoryPage() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const categoryQuery = useQuery({
        queryKey: ['category'],
        queryFn: getAllCategoriesApi,
        select: (data) => data.data,
    });

    const rows = useMemo(() => {
        if (!categoryQuery.data) return [];

        return categoryQuery.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status,
            createdAt: item.createdAt,
        }));
    }, [categoryQuery.data]);

    const queryClient = useQueryClient();

    const [createModal, setCreateModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const toggleCreateModal = () => setCreateModal((prev) => !prev);
    const toggleEditModal = (id) => {
        if (id) {
            setSelectedCategoryId(id);
            setEditModal((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const toggleDeleteModal = (id) => {
        if (id) {
            setSelectedCategoryId(id);
            setOpenDelete((prev) => !prev);
        } else {
            toast.error('Terjadi kesalahan');
        }
    };

    const deleteCategoryQuery = useMutation({
        mutationFn: deleteCategoryApi,
        onSuccess: () => {
            queryClient.invalidateQueries('category');
            toast.success('Berhasil menghapus kategori');
            setOpenDelete(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteCategory = () => {
        if (selectedCategoryId) {
            deleteCategoryQuery.mutate(selectedCategoryId);
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
            header: 'Nama Kategori',
            accessorKey: 'name',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row) => <StatusChip status={row.getValue('status')} />,
        },
        {
            header: 'Dibuat pada',
            accessorKey: 'createdAt',
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
                        disabled={deleteCategoryQuery.isPending}
                        onClick={() => toggleDeleteModal(row.getValue('id'))}
                    >
                        <LoadingText
                            loading={deleteCategoryQuery.isPending}
                            text={'Hapus'}
                        />
                    </Button>
                </span>
            ),
        },
    ];

    if (categoryQuery.isError)
        return (
            <RetryFetch
                refetchAction={categoryQuery.refetch}
                text='Kategori tidak dapat dimuat'
                className='rounded-lg bg-gray-50 h-80 flexCenter'
            />
        );

    return (
        <>
            <section>
                <SectionTitle
                    title='Semua Kategori'
                    subtitle='Halaman untuk mengatur kategori'
                    action={
                        <Button color='light-blue' onClick={toggleCreateModal}>
                            Tambah Kategori
                        </Button>
                    }
                />

                <MainTable
                    columns={columns}
                    data={rows}
                    pagination
                    isLoading={categoryQuery.isLoading}
                />
            </section>

            <AddCategoryModal open={createModal} toggle={toggleCreateModal} />
            <EditCategoryModal
                open={editModal}
                toggle={() => setEditModal((prev) => !prev)}
                categoryId={selectedCategoryId}
            />
            <ConfirmationModal
                open={openDelete}
                toggle={() => setOpenDelete((prev) => !prev)}
                title={'Hapus Kategori'}
                description={'Apakah anda yakin ingin menghapus kategori ini?'}
                onConfirm={handleDeleteCategory}
            />
        </>
    );
}
