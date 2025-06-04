"use client";

import { letterSubmissionService, letterTypeService } from "@/api";
import { authService } from "@/api/services/auth.services";
import { UserResponse } from "@/api/types/auth.types";
import Button from "@/components/admin/ui/Button/Button";
import FormControl from "@/components/admin/ui/Form/FormControl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileError, setFileError] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [user, setUser] = useState<UserResponse>({
        id: "",
        name: "",
        email: "",
    });

    const [letterType, setLetterType] = useState<{ id: string; name: string; slug: string }>({
        id: "",
        name: "",
        slug: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await authService.getUser();
                const letterType = await letterTypeService.getBySlug(params.slug as string);

                setUser(user);
                setLetterType(letterType);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.slug]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError("");
        const selectedFile = e.target.files?.[0] || null;
        
        // Validasi file
        if (selectedFile) {
            // Validasi tipe file
            if (selectedFile.type !== 'application/pdf') {
                setFileError("File harus berjenis PDF");
                setFile(null);
                return;
            }
            
            // Validasi ukuran file (10MB = 10 * 1024 * 1024 bytes)
            if (selectedFile.size > 10 * 1024 * 1024) {
                setFileError("Ukuran file tidak boleh melebihi 10MB");
                setFile(null);
                return;
            }
            
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!file) {
            setFileError("File persyaratan harus diunggah");
            return;
        }
        
        try {
            setIsSubmitting(true);
            
            // Buat FormData untuk mengirim file
            const formData = new FormData();
            formData.append('letter_type', letterType.slug);
            formData.append('file_path', file);
            
            // Kirim data ke API
            await letterSubmissionService.create(formData);
            
            // Redirect atau tampilkan pesan sukses
            alert("Pengajuan surat berhasil!");
            router.push('/submissions'); // Sesuaikan dengan rute yang sesuai
            
        } catch (error: any) {
            console.error("Gagal mengajukan surat:", error);
            
            // Tangani error dari server
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                if (errors.file_path) {
                    setFileError(errors.file_path[0]);
                }
            } else {
                alert("Terjadi kesalahan saat mengajukan surat. Silakan coba lagi.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main style={{ height: "550px" }} className="flex align-items-center justify-content-center">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main id="form-letter-submission">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <h1 className="form-title">Form {letterType.name}</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col">
                                    <FormControl placeholder="Nama" label="Nama" value={user.name} disabled />
                                </div>
                                <div className="col">
                                    <FormControl placeholder="NIM" label="NIM" value={user.profile?.identity_number} disabled />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FormControl placeholder="No. Telepon" label="No. Telepon" value={user.profile?.phone} disabled />
                                </div>
                                <div className="col">
                                    <FormControl placeholder="Email" label="Email" value={user.email} disabled />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FormControl placeholder="Program Studi" label="Program Studi" value={user.profile?.academic_program} disabled />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FormControl 
                                        type="file" 
                                        label="File Persyaratan" 
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        error={fileError}
                                    />
                                    <span className="form-noted">Semua persyaratan dikumpulkan dalam satu file</span>
                                    <span className="form-noted">File harus berjenis .pdf, dan maksimal berukuran 10MB</span>
                                </div>
                            </div>
                            <div className="flex justify-content-end">
                                <button 
                                    className="button-submit" 
                                    type="submit" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Mengirim..." : "Ajukan Surat"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}