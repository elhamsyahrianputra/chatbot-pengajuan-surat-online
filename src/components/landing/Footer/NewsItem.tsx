import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewsItemProps {
  href: string;
  children: React.ReactNode;
}

export default function NewsItem({ href, children }: NewsItemProps) {
  return (
    <li className="news-item">
      <a href={href} className="news-link">
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
        <span>{children}</span>
      </a>
    </li>
  );
}
