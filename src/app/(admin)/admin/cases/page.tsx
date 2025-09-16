"use client";
import { useEffect, useState } from "react";
import Badge from "@/components/admin/ui/Badge/Badge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Table from "@/components/admin/ui/Table/Table";
import ActionList from "@/components/admin/ui/Table/ActionList";
import ActionItem from "@/components/admin/ui/Table/ActionItem";
import { UserResponse } from "@/api/types/auth.types";
import { authService } from "@/api/services/auth.services";
import { Case } from "@/api/types/case.types";
import { caseService } from "@/api/services/case.services";

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
type TabFilter = "all" | "verified" | "unverified" | "deprecated";

export default function Page() {
    const [cases, setCases] = useState<Case[]>([]);
    const [activeTab, setActiveTab] = useState<TabFilter>("all");
    const [user, setUser] = useState<UserResponse>({} as UserResponse);

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
            const data = await caseService.getAll({
                include: "feedback",
            });
            setCases(data);
        };

        fetchData();
    }, [user]); // tambahkan user ke dependency array

    // Function untuk menangani klik tab
    const handleTabClick = (tab: TabFilter) => {
        setActiveTab(tab);
    };

    // Filter data berdasarkan tab yang aktif
    const filteredCase = cases.filter((item) => {
        if (activeTab === "all") return true;
        return item.status === activeTab;
    });

    return (
        <>
            <Breadcrumbs
                title="Manajemen Kasus"
                breadcrumbs={[
                    {
                        label: "Dashboard",
                        href: "/admin",
                    },
                    {
                        label: "Manajemen Kasus",
                        href: "/admin/letter-types",
                    },
                ]}
            />

            <main>
                <Table
                    tabButtons={
                        <>
                            <TabButton key="all" color="black" label="All" value={cases.length} active={activeTab === "all"} onClick={() => handleTabClick("all")} />
                            <TabButton
                                key="verified"
                                color="green"
                                label="Verified"
                                value={cases.filter((item) => item.status === "verified").length}
                                active={activeTab === "verified"}
                                onClick={() => handleTabClick("verified")}
                            />
                            <TabButton
                                key="unverified"
                                color="red"
                                label="Unverified"
                                value={cases.filter((item) => item.status === "unverified").length}
                                active={activeTab === "unverified"}
                                onClick={() => handleTabClick("unverified")}
                            />
                            <TabButton
                                key="deprecated"
                                color="grey"
                                label="Deprecated"
                                value={cases.filter((item) => item.status === "deprecated").length}
                                active={activeTab === "deprecated"}
                                onClick={() => handleTabClick("deprecated")}
                            />
                        </>
                    }
                    tableHeaders={
                        <>
                            <td>#</td>
                            <td>Problem</td>
                            <td>Status</td>
                            <td>Tingkat Kepercayaan</td>
                            <td>Frekuensi</td>
                            <td>Skor Performa</td>
                            <td></td>
                        </>
                    }
                >
                    {filteredCase.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td style={{ maxWidth: "450px" }}>{item.problem}</td>
                            <td>
                                <Badge color={item.status === "verified" ? "green" : item.status === "unverified" ? "red" : "grey"}>{item.status}</Badge>
                            </td>
                            <td>{item.confidence_score ? item.confidence_score : <Badge color="grey">No Data</Badge>}</td>
                            <td>{item.frequency}</td>
                            {/* <td>{`${item.feedback?.length ? ((item.frequency / (item.frequency + item.feedback.length)) * 100).toFixed(1) : "0.0"}%`}</td> */}
                            <td>{`${item.feedback?.length ? ((item.feedback.filter((fb) => fb.type === "like").length / item.feedback.length) * 100).toFixed(1) : "0.0"}%`}</td>

                            <td>
                                <ActionList href={`/admin/cases/${item.id}`}>
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
