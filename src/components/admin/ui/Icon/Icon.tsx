interface IconProps {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function Icon({icon, className, style}: IconProps) {
    return (
        <img src={`/icon/${icon}.svg`} className={`icon ${className}`} alt={`icon ${icon}`} style={style} />
    );
}