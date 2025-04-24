import Link from "next/link";

interface MenuItemProps {
  title: string,
  href: string
}

export default function MenuItem({ title, href }: MenuItemProps) {
  return (
    <li className="menu-item">
      <Link href={href} className="menu-link">
        {title}
      </Link>
    </li>
  );
}
