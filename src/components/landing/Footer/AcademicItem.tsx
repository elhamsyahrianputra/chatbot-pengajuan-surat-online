import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AcademicItemProps {
  href: string;
  children: React.ReactNode;
}

export default function AcademicItem({ href, children }: AcademicItemProps) {
  return (
    <li className="academic-item">
      <a className="academic-link" href={href}>
        <FontAwesomeIcon icon={faPaperclip} className="link-icon" size="sm" />
        <span className="link-text">{children}</span>
      </a>
    </li>
  );
}
