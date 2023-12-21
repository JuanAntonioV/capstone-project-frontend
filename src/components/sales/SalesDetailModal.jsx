import {
    cancelTransactionApi,
    confirmTransactionApi,
    finishTransactionApi,
    getTransactionDetailApi,
} from '@/apis/transactionApi';
import Modal from '../ui/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import RetryFetch from '../ui/RetryFetch';
import SalesStatusChip from '../ui/SalesStatusChip';
import CopyText from '../copy/CopyText';
import StatusChip from '../ui/StatusChip';
import moment from 'moment';
import { formatRupiah } from '@/utils/helpers';
import { SALES_STATUS } from '@/utils/globalEntities';
import toast from 'react-hot-toast';
import { useMemo } from 'react';

export default function SalesDetailModal({ open, toggle, salesId }) {
    const salesDetailQuery = useQuery({
        queryKey: ['salesDetail', salesId],
        queryFn: () => getTransactionDetailApi(salesId),
        select: (data) => data.data,
    });

    const queryClient = useQueryClient();

    const confirmSalesMutation = useMutation({
        mutationFn: confirmTransactionApi,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('transactionHistory');
            toast.success(data.message);
            toggle();
        },
    });

    const cancelSalesMutation = useMutation({
        mutationFn: cancelTransactionApi,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('transactionHistory');
            toast.success(data.message);
            toggle();
        },
    });

    const finishSalesMutation = useMutation({
        mutationFn: finishTransactionApi,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('transactionHistory');
            toast.success(data.message);
            toggle();
        },
    });

    const cancelSales = () => cancelSalesMutation.mutate(salesId);
    const confirmSales = () => confirmSalesMutation.mutate(salesId);
    const finishSales = () => finishSalesMutation.mutate(salesId);

    const customAction = () => {
        return (
            <Button onClick={cancelSales} variant='text' color='red'>
                Batalkan Transaksi
            </Button>
        );
    };

    const isMenungguPembayaran = useMemo(() => {
        return (
            salesDetailQuery.data?.status === SALES_STATUS.MENUNGGU_PEMBAYARAN
        );
    }, [salesDetailQuery.data?.status]);
    const isProses = useMemo(() => {
        return salesDetailQuery.data?.status === SALES_STATUS.PROSES;
    }, [salesDetailQuery.data?.status]);
    const isSelesai = useMemo(() => {
        return salesDetailQuery.data?.status === SALES_STATUS.SELESAI;
    }, [salesDetailQuery.data?.status]);
    const isBatal = useMemo(() => {
        return salesDetailQuery.data?.status === SALES_STATUS.DIBATALKAN;
    }, [salesDetailQuery.data?.status]);
    const isGagal = useMemo(() => {
        return salesDetailQuery.data?.status === SALES_STATUS.GAGAL;
    }, [salesDetailQuery.data?.status]);

    const handleBtnAction = () => {
        if (isMenungguPembayaran) {
            confirmSales();
        } else if (isProses) {
            finishSales();
        } else {
            toast.error('Transaksi tidak dapat diselesaikan');
        }
    };

    console.log(isMenungguPembayaran);

    return (
        <Modal
            open={open}
            toggle={toggle}
            size='sm'
            title='Sales Detail'
            loading={salesDetailQuery.isLoading}
            customAction={isMenungguPembayaran ? customAction() : null}
            btnCloseText='Tutup'
            btnAction={isSelesai || isBatal || isGagal ? null : true}
            btnActionText={isProses ? 'Selesaikan Transaksi' : 'Konfirmasi'}
            btnActionOnClick={handleBtnAction}
        >
            {salesDetailQuery.isLoading ? (
                <div className='gap-2 flexCenterCol'>
                    <Spinner color='blue' className='w-8 h-8' />
                    Memuat
                </div>
            ) : salesDetailQuery.isError ? (
                <RetryFetch
                    refetchAction={() => salesDetailQuery.refetch()}
                    text='Sales tidak dapat dimuat'
                />
            ) : (
                <div>
                    <header className='pb-4 border-b flexBetween'>
                        <div>
                            <Typography variant='small'>Sales ID</Typography>
                            <CopyText value={salesDetailQuery.data?.id} />
                        </div>
                        <div>
                            <SalesStatusChip
                                status={salesDetailQuery.data?.status}
                            />
                        </div>
                    </header>
                    <main className='py-2'>
                        <div className='pb-4 border-b'>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Nama Pelanggan
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.user?.name || '-'}
                                </Typography>
                            </div>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Alamat Email
                                </Typography>
                                <CopyText
                                    value={salesDetailQuery.data?.user?.email}
                                />
                            </div>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Status Akun
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    <StatusChip
                                        status={
                                            salesDetailQuery.data?.user?.status
                                        }
                                    />
                                </Typography>
                            </div>
                        </div>
                        <div className='py-4 border-b'>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Tanggal Pemesanan
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.transaction_date
                                        ? moment(
                                              salesDetailQuery.data
                                                  ?.transaction_date
                                          ).format('DD MMMM YYYY HH:mm:ss')
                                        : '-'}
                                </Typography>
                            </div>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Tanggal Ambil
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.pickup_date
                                        ? moment(
                                              salesDetailQuery.data?.pickup_date
                                          ).format('DD MMMM YYYY HH:mm:ss')
                                        : '-'}
                                </Typography>
                            </div>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Tanggal Antar
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.delivery_date
                                        ? moment(
                                              salesDetailQuery.data?.pickup_date
                                          ).format('DD MMMM YYYY HH:mm:ss')
                                        : '-'}
                                </Typography>
                            </div>
                        </div>
                        <div className='py-4 border-b'>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Total Pembayaran
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.total_payment
                                        ? formatRupiah(
                                              salesDetailQuery.data
                                                  ?.total_payment,
                                              true
                                          )
                                        : '-'}
                                </Typography>
                            </div>
                            <div className='py-2 flexBetween'>
                                <Typography variant='small'>
                                    Jumlah Item
                                </Typography>
                                <Typography
                                    variant='small'
                                    color='blue-gray'
                                    className='font-semibold capitalize'
                                >
                                    {salesDetailQuery.data?.total_item || '-'}
                                </Typography>
                            </div>
                        </div>
                        <div className='py-4'>
                            <table className='w-full text-left'>
                                <thead>
                                    <tr>
                                        <th className='p-2 text-sm'>
                                            Nama Item
                                        </th>
                                        <th className='p-2 text-sm'>Jumlah</th>
                                        <th className='p-2 text-sm'>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesDetailQuery.data?.sales_detail?.map(
                                        (item) => (
                                            <tr
                                                key={item.id}
                                                className='text-black odd:bg-gray-100 even:bg-white'
                                            >
                                                <td className='p-2 text-sm'>
                                                    {item.product?.name}
                                                </td>
                                                <td className='p-2 text-sm'>
                                                    {item.quantity} pcs
                                                </td>
                                                <td className='p-2 text-sm'>
                                                    {item.amount
                                                        ? formatRupiah(
                                                              item.amount,
                                                              true
                                                          )
                                                        : '-'}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            )}
        </Modal>
    );
}
