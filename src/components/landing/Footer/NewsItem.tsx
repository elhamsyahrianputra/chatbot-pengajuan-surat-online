import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface NewsItemProps {
  href: string;
  children: React.ReactNode;
}

export default function NewsItem({ href, children }: NewsItemProps) {
  return (
    <li className="news-item">
      <a href={href} className="news-link">
        <ChevronRightIcon style={{ height: '20px', width: '20px' }} />
        <span>{children}</span>
      </a>
    </li>
  );
}
