interface FormFloatingProps {
    name: string;
    label: string;
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, id?: string) => void;


}

export default function FormFloating({name, label, value, disabled = false, onChange}: FormFloatingProps) {
    return (
        <div className="form-floating">
            <input type="text" id={name} name={name} className="form-input" placeholder=" " defaultValue={value} onChange={onChange} disabled={disabled}/>
            <label htmlFor={name} className="form-label">{label}</label>
        </div>
    )
}