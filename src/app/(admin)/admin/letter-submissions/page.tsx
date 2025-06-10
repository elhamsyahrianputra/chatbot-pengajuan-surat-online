"use client";
import { useEffect, useState } from "react";
import { letterSubmissionService } from "@/api/services/letter-submission.services";
import StatusBadge from "@/components/admin/pages/LetterSubmission/StatusBadge";
import Badge from "@/components/admin/ui/Badge/Badge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Table from "@/components/admin/ui/Table/Table";
import UserProfile from "@/components/admin/ui/Table/UserProfile";
import { LetterSubmission } from "@/api/types/letter-submission.types";
import ActionList from "@/components/admin/ui/Table/ActionList";
import ActionItem from "@/components/admin/ui/Table/ActionItem";
import { UserResponse } from "@/api/types/auth.types";
import { authService } from "@/api/services/auth.services";

// Update TabButton agar menerima onClick handler
interface TabButtonProps {
    label: string;
    color: "red" | "yellow" | "orange" | "green" | "blue" | "purple" | "black" | "grey";
    value: number;
    active?: boolean;
    onClick?: () => void;
}

function TabButton({ label, active = false, color, value, onClick }: TabButtonProps) {
    return (
        <button className={`tab-button ${active ? "active" : ""}`} onClick={onClick}>
            <span>{label}</span>
            <Badge color={color}>{value}</Badge>
        </button>
    );
}

// Definisikan jenis filter
type TabFilter = "all" | "submitted" | "approved" | "revision" | "rejected" | "completed" | "canceled";

export default function Page() {
    const [letterSubmissions, setLetterSubmissions] = useState<LetterSubmission[]>([]);
    const [activeTab, setActiveTab] = useState<TabFilter>("all");
    const [user, setUser] = useState<UserResponse>({
        id: "",
        role: "",
        email: "",
        name: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            const fetchData = async () => {
                const data = await authService.getUser();
                setUser(data);
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            const data = await letterSubmissionService.getAll({
                include: "user,letterType",
            });

            const userSubmission = data.filter((item) => item.user_id === user.id);

            if (user.role === 'admin') {
                setLetterSubmissions(data);
            } else {
                setLetterSubmissions(userSubmission);
            }
        };

        fetchData();
    }, [user]); // tambahkan user ke dependency array

    // Function untuk menangani klik tab
    const handleTabClick = (tab: TabFilter) => {
        setActiveTab(tab);
    };

    // Filter data berdasarkan tab yang aktif
    const filteredSubmissions = letterSubmissions.filter((item) => {
        if (activeTab === "all") return true;
        return item.status === activeTab;
    });

    return (
        <>
            <Breadcrumbs
                title="Jenis Surat"
                breadcrumbs={[
                    {
                        label: "Dashboard",
                        href: "/admin",
                    },
                    {
                        label: "Pengajuan Surat",
                        href: "/admin/letter-types",
                    },
                ]}
            />

            <main>
                <Table
                    tabButtons={
                        <>
                            <TabButton color="black" label="All" value={letterSubmissions.length} active={activeTab === "all"} onClick={() => handleTabClick("all")} />
                            <TabButton
                                color="blue"
                                label="Submitted"
                                value={letterSubmissions.filter((item) => item.status === "submitted").length}
                                active={activeTab === "submitted"}
                                onClick={() => handleTabClick("submitted")}
                            />
                            <TabButton
                                color="green"
                                label="Approved"
                                value={letterSubmissions.filter((item) => item.status === "approved").length}
                                active={activeTab === "approved"}
                                onClick={() => handleTabClick("approved")}
                            />
                            <TabButton
                                color="orange"
                                label="Revision"
                                value={letterSubmissions.filter((item) => item.status === "revision").length}
                                active={activeTab === "revision"}
                                onClick={() => handleTabClick("revision")}
                            />
                            <TabButton
                                color="red"
                                label="Rejected"
                                value={letterSubmissions.filter((item) => item.status === "rejected").length}
                                active={activeTab === "rejected"}
                                onClick={() => handleTabClick("rejected")}
                            />
                            <TabButton
                                color="purple"
                                label="Completed"
                                value={letterSubmissions.filter((item) => item.status === "completed").length}
                                active={activeTab === "completed"}
                                onClick={() => handleTabClick("completed")}
                            />
                            <TabButton
                                color="grey"
                                label="Canceled"
                                value={letterSubmissions.filter((item) => item.status === "canceled").length}
                                active={activeTab === "canceled"}
                                onClick={() => handleTabClick("canceled")}
                            />
                        </>
                    }
                    tableHeaders={
                        <>
                            <td>#</td>
                            <td>Data Pengaju</td>
                            <td>Kode Pengajuan</td>
                            <td>Jenis Surat</td>
                            <td>Status</td>
                            <td>Tanggal Pengajuan</td>
                            <td></td>
                        </>
                    }
                >
                    {filteredSubmissions.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.user && <UserProfile email={item.user.email} gender={item.user.gender} name={item.user.name} />}</td>
                            <td><b>{item.code}</b></td>
                            <td>{item.letter_type && item.letter_type.name}</td>
                            <td>
                                <StatusBadge status={item.status} />
                            </td>
                            <td>
                                {new Date(item.created_at!!)
                                    .toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")}
                            </td>
                            <td>
                                <ActionList href={`/admin/letter-submissions/${item.id}`}>
                                    <ActionItem icon="trash" onSubmit={() => {}}>
                                        Delete
                                    </ActionItem>
                                </ActionList>
                            </td>
                        </tr>
                    ))}
                </Table>
            </main>
        </>
    );
}
