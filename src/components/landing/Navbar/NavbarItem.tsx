import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Perbaiki tipe
type NavbarItemWithChildren = {
  title: string;
  icon?: IconDefinition;
  children: React.ReactNode;
  href?: string;
};

type NavbarItemWithoutChildren = {
  title: string;
  icon?: IconDefinition;
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
          {icon && <FontAwesomeIcon icon={icon} size="lg" />}
          {title}
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </span>
        {children}
      </li>
    );
  }

  return (
    <li className="navbar-item">
      <Link href={href!} className="nav-link">
        {icon && <FontAwesomeIcon icon={icon} size="lg" />}
        {title}
      </Link>
    </li>
  );
}
