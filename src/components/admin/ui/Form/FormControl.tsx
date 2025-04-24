interface FormControlProps {
    name: string;
    label: string;
    placeholder: string;
}

export default function FormControl({ name, label, placeholder }: FormControlProps) {
    return (
        <div className="form-control">
            <label className="form-label" htmlFor={name}>{label}</label>
            <input className="form-input" type="text" name={name} id={name} placeholder={placeholder} />
        </div>
    );
}
