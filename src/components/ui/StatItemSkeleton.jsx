import { Card } from '@material-tailwind/react';
import Skeleton from './Skeleton';

export default function StatItemSkeleton() {
    return (
        <Card className={'p-4 space-y-2 bg-white  min-h-28 rounded-2xl border'}>
            <Skeleton className='w-32' />
            <Skeleton className='!h-8 w-40' />
            <Skeleton className='w-36 !h-3' />
        </Card>
    );
}
