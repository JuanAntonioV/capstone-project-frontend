import { Typography } from '@material-tailwind/react';

const TableNoData = (props) => {
    return (
        <td className='py-8' {...props}>
            <Typography
                color='gray'
                className='absolute -translate-x-1/2 left-1/2 top-6'
            >
                Data tidak ditemukan
            </Typography>
        </td>
    );
};

export default TableNoData;
