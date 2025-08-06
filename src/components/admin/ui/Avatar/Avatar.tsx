import Image from "next/image";

interface AvatarProps {
    gender: "male" | "female";
    className?: string;
}

export default function Avatar({ gender, className }: AvatarProps) {
    return <Image src={`/img/avatar/${gender}.webp`} alt="Gender Avatar" className={className} height={30} width={30} />;
}
