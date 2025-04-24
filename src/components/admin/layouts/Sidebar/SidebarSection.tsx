'use client';

import { useState } from "react";

interface SidebarSectionProps {
    title?: string,
    children: React.ReactNode,
    initialCollapsed?: boolean,
}

export default function SidebarSection({title, children, initialCollapsed = false}: SidebarSectionProps) {

    let [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

    function handleSidebarListCollapsed() {
        setIsCollapsed((prev) => !prev);
    }

    return (
        <li className="sidebar-section">
            <div className={`sidebar-subheader ${isCollapsed ? 'list-collapsed' : ''}`} onClick={handleSidebarListCollapsed}>{title}</div>
            <ul className={`sidebar-list ${isCollapsed ? 'collapsed' : ''}`}>
                {children}
            </ul>
        </li>
    );
}