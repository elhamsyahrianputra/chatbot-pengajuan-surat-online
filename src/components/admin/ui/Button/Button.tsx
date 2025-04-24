interface ButtonProps {
    color: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "black" | "grey";
    children: React.ReactNode;
    className?: string;
}

export default function Button({ color, className, children }: ButtonProps) {
    return <button className={`button button-${color} ${className}`}>{children}</button>;
}
