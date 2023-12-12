import CenterLayout from '@/layouts/CenterLayout';
import { Typography } from '@material-tailwind/react';

export default function NotFoundPage() {
    return (
        <CenterLayout className='gap-4 bg-gray-200'>
            <Typography variant='h1' color='blue-gray' textGradient={true}>
                404
            </Typography>
            <Typography variant='h4' color='blue-gray' textGradient={true}>
                Page Not Found
            </Typography>
        </CenterLayout>
    );
}
