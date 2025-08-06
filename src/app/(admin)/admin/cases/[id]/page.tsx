"use client";

import { caseService } from "@/api/services/case.services";
import { Case } from "@/api/types/case.types";
import Badge from "@/components/admin/ui/Badge/Badge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Button from "@/components/admin/ui/Button/Button";
import FormControl from "@/components/admin/ui/Form/FormControl";
import TextAreaControl from "@/components/admin/ui/Form/TextAreaControl";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const [cased, setCased] = useState<Case>({} as Case);

    useEffect(() => {
        const fetchData = async () => {
            const data = await caseService.getById(params.id as string, {
                include: "feedback",
            });
            setCased(data);
        };
        fetchData();
    }, [params.id]);

    // Handle Submit
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        await caseService.update(params.id as string, {
            confidence_score: cased.confidence_score,
            frequency: cased.frequency,
            keywords: cased.keywords,
            problem: cased.problem,
            solution: cased.solution,
            status: cased.status,
        });
    }

    return (
        <>
            <Breadcrumbs
                title="Pengajuan Surat"
                breadcrumbs={[
                    {
                        label: "Admin",
                        href: "/admin",
                    },
                    {
                        label: "Pengajuan Surat",
                        href: "/admin/letter-submissions",
                    },
                    {
                        label: "Detail",
                    },
                ]}
            />
            <main>
                <div className="row mt-8">
                    <div className="col-8">
                        <div className="card">
                            <h3>Data Kasus</h3>
                            <div className="mt-8">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-8">
                                            <FormControl
                                                name="keyword"
                                                label="Keyword"
                                                value={cased.keywords}
                                                onChange={(e) => {
                                                    setCased((prev) => ({ ...prev, keywords: e.target.value }));
                                                }}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <FormControl
                                                name="frequency"
                                                label="Sukses"
                                                value={cased.frequency}
                                                onChange={(e) => {
                                                    setCased((prev) => ({ ...prev, frequency: Number(e.target.value) }));
                                                }}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-2">
                                            <FormControl
                                                name="confidence_score"
                                                label="Kepercayaan"
                                                value={cased.confidence_score || 0}
                                                onChange={(e) => {
                                                    setCased((prev) => ({ ...prev, confidence_score: Number(e.target.value) }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 mt-4">
                                        <TextAreaControl
                                            name="problem"
                                            label="Problem"
                                            value={cased.problem}
                                            onChange={(e) => {
                                                setCased((prev) => ({ ...prev, problem: e.target.value }));
                                            }}
                                        />
                                    </div>
                                    <div className="col-8 mt-4">
                                        <TextAreaControl
                                            name="solution"
                                            label="Solusi"
                                            value={cased.solution}
                                            onChange={(e) => {
                                                setCased((prev) => ({ ...prev, problem: e.target.value }));
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-content-end">
                                        <Button color="blue" className="mt-4">
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card">
                            <div className="flex justify-content-between">
                                <h3>Data Feedback</h3>
                                <Badge color="black">{cased.feedback?.length}</Badge>
                            </div>

                            <ul className="mt-4">
                                <li>
                                    <div className="card">
                                        <div className="flex justify-content-between">
                                            <span>Unrelevant</span>
                                            <Badge color="blue">{cased.feedback?.filter((item) => item.type === "not_relevant").length}</Badge>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-3">
                                    <div className="card">
                                        <div className="flex justify-content-between">
                                            <span>Incomplete</span>
                                            <Badge color="red">{cased.feedback?.filter((item) => item.type === "incomplete").length}</Badge>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-3">
                                    <div className="card">
                                        <div className="flex justify-content-between">
                                            <span>Different Situation</span>
                                            <Badge color="purple">{cased.feedback?.filter((item) => item.type === "different_situation").length}</Badge>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
