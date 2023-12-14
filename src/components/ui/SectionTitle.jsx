import { Typography } from '@material-tailwind/react';

export default function SectionTitle({
    title = 'Judul',
    subtitle = 'Description',
    className = '',
    action,
}) {
    return (
        <header className={`flexBetween mt-10 mb-6 ${className}`}>
            <div>
                <Typography color='blue-gray' variant='h5'>
                    {title}
                </Typography>
                <Typography color='blue-gray' variant='small'>
                    {subtitle}
                </Typography>
            </div>
            {action}
        </header>
    );
}
