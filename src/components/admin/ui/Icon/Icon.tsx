interface IconProps {
    icon: string;
    className?: string;
}

export default function Icon({icon, className}: IconProps) {
    return (
        <img src={`/icon/${icon}.svg`} className={className} alt={`icon ${icon}`} />
    );
}