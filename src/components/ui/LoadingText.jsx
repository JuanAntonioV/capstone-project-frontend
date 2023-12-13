import { Spinner } from '@material-tailwind/react';

export default function LoadingText({ text, loading, children }) {
    if (loading) return children || <Spinner className='w-6 h-6 mx-auto' />;
    return text;
}
