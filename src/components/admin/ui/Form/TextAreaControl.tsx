interface TextAreaControlProps {
    name?: string;
    label?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    value?: string | null;
    type?: string;
    disabled?: boolean;
    accept?: string;
    error?: string;
    rows?: number;
}

export default function TextAreaControl({ name, label, rows = 4, placeholder, onChange, value, disabled = false, error }: TextAreaControlProps) {
    return (
        <div className="form-control">
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <textarea className="form-input" name={name} id={name} placeholder={placeholder} onChange={onChange} value={value} disabled={disabled} rows={rows} style={{ resize: "none" }} />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
