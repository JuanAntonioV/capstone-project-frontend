import StatItem from '@/components/ui/StatItem';

export default function StatsList() {
    const stats = [
        {
            label: 'Total Pemasukan',
            value: 1000000,
            type: 'money',
            date: new Date().toLocaleDateString(),
        },
        {
            label: 'Total Pemesanan',
            value: 5000,
            type: 'number',
            date: new Date().toLocaleDateString(),
        },
        {
            label: 'Total Produk',
            value: 20,
            type: 'number',
            date: new Date().toLocaleDateString(),
        },
        {
            label: 'Total Pengguna',
            value: 500,
            type: 'number',
            date: new Date().toLocaleDateString(),
        },
    ];

    return (
        <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {stats.map((item, index) => (
                <StatItem key={index} item={item} />
            ))}
        </section>
    );
}
