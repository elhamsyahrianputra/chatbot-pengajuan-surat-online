import Image from "next/image";
import Link from "next/link";

interface CategoryitemProps {
    title: string;
    href: string;
}

export default function CategoryItem({ title, href }: CategoryitemProps) {
    return (
        <li className="category-item">
            <Image className="category-background" src="/img/background/category-background.webp" alt="Category background" />
            {href !== "#" ? (
                <Link className="category-content" href={href} rel="noopener noreferrer">
                    <div className="category-body">
                        <h4 className="category-title">{title}</h4>
                        <span className="category-click">CLICK HERE</span>
                    </div>
                </Link>
            ) : (
                <div className="category-content">
                    <div className="category-body">
                        <h4 className="category-title">{title}</h4>
                        <span className="category-click">CLICK HERE</span>
                    </div>
                </div>
            )}
        </li>
    );
}
