import {
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Step,
    Stepper,
    Typography,
} from '@material-tailwind/react';

import { useStore } from '@/stores/useStore';
import { useEffect, useState } from 'react';
import { MdOutlineCategory, MdShoppingCartCheckout } from 'react-icons/md';
import { IoBagCheckOutline, IoWarningOutline } from 'react-icons/io5';
import { formatPrice } from '@/utils/formaters';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import CategoryItem from '@/components/checkouts/CategoryItem';
import ProductItem from '@/components/checkouts/ProductItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProductsApi } from '@/apis/productApi';
import { getAllCategoriesApi } from '@/apis/categoryApi';
import RetryFetch from '@/components/ui/RetryFetch';
import { useAuthUser } from 'react-auth-kit';
import moment from 'moment';
import { createTransactionApi } from '@/apis/transactionApi';
import LoadingText from '@/components/ui/LoadingText';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

export default function OrderPage() {
    const {
        selectedCategory,
        setSelectedCategory,
        checkoutProducts,
        total,
        clearCheckout,
    } = useStore();
    const navigate = useNavigate();
    const auth = useAuthUser();

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState('');

    const [deliveryDate, setDeliveryDate] = useState(null);

    // useEffect(() => {
    //     if (selectedCategory) {
    //         setActiveStep(1);
    //     } else {
    //         setActiveStep(0);
    //     }
    // }, [selectedCategory]);

    // useEffect(() => {
    //     if (selectedCategory && checkoutProducts.length === 0) {
    //         setActiveStep(1);
    //     } else if (!selectedCategory) {
    //         setActiveStep(0);
    //     }
    // }, [checkoutProducts, selectedCategory, activeStep]);

    const steps = [
        {
            id: 1,
            icon: <MdOutlineCategory className='w-5 h-5' />,
            title: 'Step 1',
            description: 'Pilih kategori layanan',
        },
        {
            id: 2,
            icon: <MdShoppingCartCheckout className='w-5 h-5' />,
            title: 'Step 2',
            description: 'Pilih produk yang tersedia',
        },
        {
            id: 3,
            icon: <IoBagCheckOutline className='w-5 h-5' />,
            title: 'Step 3',
            description: 'Konfirmasi pesanan',
        },
    ];

    const [openDialog, setOpenDialog] = useState(null);

    const handleOpenDialog = (val) => setOpenDialog(val);

    const queryClient = useQueryClient();

    const checkoutMutation = useMutation({
        mutationFn: createTransactionApi,
        onSuccess: (data) => {
            if (data?.status) {
                queryClient.invalidateQueries('transactionHistory');
                queryClient.refetchQueries('newOrder');
                clearCheckout();
                setActiveStep(0);
                toast.success('Pesanan berhasil diproses');
                navigate('/');
            } else {
                toast.error(data?.message || 'Terjadi kesalahan');
            }
        },
        onError: (error) => {
            toast.error(error?.message);
        },
    });

    const handleProsesAction = (val) => {
        if (val === 'process') {
            const deliveryDateFormat = `${deliveryDate?.year}-${deliveryDate?.month}-${deliveryDate?.day}`;

            const data = {
                category_id: selectedCategory.id,
                products: checkoutProducts.map((item) => ({
                    product_id: item.id,
                    qty: item.quantity,
                })),
                user_id: auth()?.id,
                pickup_date: moment().format('YYYY-MM-DD'),
                delivery_date: deliveryDateFormat,
            };

            checkoutMutation.mutate(data);
        } else {
            clearCheckout();
            setActiveStep(0);
            handleOpenDialog(null);
            toast.error('Pesanan dibatalkan');
        }
    };

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => getAllCategoriesApi({ status: 1 }),
        select: (data) => data.data,
    });

    const productQuery = useQuery({
        queryKey: ['activeProducts', search],
        queryFn: () => getAllProductsApi({ status: 1, search }),
        select: (data) => data.data,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setSearch(searchValue);
        }, 1000);

        return () => clearInterval(interval);
    }, [searchValue]);

    const handleNextStepClicked = (index) => {
        if (index === 0) {
            setSelectedCategory(null);
            setActiveStep(0);
        } else if (index === 1) {
            if (selectedCategory) {
                setActiveStep(1);
            }
        } else if (index === 2) {
            if (checkoutProducts.length > 0) {
                setActiveStep(2);
            }
        }
    };

    return (
        <>
            <Dialog
                open={
                    openDialog === 'process' || openDialog === 'cancel'
                        ? true
                        : false
                }
                size={'xs'}
                handler={handleOpenDialog}
            >
                <DialogHeader className='border-b '>
                    <Typography variant='h5' color='blue-gray'>
                        {openDialog === 'process'
                            ? 'Proses Pesanan'
                            : 'Batalkan Pesanan'}
                    </Typography>
                </DialogHeader>
                <DialogBody className='py-12 border-b'>
                    <main className='gap-4 flexCenterCol'>
                        <IoWarningOutline
                            size={82}
                            className={`${
                                openDialog === 'process'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}
                        />

                        <div className='w-full max-w-sm mx-auto text-center'>
                            {openDialog === 'process' ? (
                                <Typography className='text-lg !font-medium text-gray-800'>
                                    Apakah anda yakin ingin memproses pesanan
                                    ini?
                                </Typography>
                            ) : (
                                <Typography className='text-lg !font-medium text-gray-800'>
                                    Apakah anda yakin ingin membatalkan pesanan
                                    ini?
                                </Typography>
                            )}
                        </div>
                    </main>
                </DialogBody>
                <DialogFooter className='gap-4'>
                    <Button
                        variant='outlined'
                        color='blue-gray'
                        onClick={() => handleOpenDialog(null)}
                        className='mr-1'
                    >
                        <span>Kembali</span>
                    </Button>
                    <Button
                        color={openDialog === 'process' ? 'green' : 'red'}
                        onClick={() => handleProsesAction(openDialog)}
                    >
                        {openDialog === 'process' ? 'Proses' : 'Batalkan'}
                    </Button>
                </DialogFooter>
            </Dialog>

            <div className='w-full px-6 py-4 mt-8 md:mt-12 md:px-14'>
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                    lineClassName='bg-gray-200'
                >
                    {steps.map((step, i) => (
                        <Step
                            onClick={() => handleNextStepClicked(i)}
                            className='cursor-pointer'
                            key={step.id}
                        >
                            {step.icon}
                            <div className='absolute -bottom-[5rem] md:-bottom-[4rem] w-max text-center'>
                                <Typography
                                    variant='h6'
                                    color={
                                        activeStep === i ? 'blue-gray' : 'gray'
                                    }
                                >
                                    {step.title}
                                </Typography>
                                <Typography
                                    color={
                                        activeStep === i ? 'blue-gray' : 'gray'
                                    }
                                    className='font-normal max-w-[8rem] md:max-w-full'
                                    variant='small'
                                >
                                    {step.description}
                                </Typography>
                            </div>
                        </Step>
                    ))}
                </Stepper>
            </div>

            {activeStep === 0 && (
                <main className='grid grid-cols-1 gap-8 mt-28 lg:grid-cols-2'>
                    {categoriesQuery.data?.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            nextStep={handleNext}
                        />
                    ))}
                </main>
            )}

            {activeStep === 1 && selectedCategory && (
                <>
                    <header className='mt-24 flexBetween'>
                        <Chip
                            color='light-blue'
                            size='sm'
                            className='w-fit'
                            variant='outlined'
                            value={selectedCategory.name}
                            onClose={() => {
                                setSelectedCategory(null);
                                setActiveStep(0);
                            }}
                        />

                        <div className='max-w-md'>
                            <Input
                                label='Cari produk'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </header>
                    <main className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3'>
                        {productQuery.isPending ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <Typography
                                    variant='h5'
                                    className='text-gray-500'
                                >
                                    Memuat produk...
                                </Typography>
                            </div>
                        ) : productQuery.isError ? (
                            <div className='bg-gray-100 flexCenter col-span-full p-28'>
                                <RetryFetch
                                    refetchAction={productQuery.refetch}
                                    text='Produk tidak dapat dimuat'
                                />
                            </div>
                        ) : productQuery.data?.length === 0 ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <Typography
                                    variant='h5'
                                    className='text-gray-500'
                                >
                                    Produk tidak ditemukan
                                </Typography>
                            </div>
                        ) : (
                            productQuery.data?.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        )}
                    </main>
                </>
            )}

            {activeStep === 2 && (
                <main className='w-full max-w-3xl p-8 mx-auto mt-24 border shadow-lg rounded-xl'>
                    <header className='flex items-center justify-between pb-4 border-b'>
                        <Typography variant='h5' color='blue-gray'>
                            Ringkasan Pesanan
                        </Typography>
                        {selectedCategory && (
                            <Chip
                                color='light-blue'
                                size='sm'
                                value={selectedCategory.name}
                            />
                        )}
                    </header>

                    <section className='pb-4 mt-4 border-b'>
                        <header className='flex items-center justify-between'>
                            <Typography variant='h6' color='blue-gray'>
                                Pesanan
                            </Typography>
                            <Typography variant='h6' color='blue-gray'>
                                Harga
                            </Typography>
                        </header>

                        <main className='mt-4 space-y-1'>
                            {checkoutProducts?.length > 0 ? (
                                checkoutProducts?.map((item, i) => (
                                    <div
                                        className='flex items-center justify-between'
                                        key={i}
                                    >
                                        <Typography
                                            variant='paragraph'
                                            color='blue-gray'
                                            className='font-medium'
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant='paragraph'
                                            color='blue-gray'
                                            className='font-medium'
                                        >
                                            {/* {selectedCategory?.id === 1 ? ( */}
                                            <>
                                                {item.quantity} x Rp{' '}
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                            </>
                                            {/* ) : (
                                                <>
                                                    {item.quantity} x Rp{' '}
                                                    {formatPrice(
                                                        selectedCategory.price *
                                                            item.quantity
                                                    )}
                                                </>
                                            )} */}
                                        </Typography>
                                    </div>
                                ))
                            ) : (
                                <Typography
                                    variant='paragraph'
                                    color='blue-gray'
                                    className='font-medium'
                                >
                                    Tidak ada produk yang dipilih
                                </Typography>
                            )}
                        </main>
                    </section>

                    <section className='mt-4'>
                        <header className='flex items-center justify-between'>
                            <Typography variant='h6' color='blue-gray'>
                                Total Harga
                            </Typography>
                            <Typography variant='h6' color='blue-gray'>
                                Rp {formatPrice(total)}
                            </Typography>
                        </header>
                    </section>

                    <footer className='gap-4 mt-8 flexBetween'>
                        <div className='space-y-2'>
                            <div className='flex items-center'>
                                <DatePicker
                                    value={deliveryDate}
                                    onChange={setDeliveryDate}
                                    inputPlaceholder='Pilih tanggal antar'
                                    shouldHighlightWeekends
                                />
                            </div>
                        </div>

                        <div className='flex items-center space-x-4'>
                            <Button
                                color='red'
                                variant='outlined'
                                onClick={() => handleOpenDialog('cancel')}
                            >
                                Cancel
                            </Button>
                            <Button
                                color='green'
                                variant='filled'
                                onClick={() => handleProsesAction('process')}
                                disabled={
                                    !deliveryDate || checkoutMutation.isPending
                                }
                            >
                                <LoadingText
                                    loading={checkoutMutation.isPending}
                                    text={'Proses Pesanan'}
                                />
                            </Button>
                        </div>
                    </footer>
                </main>
            )}

            {!isLastStep && (
                <footer className='flex items-center justify-end py-4 my-8'>
                    <div className='flex items-center space-x-4'>
                        {!isFirstStep && (
                            <Button
                                color='blue-gray'
                                variant='outlined'
                                size='sm'
                                ripple={false}
                                onClick={handlePrev}
                            >
                                Kembali
                            </Button>
                        )}
                        <Button
                            color='blue'
                            variant='filled'
                            size='sm'
                            ripple={false}
                            disabled={
                                !selectedCategory ||
                                checkoutProducts.length === 0
                            }
                            onClick={handleNext}
                        >
                            Selanjutnya
                        </Button>
                    </div>
                </footer>
            )}
        </>
    );
}
