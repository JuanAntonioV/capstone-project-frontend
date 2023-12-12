import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

export default function NavMenuLists() {
    const menus = [
        {
            title: 'Home',
            to: '/',
        },
        {
            title: 'Riwayat Transaksi',
            to: '/riwayat-transaksi',
        },
        {
            title: 'Daftar Produk',
            to: '/daftar-produk',
        },
        {
            title: 'Daftar Category',
            to: '/daftar-category',
        },
    ];

    return (
        <ul className='flex flex-col gap-2 pb-3 list-none lg:flex-row lg:ml-auto'>
            {menus.map((menu, index) => (
                <li key={index} className='first:mt-6 lg:first:mt-0'>
                    <NavLink
                        to={menu.to}
                        className='flex items-center p-3 text-xs font-bold leading-snug uppercase text-blue-gray-700 hover:opacity-75'
                    >
                        {menu.title}
                    </NavLink>
                </li>
            ))}
            <li className='block mt-6 lg:hidden'>
                <Button color='red' variant='gradient' fullWidth>
                    Sign Out
                </Button>
            </li>
        </ul>
    );
}
