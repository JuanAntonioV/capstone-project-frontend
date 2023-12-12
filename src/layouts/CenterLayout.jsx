export default function CenterLayout({ children, className = '' }) {
    return (
        <main
            className={`h-screen mx-auto flexCenter bg-gray-50 px-6 ${className}`}
        >
            {children}
        </main>
    );
}
