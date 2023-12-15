import { formatRupiah } from '@/utils/helpers';
import { Card, Typography } from '@material-tailwind/react';

export default function StatItem({ item }) {
    return (
        <Card className={'p-4 space-y-1 bg-white min-h-28 rounded-2xl border'}>
            <header>
                <Typography
                    color='black'
                    variant='small'
                    className='font-medium'
                >
                    {item.label}
                </Typography>
            </header>

            <main>
                <Typography color='blue' variant='h4' className='font-bold'>
                    {formatRupiah(
                        item.value || '0',
                        item.type === 'money' ? 'Rp. ' : null
                    )}
                </Typography>
            </main>

            <footer>
                <Typography color='gray' variant='small'>
                    {item.description}
                </Typography>
            </footer>
        </Card>
    );
}
