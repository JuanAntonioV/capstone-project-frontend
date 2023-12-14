export default function Skeleton({ className = '' }) {
    return (
        <div
            className={`w-full h-4 bg-gray-200 animate-pulse select-none rounded ${className}`}
        />
    );
}
