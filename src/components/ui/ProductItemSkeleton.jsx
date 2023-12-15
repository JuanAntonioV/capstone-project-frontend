import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@material-tailwind/react';
import Skeleton from './Skeleton';

export default function ProductItemSkeleton() {
    return (
        <Card className='overflow-hidden bg-white border rounded-lg shadow-md'>
            <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='relative m-0 rounded-none'
            >
                <Skeleton className='w-full h-48' />
            </CardHeader>
            <CardBody>
                <Skeleton className='w-1/2 h-6 mb-2' />
                <Skeleton className='w-1/4 h-4' />
            </CardBody>
            <CardFooter className='pt-0 flexCenter'>
                <Skeleton className='w-1/2 !h-10 mr-2' />
                <Skeleton className='w-1/2 !h-10' />
            </CardFooter>
        </Card>
    );
}
