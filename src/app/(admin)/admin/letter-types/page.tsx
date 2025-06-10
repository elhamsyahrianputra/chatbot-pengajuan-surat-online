"use client";

import { letterTypeService } from "@/api";
import { LetterType } from "@/api/types/letter-type.types";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import ActionItem from "@/components/admin/ui/Table/ActionItem";
import ActionList from "@/components/admin/ui/Table/ActionList";
import RequirementList from "@/components/admin/ui/Table/RequirementList";
import Table from "@/components/admin/ui/Table/Table";
import { useEffect, useState } from "react";
export default function Page() {
    const [letterTypes, setLetterTypes] = useState<LetterType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await letterTypeService.getAll({
                include: "requirements",
            });
            setLetterTypes(data);
        };
        fetchData();
    });
    return (
        <>
            <Breadcrumbs
                title="Jenis Surat"
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
                    // colGroup={["auto", "50%", "50%", "auto"]}
                    tableHeaders={
                        <>
                            <td>#</td>
                            <td>Jenis Surat</td>
                            <td>Persyaratan</td>
                            <td></td>
                        </>
                    }
                >
                    {letterTypes.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.requirements && <RequirementList requirements={item.requirements} />}</td>
                            <td>
                                <ActionList href={`/admin/letter-types/${item.id}`}>
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
