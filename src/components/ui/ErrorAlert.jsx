import { Alert, Typography } from '@material-tailwind/react';

export default function ErrorAlert({ isError, error }) {
    return (
        <Alert color='red' className='mb-8' open={isError}>
            {error?.message ? (
                <Typography color='white' variant='small'>
                    {error.message}
                </Typography>
            ) : (
                <Typography color='white' variant='small'>
                    Something went wrong!
                </Typography>
            )}
        </Alert>
    );
}
