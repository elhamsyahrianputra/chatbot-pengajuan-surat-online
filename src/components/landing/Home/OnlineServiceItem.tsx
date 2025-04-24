import {
  faArrowRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface OnlineServiceItemProps {
  icon: IconDefinition;
  href: string;
  title: string;
  text: string;
}

export default function OnlineServiceItem({
  icon,
  href,
  title,
  text,
}: OnlineServiceItemProps) {
  return (
    <li className="online-service-item">
      <Link href="/pengajuan-surat-online" className="online-service-link">
        <div className="online-service-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="online-service-content">
          <h4 className="online-service-content-title">{title}</h4>
          <p className="online-service-content-text">{text}</p>
        </div>
        <div className="online-service-go-to">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    </li>
  );
}
