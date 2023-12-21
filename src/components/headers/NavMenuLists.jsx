import {
    Button,
    Collapse,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import {
    MdCategory,
    MdDashboardCustomize,
    MdKeyboardArrowUp,
    MdOutlineSecurity,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaUsersGear } from 'react-icons/fa6';

export default function NavMenuLists() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menus = [
        {
            title: 'Home',
            to: '/',
            subMenus: [],
        },
        {
            title: 'Riwayat Transaksi',
            to: '/riwayat-transaksi',
            subMenus: [],
        },
        {
            title: 'Settings',
            to: '/settings',
            subMenus: [
                {
                    title: 'Akun Saya',
                    description: 'Edit Profil dan Ubah Password',
                    icon: <FaUser size={20} />,
                    to: '/settings/akun-saya',
                },
                {
                    title: 'Admin',
                    description: 'Tambah dan Edit Admin',
                    icon: <FaUsersGear size={20} />,
                    to: '/settings/admin',
                },
                {
                    title: 'Daftar Produk',
                    description: 'Tambah dan Edit Produk',
                    icon: <MdDashboardCustomize size={20} />,
                    to: '/settings/daftar-produk',
                },
                {
                    title: 'Daftar Kategori',
                    description: 'Tambah dan Edit Kategori',
                    icon: <MdCategory size={20} />,
                    to: '/settings/daftar-kategori',
                },
                {
                    title: 'Roles',
                    description: 'Tambah dan Edit Roles',
                    icon: <MdOutlineSecurity size={20} />,
                    to: '/settings/roles',
                },
            ],
        },
    ];

    return (
        <ul className='flex flex-col gap-2 pb-3 list-none lg:pb-0 lg:flex-row lg:ml-auto'>
            {menus.map((menu, index) =>
                menu.subMenus.length > 0 ? (
                    <li key={index}>
                        <Menu
                            open={isMenuOpen}
                            handler={setIsMenuOpen}
                            offset={{ mainAxis: 20 }}
                            placement='bottom'
                            allowHover={true}
                        >
                            <MenuHandler>
                                <Typography
                                    as={'div'}
                                    variant='small'
                                    className='font-medium'
                                    color='blue-gray'
                                >
                                    <ListItem
                                        className='flex items-center gap-2 py-2 pr-4 font-medium '
                                        selected={
                                            isMenuOpen || isMobileMenuOpen
                                        }
                                        onClick={() =>
                                            setIsMobileMenuOpen((cur) => !cur)
                                        }
                                    >
                                        {menu.title}
                                        <MdKeyboardArrowUp
                                            className={`ml-auto ${
                                                isMenuOpen || isMobileMenuOpen
                                                    ? 'transform rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </ListItem>
                                </Typography>
                            </MenuHandler>
                            <MenuList className='hidden max-w-screen-xl rounded-xl lg:block'>
                                <ul className='grid grid-cols-2 outline-none gap-y-4 gap-x-6 outline-0'>
                                    {menu.subMenus.map((subMenu, index) => (
                                        <li key={index}>
                                            <NavLink
                                                to={subMenu.to}
                                                className='flex gap-4 px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-gray-900'
                                            >
                                                <div className='flexCenter !bg-blue-gray-50 w-10 h-10 rounded text-gray-900'>
                                                    {subMenu.icon}
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <span className='font-medium text-gray-900'>
                                                        {subMenu.title}
                                                    </span>
                                                    <span className='text-xs text-gray-500'>
                                                        {subMenu.description}
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </MenuList>
                        </Menu>
                        <div className='block lg:hidden'>
                            <Collapse open={isMobileMenuOpen}>
                                <ul className='flex flex-col mt-4 outline-none lg:mt-0 lg:grid lg:grid-cols-3 gap-y-4 lg:gap-y-2 outline-0'>
                                    {menu.subMenus.map((subMenu, index) => (
                                        <li key={index}>
                                            <NavLink
                                                to={subMenu.to}
                                                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-gray-900'
                                            >
                                                {subMenu.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </Collapse>
                        </div>
                    </li>
                ) : (
                    <li
                        key={index}
                        className='w-full text-left flexCenter lg:w-fit first:mt-6 first:lg:mt-0'
                    >
                        <NavLink
                            to={menu.to}
                            className='w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-blue-gray-900'
                        >
                            {menu.title}
                        </NavLink>
                    </li>
                )
            )}
            <li className='block mt-6 lg:hidden'>
                <Button color='red' variant='gradient' fullWidth>
                    Sign Out
                </Button>
            </li>
        </ul>
    );
}
