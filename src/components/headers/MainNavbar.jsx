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
import { Link } from 'react-router-dom';

export default function MainNavbar() {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <header className='fixed left-0 w-full px-4 top-6'>
            <Navbar className='w-full px-6 py-3 mx-auto border shadow-xl max-w-7xl'>
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
                    <Button
                        color='red'
                        variant='gradient'
                        className='hidden lg:flex'
                        size='sm'
                    >
                        Sign Out
                    </Button>
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
