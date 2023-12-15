import { getStatsApi } from '@/apis/analitycApi';
import RetryFetch from '@/components/ui/RetryFetch';
import StatItem from '@/components/ui/StatItem';
import StatItemSkeleton from '@/components/ui/StatItemSkeleton';
import { useQuery } from '@tanstack/react-query';

export default function StatsList() {
    const statsQuery = useQuery({
        queryKey: ['stats'],
        queryFn: getStatsApi,
        select: (data) => data.data,
    });

    if (statsQuery.isError) {
        return (
            <RetryFetch
                text='Stat tidak dapat dimuat'
                refetchAction={() => statsQuery.refetch()}
            />
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
