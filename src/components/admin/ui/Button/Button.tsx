interface ButtonProps {
    color: "red" | "orange" | "yellow" | "green" | "blue" | "blue-light" |"purple" | "black" | "grey";
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    
}

export default function Button({ color, className, children, onClick, disabled = false }: ButtonProps) {
    return <button className={`button button-${color} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}
