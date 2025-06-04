interface FormFloatingProps {
    name: string;
    label: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    fixed?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, id?: string) => void;
}

export default function FormFloating({ name, label, type = 'text', value, disabled = false, onChange, fixed = false }: FormFloatingProps) {
    return (
        <div className={`form-floating ${fixed ? "fixed" : ""}`}>
            <input type={type} id={name} name={name} className="form-input" placeholder=" " defaultValue={value} onChange={onChange} disabled={disabled} />
            <label htmlFor={name} className="form-label">
                {label}
            </label>
        </div>
    );
}
