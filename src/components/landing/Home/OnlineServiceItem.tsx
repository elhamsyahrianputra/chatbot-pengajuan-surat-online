import Icon from "@/components/Icon/Icon";
import Link from "next/link";

interface OnlineServiceItemProps {
  icon: string;
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
      <Link href={href} className="online-service-link flex items-center justify-between gap-4 p-4 border rounded hover:bg-gray-50">
        <div className="online-service-icon flex-shrink-0">
          <Icon name={icon} />
        </div>
        <div className="online-service-content flex-grow">
          <h4 className="online-service-content-title font-semibold text-gray-800">
            {title}
          </h4>
          <p className="online-service-content-text text-sm text-gray-600">
            {text}
          </p>
        </div>
        <div className="online-service-go-to flex-shrink-0">
          <Icon name={icon} />
        </div>
      </Link>
    </li>
  );
}
