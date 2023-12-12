export default function FormGroup({ children, className, ...props }) {
    return (
        <div className={`${className} space-y-2`} {...props}>
            {children}
        </div>
    );
}
