import { PaperClipIcon } from "@heroicons/react/24/outline";

interface AcademicItemProps {
    href: string;
    children: React.ReactNode;
}

export default function AcademicItem({ href, children }: AcademicItemProps) {
    return (
        <li className="academic-item">
            <a className="academic-link" href={href}>
                <PaperClipIcon className="link-icon" style={{ height: '20px', width: '20px' }} />
                <span className="link-text">{children}</span>
            </a>
        </li>
    );
}
