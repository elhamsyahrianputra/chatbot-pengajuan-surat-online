"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Icon from "@/components/admin/ui/Icon/Icon";

interface SidebarItemProps {
    title: string;
    icon: string;
    href?: string;
    children?: React.ReactNode;
}

export default function SidebarItem({
    title,
    icon,
    href = "",
}: SidebarItemProps) {

    const pathname = usePathname();

    return (
        <li className="sidebar-item">
            <Link
                href={href}
                className={clsx("nav-link", {
                    active:
                        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href),
                })}
            >
                <Icon icon={icon} className="nav-icon" />
                {title}
            </Link>
        </li>
    );
}
