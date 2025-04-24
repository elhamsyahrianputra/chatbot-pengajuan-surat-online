"use client";

import { letterTypeService, letterRequirementService } from "@/api";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Card from "@/components/admin/ui/Card/Card";
import FormFloating from "@/components/admin/ui/Form/FormFloating";
import Table from "@/components/admin/ui/Table/Table";
import { useParams } from "next/navigation";
import ActionList from "@/components/admin/ui/Table/ActionList";
import { useEffect, useState } from "react";
import slugify from "slugify";
import Button from "@/components/admin/ui/Button/Button";
import ActionItem from "@/components/admin/ui/Table/ActionItem";
import { LetterRequirement } from "@/api/types/letter-requirement.types";

export default function Page() {
    const params = useParams();
    const [letterType, setLetterType] = useState<{ name: string; slug: string; requirements?: LetterRequirement[] }>({
        name: "",
        slug: "",
        requirements: [],
    });
    const [breadcrumbValue, setBreadcrumbValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await letterTypeService.getById(params.id as string, {
                include: "requirements",
            });
            setLetterType({ name: data.name, slug: data.slug, requirements: data?.requirements || [] });
            setBreadcrumbValue(data.name);
        };
        fetchData();
    }, [params.id]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const generatedSlug = slugify(name, { lower: true, strict: true });
        setLetterType({
            name,
            slug: generatedSlug,
            requirements: letterType.requirements,
        });
    };

    async function handleDeleteLetterType(e: React.FormEvent<HTMLFormElement>, id: string) {
        e.preventDefault();

        try {
            console.log(`Mencoba menghapus requirement dengan id: ${id}`);

            // Tambahkan header Authorization jika diperlukan
            // Misalnya jika menggunakan token Bearer
            const response = await letterTypeService.delete(id);
            console.log("Response dari server:", response);

            // Update state lokal
            setLetterType({
                ...letterType,
                requirements: letterType.requirements?.filter((req) => req.id !== id) || [],
            });

            alert("Persyaratan berhasil dihapus");
        } catch (error: any) {
            console.error("Error lengkap:", error);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);

            alert(`Gagal menghapus persyaratan. Status: ${error.response?.status}, Pesan: ${error.response?.data?.message || error.message}`);
        }
    }

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
                    {
                        label: breadcrumbValue,
                    },
                ]}
            />

            <main style={{ paddingTop: "100px" }}>
                <Card>
                    <form method="post" action="/test">
                        <div className="row">
                            <div className="col">
                                <FormFloating name="name" label="Name" value={letterType.name} onChange={handleNameChange} />
                            </div>
                            <div className="col">
                                <FormFloating name="slug" label="Slug" value={letterType.slug} disabled />
                            </div>
                        </div>
                        <div>
                            <Button color="blue" className="mt-4">
                                Update
                            </Button>
                        </div>
                    </form>
                    <Table
                        tableHeaders={
                            <>
                                <td>#</td>
                                <td>Persyaratan</td>
                                <td>Deskripsi</td>
                                <td></td>
                            </>
                        }
                    >
                        {letterType.requirements?.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description || "-"}</td>
                                <td>
                                    <ActionList href={`/admin/users/${item.id}`}>
                                        <ActionItem icon="trash" onSubmit={(e) => handleDeleteLetterType(e, item.id)}>
                                            Delete
                                        </ActionItem>
                                    </ActionList>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </Card>
            </main>
        </>
    );
}
