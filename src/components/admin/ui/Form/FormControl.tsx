interface FormControlProps {
    name?: string;
    label?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number;
    type?: string; 
    disabled?: boolean;
    accept?: string;
    error?: string;
}

export default function FormControl({ name, label, placeholder, onChange, value, type = "text", disabled = false, accept = "*/*", error }: FormControlProps) {
    return (
        <div className="form-control">
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <input className="form-input" type={type} name={name} id={name} placeholder={placeholder} onChange={onChange} value={value} accept={accept} disabled={disabled} />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
