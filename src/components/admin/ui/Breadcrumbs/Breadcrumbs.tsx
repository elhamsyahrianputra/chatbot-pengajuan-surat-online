import Link from "next/link";

interface BreadcrubmsProps {
    title: string;
    breadcrumbs: BreadcrumbProps[];
}

interface BreadcrumbProps {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ title, breadcrumbs }: BreadcrubmsProps) {
    return (
        <>
            <h1 className="breadcrumbs-title">{title}</h1>
            <nav className="breadcrumbs">
                <ul className="breadcrumbs-list">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} className="breadcrumbs-item">
                            {index !== breadcrumbs.length - 1 && breadcrumb.href ? (
                                <Link className="breadcrumbs-link" href={breadcrumb.href}>
                                    {breadcrumb.label}
                                </Link>
                            ) : (
                                <span className="breadcrumbs-link active">{breadcrumb.label}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
