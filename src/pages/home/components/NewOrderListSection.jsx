import { getAllTransactionApi } from '@/apis/transactionApi';
import SalesDetailModal from '@/components/sales/SalesDetailModal';
import RetryFetch from '@/components/ui/RetryFetch';
import SalesStatusChip from '@/components/ui/SalesStatusChip';
import SectionTitle from '@/components/ui/SectionTitle';
import MainTable from '@/components/ui/tables/MainTable';
import useToggle from '@/hooks/useToggle';
import { formatRupiah } from '@/utils/helpers';
import { Button, IconButton } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { MdManageSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function NewOrderListSection() {
    const navigate = useNavigate();

    const fromDate = moment().format('YYYY-MM-DD');
    const toDate = moment().add(1, 'day').format('YYYY-MM-DD');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [open, toggle] = useToggle(false);
    const [selectedSalesId, setSelectedSalesId] = useState(null);

    const handleViewSalesDetail = (salesId) => {
        setSelectedSalesId(salesId);
        toggle(true);
    };

    const newOrderQuery = useQuery({
        queryKey: ['newOrder', limit, page],
        queryFn: () =>
            getAllTransactionApi({
                from: fromDate,
                to: toDate,
                limit,
                page,
            }),
        select: (data) => data.data,
    });

    const rows = useMemo(() => {
        if (!newOrderQuery.data) return [];

        return newOrderQuery.data?.data?.map((item) => ({
            sales_id: item.id,
            customer_name: item.user?.name,
            category: item.category?.name,
            total_payment: item.total_payment,
            status: item.status,
            delivery_date: item.delivery_date,
        }));
    }, [newOrderQuery.data]);

    const columns = [
        {
            header: 'Sales ID',
            accessorKey: 'sales_id',
        },
        {
            header: 'Nama Pelanggan',
            accessorKey: 'customer_name',
            cell: (row) => (
                <span className='capitalize'>
                    {row.getValue('customer_name')}
                </span>
            ),
        },
        {
            header: 'Katagori',
            accessorKey: 'category',
        },
        {
            header: 'Total Pembayaran',
            accessorKey: 'total_payment',
            cell: (row) => formatRupiah(row.getValue('total_payment'), 'Rp '),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row) => <SalesStatusChip status={row.getValue('status')} />,
        },
        {
            header: 'Tanggal Antar',
            accessorKey: 'delivery_date',
            cell: (row) => moment(row.delivery_date).format('DD MMMM YYYY'),
        },
        {
            header: '',
            accessorKey: 'sales_id',
            cell: (row) => (
                <IconButton
                    color='blue'
                    variant='outlined'
                    size='sm'
                    ripple={false}
                    onClick={() =>
                        handleViewSalesDetail(row.getValue('sales_id'))
                    }
                >
                    <MdManageSearch size={18} />
                </IconButton>
            ),
        },
    ];

    const canPrevPage = useMemo(() => {
        if (!newOrderQuery.data) return false;
        if (newOrderQuery.data?.lastPage === 1) return false;

        return page > 1;
    }, [page, newOrderQuery.data]);

    const canNextPage = useMemo(() => {
        if (!newOrderQuery.data) return false;
        if (newOrderQuery.data?.lastPage === 1) return false;

        return page < newOrderQuery.data?.lastPage;
    }, [page, newOrderQuery.data]);

    const handlePrevPage = () => {
        if (page <= 1) return;

        setPage((old) => old - 1);
    };

    const handleNextPage = () => {
        if (page >= newOrderQuery.data?.lastPage) return;

        setPage((old) => old + 1);
    };

    return (
        <>
            <section>
                <SectionTitle
                    title='Pemesanan Terbaru'
                    subtitle='Pemesanan terbaru yang masuk'
                    action={
                        <Button
                            color='light-blue'
                            onClick={() => navigate('/checkout')}
                        >
                            Buat Pemesanan
                        </Button>
                    }
                />

                {newOrderQuery.isError ? (
                    <div className='w-full py-16 bg-gray-100 rounded-md'>
                        <RetryFetch
                            refetchAction={newOrderQuery.refetch}
                            text='Terjadi kesalahan saat mengambil data pemesanan terbaru.'
                        />
                    </div>
                ) : (
                    <MainTable
                        columns={columns}
                        data={rows}
                        pagination
                        setPageSize={setLimit}
                        nextPageAction={handleNextPage}
                        prevPageAction={handlePrevPage}
                        canNextPage={canNextPage}
                        canPreviousPage={canPrevPage}
                        pageSize={limit}
                        isLoading={newOrderQuery.isPending}
                        currentPage={newOrderQuery.data?.page}
                    />
                )}
            </section>

            <SalesDetailModal
                open={open}
                toggle={toggle}
                salesId={selectedSalesId}
            />
        </>
    );
}
