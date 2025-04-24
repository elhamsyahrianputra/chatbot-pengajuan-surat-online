"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../../ui/Icon/Icon";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface SidebarItemProps {
    title: string;
    icon: string;
    href?: string;
    children?: React.ReactNode;
    initialExpanded?: boolean;
}

export default function SidebarItem({
    title,
    icon,
    href = "",
    children,
    initialExpanded = false,
}: SidebarItemProps) {
    let [isExpanded, setIsExpanded] = useState(initialExpanded);

    const pathname = usePathname();

    function handleDropdownExpanded() {
        setIsExpanded(!isExpanded);
    }

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
            {children && (
                <ul className={clsx("dropdown-nav", { expanded: isExpanded })}>
                    {children}
                </ul>
            )}
        </li>
    );
}
