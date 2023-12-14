import { Spinner } from '@material-tailwind/react';

const TableLoading = ({ ...props }) => {
    return (
        <td className='py-8' {...props}>
            <div className='absolute -translate-x-1/2 left-1/2 top-6'>
                <Spinner className='w-8 h-8 ' color='blue' />
            </div>
        </td>
    );
};

export default TableLoading;
