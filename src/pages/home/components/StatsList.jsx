import { getStatsApi } from '@/apis/analitycApi';
import StatItem from '@/components/ui/StatItem';
import StatItemSkeleton from '@/components/ui/StatItemSkeleton';
import { Button, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { TfiReload } from 'react-icons/tfi';

export default function StatsList() {
    const statsQuery = useQuery({
        queryKey: ['stats'],
        queryFn: getStatsApi,
        select: (data) => data.data,
    });

    if (statsQuery.isError) {
        return (
            <div className='flex-col gap-3 flexCenter'>
                <Typography color='blue-gray' variant='paragraph'>
                    Stat tidak dapat dimuat
                </Typography>
                <Button
                    onClick={() => statsQuery.refetch()}
                    variant='outlined'
                    color='blue-gray'
                    size='sm'
                    className='flex gap-2'
                >
                    Retry <TfiReload />
                </Button>
            </div>
        );
    }

    return (
        <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {statsQuery.isPending
                ? [...Array(4)].map((_, i) => <StatItemSkeleton key={i} />)
                : statsQuery.data?.map((stat, i) => (
                      <StatItem key={i} item={stat} />
                  ))}
        </section>
    );
}
