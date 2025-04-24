import { letterTypeService } from "@/api";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import ListAction from "@/components/admin/ui/Table/ActionList";
import RequirementList from "@/components/admin/ui/Table/RequirementList";
import TabButton from "@/components/admin/ui/Table/TabButton";
import Table from "@/components/admin/ui/Table/Table";
export default async function Page() {
    const letterTypes = await letterTypeService.getAll({
        include: "requirements",
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
                            <td>
                                {item.requirements && (
                                    <RequirementList
                                        requirements={item.requirements}
                                    />
                                )}
                            </td>
                            <td>
                                <ListAction
                                    href={`/admin/letter-types/${item.id}`}
                                />
                            </td>
                        </tr>
                    ))}
                </Table>
            </main>
        </>
    );
}
