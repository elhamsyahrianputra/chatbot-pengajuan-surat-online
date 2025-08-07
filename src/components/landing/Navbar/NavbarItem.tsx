
import Icon from "@/components/Icon/Icon";
import Link from "next/link";

// Perbaiki tipe
type NavbarItemWithChildren = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  href?: string;
};

type NavbarItemWithoutChildren = {
  title: string;
  icon?: string;
  children?: undefined;
  href: string; //
};

type NavbarItemProps = NavbarItemWithChildren | NavbarItemWithoutChildren;

export default function NavbarItem({
  title,
  icon,
  href,
  children,
}: NavbarItemProps) {

  if (children) {
    return (
      <li className="navbar-item">
        <span className="nav-link">
          {icon && <Icon name={icon} />}
          {title}
        </span>
        {children}
      </li>
    );
  }

  return (
    <li className="navbar-item">
      <Link href={href!} className="nav-link">
        {icon && <Icon name={icon} />}
        {title}
      </Link>
    </li>
  );
}
