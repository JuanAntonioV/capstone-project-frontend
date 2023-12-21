import { getAllTransactionApi } from '@/apis/transactionApi';
import SalesDetailModal from '@/components/sales/SalesDetailModal';
import RetryFetch from '@/components/ui/RetryFetch';
import SalesStatusChip from '@/components/ui/SalesStatusChip';
import SectionTitle from '@/components/ui/SectionTitle';
import MainTable from '@/components/ui/tables/MainTable';
import useToggle from '@/hooks/useToggle';
import { formatRupiah } from '@/utils/helpers';
import { IconButton } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { MdManageSearch } from 'react-icons/md';

export default function TransactionHistory() {
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [open, toggle] = useToggle(false);
    const [selectedSalesId, setSelectedSalesId] = useState(null);

    const transactionHistoryQuery = useQuery({
        queryKey: ['transactionHistory', search, limit, page, fromDate, toDate],
        queryFn: () =>
            getAllTransactionApi({
                from: fromDate,
                to: toDate,
                limit,
                page,
                search,
            }),
        select: (data) => data.data,
    });

    const handleViewSalesDetail = (salesId) => {
        setSelectedSalesId(salesId);
        console.log(salesId);
        toggle(true);
    };

    const rows = useMemo(() => {
        if (!transactionHistoryQuery.data?.data) return [];

        return transactionHistoryQuery.data?.data.map((item) => ({
            sales_id: item.id,
            customer_name: item.user?.name,
            category: item.category?.name,
            total_payment: item.total_payment,
            status: item.status,
            delivery_date: item.delivery_date,
        }));
    }, [transactionHistoryQuery.data?.data]);

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
        if (!transactionHistoryQuery.data) return false;
        if (transactionHistoryQuery.data?.lastPage === 1) return false;

        return page > 1;
    }, [page, transactionHistoryQuery.data]);

    const canNextPage = useMemo(() => {
        if (!transactionHistoryQuery.data) return false;
        if (transactionHistoryQuery.data?.lastPage === 1) return false;

        return page < transactionHistoryQuery.data?.lastPage;
    }, [page, transactionHistoryQuery.data]);

    const handlePrevPage = () => {
        if (page <= 1) return;

        setPage((old) => old - 1);
    };

    const handleNextPage = () => {
        if (page >= transactionHistoryQuery.data?.lastPage) return;

        setPage((old) => old + 1);
    };

    const handleClearFilter = () => {
        setFromDate('');
        setToDate('');
    };

    if (transactionHistoryQuery.isError) {
        return (
            <RetryFetch
                refetchAction={transactionHistoryQuery.refetch}
                text='Ada yang salah saat mengambil data riwayat transaksi.'
            />
        );
    }

    return (
        <>
            <section>
                <SectionTitle
                    title='Riwayat Transaksi'
                    subtitle='Daftar riwayat transaksi yang telah dilakukan oleh pelanggan.'
                />

                <MainTable
                    columns={columns}
                    data={rows}
                    pagination
                    setSearch={setSearch}
                    search={search}
                    setPageSize={setLimit}
                    nextPageAction={handleNextPage}
                    prevPageAction={handlePrevPage}
                    canNextPage={canNextPage}
                    canPreviousPage={canPrevPage}
                    isLoading={transactionHistoryQuery.isPending}
                    pageSize={limit}
                    pageCount={transactionHistoryQuery.data?.lastPage}
                    filterDate
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    currentPage={transactionHistoryQuery.data?.page}
                    clearFilter={handleClearFilter}
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </section>

            <SalesDetailModal
                open={open}
                toggle={toggle}
                salesId={selectedSalesId}
            />
        </>
    );
}
