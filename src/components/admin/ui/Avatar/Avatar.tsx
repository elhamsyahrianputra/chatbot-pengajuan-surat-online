interface AvatarProps {
    gender: "male" | "female";
    className?: string;
}

export default function Avatar({ gender, className }: AvatarProps) {
    return <img src={`/img/avatar/${gender}.webp`} alt="Gender Avatar" className={className} />;
}
