import Badge from "../Badge/Badge";

interface TabButtonProps {
    label: string;
    color: "red" | "yellow" | "orange" | "green" | "blue" | "purple" | "black" | "grey";
    value: number;
    active?: boolean;
}

export default function TabButton({label, active = false, color, value}: TabButtonProps) {
    return (
        <button className={`tab-button ${active ? 'active' : ''}`}>
            <span>{label}</span>
            <Badge color={color}>{value}</Badge>
        </button>
    );
}
