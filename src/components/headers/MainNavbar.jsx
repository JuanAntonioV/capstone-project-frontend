import {
    Button,
    Collapse,
    IconButton,
    Navbar,
    Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import NavMenuLists from './NavMenuLists';
import { MdClose, MdMenu } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logoutApi } from '@/apis/authApi';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import toast from 'react-hot-toast';
import LoadingText from '../ui/LoadingText';

export default function MainNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();
    const auth = useAuthUser();

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const signOut = useSignOut();

    const logoutQuery = useMutation({
        mutationFn: logoutApi,
        onSuccess: (res) => {
            if (res.status) {
                signOut();
                navigate('/login');
            }
        },
        onError: (error) => {
            if (error.message === 'Unauthorized') {
                signOut();
                navigate('/login');
            }
            toast.error(error.message);
        },
    });

    return (
        <header className='fixed left-0 z-50 w-full px-4 top-6'>
            <Navbar className='w-full px-6 py-3 mx-auto border border-gray-100 shadow-xl max-w-7xl'>
                <div className='flex items-center justify-between text-blue-gray-900'>
                    <Link to='/'>
                        <Typography
                            variant='h6'
                            className='mr-4 cursor-pointer py-1.5'
                        >
                            My Laundry
                        </Typography>
                    </Link>
                    <div className='hidden lg:block'>
                        <NavMenuLists />
                    </div>
                    {auth()?.id && (
                        <Button
                            color='red'
                            variant='gradient'
                            className='hidden lg:flex'
                            size='sm'
                            onClick={() => logoutQuery.mutate()}
                            disabled={logoutQuery.isPending}
                        >
                            <LoadingText
                                text='Sign Out'
                                loading={logoutQuery.isPending}
                            />
                        </Button>
                    )}
                    <IconButton
                        variant='text'
                        className='w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? <MdClose size={24} /> : <MdMenu size={24} />}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavMenuLists />
                </Collapse>
            </Navbar>
        </header>
    );
}
