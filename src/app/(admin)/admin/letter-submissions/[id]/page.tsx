"use client";

import { letterSubmissionService } from "@/api";
import { authService } from "@/api/services/auth.services";
import { UserResponse } from "@/api/types/auth.types";
import { LetterSubmission } from "@/api/types/letter-submission.types";
import StatusBadge from "@/components/admin/pages/LetterSubmission/StatusBadge";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs/Breadcrumbs";
import Button from "@/components/admin/ui/Button/Button";
import FormSelect from "@/components/admin/ui/Form/FormSelect";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
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
    const [letterSubmission, setLetterSubmission] = useState<LetterSubmission>({} as LetterSubmission);

    const [updateStatus, setUpdateStatus] = useState("");

    async function handleLetterSubmissionStatus() {
        const response = await letterSubmissionService.update(params.id as string, {
            status: updateStatus,
        });

        setLetterSubmission((prevState) => ({
            ...prevState,
            status: response.status,
        }));
    }

    function handleUpdateStatus(status: string) {
        setUpdateStatus(status);
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await letterSubmissionService.getById(params.id as string, {
                include: "user,letterType",
            });
            setLetterSubmission(data);
        };
        fetchData();
    }, [params.id]);
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
                        label: letterSubmission.code,
                    },
                ]}
            />
            <main>
                <div className="row gap-6 mt-8">
                    <div className="col-8">
                        <div className="card">
                            <div>
                                <h3>Persyaratan Surat</h3>
                            </div>
                            <div>
                                <iframe src={`http://localhost:8000/storage/${letterSubmission.file_path}`} style={{ width: "100%", height: "660px" }}></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card">
                            <h3>Data Pengajuan</h3>

                            <div className="submission-data">
                                <div className="submission-item">
                                    <h4>Jenis Surat</h4>
                                    <span>{letterSubmission.letter_type?.name}</span>
                                </div>
                                <div className="submission-item">
                                    <h4>Tanggal Pengajuan</h4>
                                    <span>
                                        {new Date(letterSubmission.created_at!)
                                            .toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })
                                            .replace(/\//g, "-")}
                                    </span>
                                </div>
                                <div className="submission-item">
                                    <h4>Kode Pengajuan</h4>
                                    <span>{letterSubmission.code}</span>
                                </div>
                                <div className="submission-item">
                                    <h4>Status</h4>
                                    <StatusBadge status={letterSubmission.status} />
                                </div>
                            </div>
                        </div>
                        <div className="card mt-6">
                            <h3>Data Pengaju</h3>

                            <div className="applicant-data">
                                <div className="applicant-item">
                                    <h4>Nama Lengkap</h4>
                                    <span>{letterSubmission.user?.name}</span>
                                </div>
                                <div className="applicant-item">
                                    <h4>Alamat Email</h4>
                                    <span>{letterSubmission.user?.email}</span>
                                </div>
                                <div className="applicant-item">
                                    <h4>NIM</h4>
                                    <span>{letterSubmission.user?.identity_number}</span>
                                </div>
                                <div className="applicant-item">
                                    <h4>Program Studi</h4>
                                    <span>{letterSubmission.user?.academic_program}</span>
                                </div>
                                <div className="applicant-item">
                                    <h4>No. Handphone</h4>
                                    <span>{letterSubmission.user?.phone}</span>
                                </div>
                            </div>
                        </div>

                        {user.role && (
                            <div className="card mt-6">
                                <h3>Update Status</h3>
                                <div className="row mt-6 flex-column">
                                    <FormSelect className="col-6" value={updateStatus}>
                                        <Button color="grey" onClick={() => handleUpdateStatus("approved")}>
                                            Approved
                                        </Button>
                                        <Button color="grey" onClick={() => handleUpdateStatus("revision")}>
                                            Revision
                                        </Button>
                                        <Button color="grey" onClick={() => handleUpdateStatus("rejected")}>
                                            Rejected
                                        </Button>
                                        <Button color="grey" onClick={() => handleUpdateStatus("completed")}>
                                            Completed
                                        </Button>
                                    </FormSelect>
                                    <div className="flex justify-content-end">
                                        <Button color="black" onClick={handleLetterSubmissionStatus} disabled={updateStatus ? false : true}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
