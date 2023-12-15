import { getAllTransactionApi } from '@/apis/transactionApi';
import SalesStatusChip from '@/components/ui/SalesStatusChip';
import SectionTitle from '@/components/ui/SectionTitle';
import MainTable from '@/components/ui/tables/MainTable';
import { formatRupiah } from '@/utils/helpers';
import { Button, IconButton } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { MdManageSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function NewOrderListSection() {
    const navigate = useNavigate();

    const fromDate = moment().startOf('day').format('YYYY-MM-DD');
    const toDate = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD');

    const newOrderQuery = useQuery({
        queryKey: ['newOrder'],
        queryFn: () =>
            getAllTransactionApi({
                from: fromDate,
                to: toDate,
            }),
        select: (data) => data.data,
    });

    console.log('newOrderQuery', newOrderQuery.data);

    const rows = useMemo(() => {
        if (!newOrderQuery.data) return [];

        return newOrderQuery.data.map((item) => ({
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
            accessorKey: 'action',
            cell: () => (
                <IconButton
                    color='blue'
                    variant='outlined'
                    size='sm'
                    ripple={false}
                    onClick={() => toast.error('Fitur ini belum tersedia')}
                >
                    <MdManageSearch size={18} />
                </IconButton>
            ),
        },
    ];

    return (
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

            <MainTable columns={columns} data={rows} pagination />
        </section>
    );
}
