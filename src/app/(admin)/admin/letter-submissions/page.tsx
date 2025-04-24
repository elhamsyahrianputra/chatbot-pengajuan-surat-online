import { letterSubmissionService } from "@/api/services/letter-submission.services";
import StatusBadge from "@/components/admin/pages/LetterSubmission/StatusBadge";
import Badge from "@/components/admin/ui/Badge/Badge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import ListAction from "@/components/admin/ui/Table/ActionList";
import TabButton from "@/components/admin/ui/Table/TabButton";
import Table from "@/components/admin/ui/Table/Table";
import UserProfile from "@/components/admin/ui/Table/UserProfile";

export default async function Page() {
    const letterSubmissions = await letterSubmissionService.getAll({
        include: "user,letterType",
    });

    console.log(letterSubmissions);

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
                    tabButtons={
                        <>
                            <TabButton
                                color="black"
                                label="All"
                                value={letterSubmissions.length}
                            />
                            <TabButton
                                color="blue"
                                label="Submitted"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "submitted",
                                    ).length
                                }
                            />
                            <TabButton
                                color="green"
                                label="Approved"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "approved",
                                    ).length
                                }
                            />
                            <TabButton
                                color="orange"
                                label="Revision"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "revision",
                                    ).length
                                }
                            />
                            <TabButton
                                color="red"
                                label="Rejected"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "rejected",
                                    ).length
                                }
                            />

                            <TabButton
                                color="purple"
                                label="Completed"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "completed",
                                    ).length
                                }
                            />
                            <TabButton
                                color="grey"
                                label="Canceled"
                                value={
                                    letterSubmissions.filter(
                                        (item) => item.status === "canceled",
                                    ).length
                                }
                            />
                        </>
                    }
                    tableHeaders={
                        <>
                            <td>#</td>
                            <td>Jenis Surat</td>
                            <td>Jenis Surat</td>
                            <td>Status</td>
                            <td>Tanggal Pengajuan</td>
                            <td></td>
                        </>
                    }
                >
                    {letterSubmissions.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                {item.user && (
                                    <UserProfile
                                        email={item.user.email}
                                        gender={item.user.gender}
                                        name={item.user.name}
                                    />
                                )}
                            </td>
                            <td>{item.letter_type && item.letter_type.name}</td>
                            <td>
                                <StatusBadge status={item.status} />
                            </td>
                            <td>
                                {" "}
                                {new Date(item.created_at)
                                    .toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")}
                            </td>
                            <td>
                                <ListAction
                                    href={`/admin/letter-submissions/${item.id}/show`}
                                />
                            </td>
                        </tr>
                    ))}
                </Table>
            </main>
        </>
    );
}
