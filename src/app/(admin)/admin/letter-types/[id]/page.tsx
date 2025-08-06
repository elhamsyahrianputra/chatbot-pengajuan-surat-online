"use client";

import { letterTypeService, letterRequirementService } from "@/api";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Card from "@/components/admin/ui/Card/Card";
import FormFloating from "@/components/admin/ui/Form/FormFloating";
import Table from "@/components/admin/ui/Table/Table";
import { useParams } from "next/navigation";
import ActionList from "@/components/admin/ui/Table/ActionList";
import { FormEvent, useEffect, useState } from "react";
import slugify from "slugify";
import Button from "@/components/admin/ui/Button/Button";
import ActionItem from "@/components/admin/ui/Table/ActionItem";
import { LetterRequirement } from "@/api/types/letter-requirement.types";
import Icon from "@/components/admin/ui/Icon/Icon";
import FormControl from "@/components/admin/ui/Form/FormControl";

export default function Page() {
    const params = useParams();
    const [letterType, setLetterType] = useState<{ id: string; name: string; slug: string; requirements?: LetterRequirement[] }>({
        id: "",
        name: "",
        slug: "",
        requirements: [],
    });
    const [breadcrumbValue, setBreadcrumbValue] = useState("");

    const [letterRequirement, setLetterRequirement] = useState<{ name: string; description: string }>({
        name: "",
        description: "",
    });
    const [isFormLetterRequirement, setIsFormLetterRequirement] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await letterTypeService.getById(params.id as string, {
                include: "requirements",
            });
            setLetterType({ id: data.id, name: data.name, slug: data.slug, requirements: data?.requirements || [] });
            setBreadcrumbValue(data.name);
        };
        fetchData();
    }, [params.id]);

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        const generatedSlug = slugify(name, { lower: true, strict: true });
        setLetterType({
            ...letterType,
            name,
            slug: generatedSlug,
        });
    };

    async function updateLetterTypeName(e: FormEvent<HTMLFormElement>, id: string): Promise<void> {
        e.preventDefault();

        const response = await letterTypeService.update(id, {
            name: letterType.name,
        });

        setLetterType((prevState) => ({
            ...prevState,
            name: response.name,
        }));

        setBreadcrumbValue(response.name);
    }

    function handleLetterRequirement(data: "name" | "description", value: string) {
        if (data === "name") {
            setLetterRequirement((prevState) => ({
                ...prevState,
                name: value,
            }));
        } else {
            setLetterRequirement((prevState) => ({
                ...prevState,
                description: value,
            }));
        }
    }

    function handleFormLetterReqirement(value: boolean) {
        setIsFormLetterRequirement(value);
    }

    async function storeLetterRequirement() {
        const newRequirement = await letterRequirementService.create({
            letter_type_id: params.id as string,
            name: letterRequirement.name,
            description: letterRequirement.description,
        });

        setLetterType((prevState) => ({
            ...prevState,
            requirements: [...(prevState.requirements || []), newRequirement],
        }));

        setLetterRequirement({ name: "", description: "" });
        setIsFormLetterRequirement(false);
    }

    async function deleteLetterRequirement(e: FormEvent<HTMLFormElement>, id: string): Promise<void> {
        e.preventDefault();

        await letterRequirementService.delete(id);

        setLetterType((prevState) => ({
            ...prevState,
            requirements: prevState.requirements?.filter((item) => item.id !== id) || [],
        }));
    }

    return (
        <>
            <Breadcrumbs title="Jenis Surat" breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Pengajuan Surat", href: "/admin/letter-types" }, { label: breadcrumbValue }]} />

            <main style={{ paddingTop: "100px" }}>
                <Card>
                    <form method="post" onSubmit={(e) => updateLetterTypeName(e, letterType.id)}>
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
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.description || "-"}</td>
                                <td>
                                    <ActionList href={`/admin/users/${item.id}`}>
                                        <ActionItem icon="trash" onSubmit={async (e) => deleteLetterRequirement(e, item.id)}>
                                            Delete
                                        </ActionItem>
                                    </ActionList>
                                </td>
                            </tr>
                        ))}
                        {isFormLetterRequirement && (
                            <tr>
                                <td></td>
                                <td>
                                    <FormControl label="" name="" placeholder="" onChange={(e) => handleLetterRequirement("name", e.target.value)} value={letterRequirement.name} />
                                </td>
                                <td>
                                    <FormControl label="" name="" placeholder="" onChange={(e) => handleLetterRequirement("description", e.target.value)} value={letterRequirement.description} />
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <Button color="blue-light" onClick={() => handleFormLetterReqirement(false)}>
                                            <Icon icon="cancel-blue" />
                                        </Button>
                                        <Button color="blue" onClick={storeLetterRequirement}>
                                            <Icon icon="check" style={{ width: "16px", height: "16px" }} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Button color="blue" onClick={() => handleFormLetterReqirement(true)}>
                                    <Icon icon="plus" />
                                </Button>
                            </td>
                        </tr>
                    </Table>
                </Card>
            </main>
        </>
    );
}
