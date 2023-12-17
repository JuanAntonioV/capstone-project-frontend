import { Spinner } from '@material-tailwind/react';

export default function ScreenLoading({
    className = '',
    spinnerClassName = '',
}) {
    return (
        <div className={`min-h-screen flexCenter ${className}`}>
            <Spinner color='blue' className={`w-8 h-8 ${spinnerClassName}`} />
        </div>
    );
}
