interface BadgeProps {
    color: "red" | "yellow" | "orange" | "green" | "blue" | "purple" | "black" | "grey";
    children: React.ReactNode;
}

export default function Badge({ color, children }: BadgeProps) {
    return <span className={`badge badge-${color}`}>{children}</span>;
}
