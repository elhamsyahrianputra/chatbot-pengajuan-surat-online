"use client";

import { userService } from "@/api/services/user.services";
import { User } from "@/api/types/user.types";
import Badge from "@/components/admin/ui/Badge/Badge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Table from "@/components/admin/ui/Table/Table";
import UserProfile from "@/components/admin/ui/Table/UserProfile";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState<User[]>([] as User[]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await userService.getAll();
            setUsers(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Breadcrumbs
                title="User"
                breadcrumbs={[
                    {
                        label: "Dashborad",
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
                    tableHeaders={
                        <>
                            <td>#</td>
                            <td>Nama</td>
                            <td>No. Hp</td>
                            <td>Program Studi</td>
                            <td>Semester</td>
                            <td></td>
                        </>
                    }
                >
                    {users.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <UserProfile email={item.email} gender={item.gender} name={item.name} />
                            </td>
                            <td>{item.phone}</td>
                            <td>{item.academic_program}</td>
                            <td style={{ textAlign: "center" }}>
                                <Badge color="blue">{item.semester}</Badge>
                            </td>
                            <td>
                                {/* <ListAction href={`/admin/users/${item.id}`} /> */}
                            </td>
                        </tr>
                    ))}
                </Table>
            </main>
        </>
    );
}
