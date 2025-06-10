"use client";

import SidebarSection from "./SidebarSection";
import SimpleBar from "simplebar-react";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { authService } from "@/api/services/auth.services";
import { UserResponse } from "@/api/types/auth.types";

export default function SidebarMain() {
    const [user, setUser] = useState<UserResponse>({} as UserResponse);

    useEffect(() => {
        const fetchData = async () => {
            const data = await authService.getUser();
            setUser(data);
        };
        fetchData();
    });

    return (
        <nav>
            <SimpleBar className="sidebar-main">
                <ul className="sidebar-nav">
                    {user.role === "admin" ? (
                        <>
                            <SidebarSection>
                                <SidebarItem title="Dashboard" icon="dashboard" href="/admin" />
                            </SidebarSection>
                            <SidebarSection title="Surat">
                                <SidebarItem title="Jenis Surat" icon="mail" href="/admin/letter-types" />
                            </SidebarSection>
                            <SidebarSection title="Pengajuan">
                                <SidebarItem title="Pengajuan Surat" icon="file" href="/admin/letter-submissions" />
                            </SidebarSection>
                            <SidebarSection title="Chatbot">
                                <SidebarItem title="Manajemen Kasus (Case)" icon="chat" href="/admin/cases" />
                            </SidebarSection>
                            <SidebarSection title="User Management">
                                <SidebarItem title="User" icon="user" href="/admin/users" />
                            </SidebarSection>
                        </>
                    ) : (
                        <>
                            <SidebarSection>
                                <SidebarItem title="Dashboard" icon="dashboard" href="/admin" />
                            </SidebarSection>
                            <SidebarSection title="Pengajuan">
                                <SidebarItem title="Pengajuan Surat" icon="file" href="/admin/letter-submissions" />
                            </SidebarSection>
                        </>
                    )}
                </ul>
            </SimpleBar>
        </nav>
    );
}
