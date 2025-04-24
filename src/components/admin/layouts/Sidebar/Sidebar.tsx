'use client';

import 'simplebar-react/dist/simplebar.min.css';

import SidebarHeader from '@/components/admin/layouts/Sidebar/SidebarHeader';
import SidebarMain from './SidebarMain';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <SidebarHeader /> 
            <SidebarMain />
        </aside>
    );
}