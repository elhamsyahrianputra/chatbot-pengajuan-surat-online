import Image from "next/image";

interface IconProps {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function Icon({icon, className, style}: IconProps) {
    return (
        <Image src={`/icon/${icon}.svg`} className={`icon ${className}`} alt={`icon ${icon}`} style={style} height={1} width={1} />
    );
}