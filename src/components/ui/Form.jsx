export default function Form({
    children,
    className = '',
    onSubmit,
    id,
    ...props
}) {
    return (
        <form
            className={`${className} space-y-4`}
            onSubmit={onSubmit}
            id={id}
            {...props}
        >
            {children}
        </form>
    );
}
