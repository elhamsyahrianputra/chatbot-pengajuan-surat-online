import { letterSubmissionService } from "@/api";
import { LetterRequirement } from "@/api/types/letter-requirement.types";
import { LetterSubmission } from "@/api/types/letter-submission.types";
import { LetterType } from "@/api/types/letter-type.types";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const getLetterTypes = tool(
    async () => {
        const response = await fetch("http://localhost:8000/api/letter-types");
        const data = await response.json();
        const daftar = data.data.map((item: any) => `- id: ${item.id} | name: ${item.name}`).join("\n");
        return `Berikut adalah daftar jenis surat:\n${daftar}`;
    },
    {
        name: "get_letter_types",
        description: "Mengambil semua jenis surat beserta id-nya. Gunakan ini jika kamu ingin mencari ID dari nama surat.",
        schema: z.object({}),
    },
);

const getLetterRequirements = tool(
    async ({ id }: { id: string }) => {
        const response = await fetch(`http://localhost:8000/api/letter-types/${id}?include=requirements`);
        const data = await response.json();

        const surat = data.data;
        const reqs = surat.requirements.map((req: LetterRequirement, index: number) => `${index + 1}. ${req.name}`).join("\n");

        return `Berikut adalah persyaratan untuk "${surat.name}":\n${reqs}`;
    },
    {
        name: "get_letter_requirements",
        description: "Menampilkan persyaratan yang dibutuhkan untuk mengajukan sebuah surat berdasarkan ID surat.",
        schema: z.object({
            id: z.string().describe("ID dari jenis surat yang ingin diajukan"),
        }),
    },
);

const getNewestLetterSubmissions = tool(
    async () => {
        try {
            const response = await letterSubmissionService.getLatestByUser({ include: "letterType" });

            // Handle case when no submission found
            if (!response) {
                return "Tidak ada pengajuan surat yang ditemukan untuk akun Anda.";
            }

            return (
                `Berikut adalah status pengajuan surat anda yang terbaru:\n\n` +
                `📄 Jenis Surat   : ${response.letter_type?.name || "-"}\n` +
                `Code: ${response.code}` +
                `📌 Status        : ${response.status || "-"}\n` +
                `📅 Tanggal Diajukan : ${
                    response.created_at
                        ? new Date(response.created_at)
                              .toLocaleString("id-ID", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                              })
                              .replace(/\//g, "-")
                        : "-"
                }`
            );
        } catch (error) {
            console.error("Error fetching latest letter submission:", error);
            return "Maaf, terjadi kesalahan saat mengambil data pengajuan surat. Silakan coba lagi nanti.";
        }
    },
    {
        name: "get_latest_letter_submissions",
        // description:
        //     "Menampilkan status pengajuan surat terakhir paling terbaru berdasarkan user yang aktif. Gunakan tool ini ketika user menanyakan tentang status pengajuan surat terbaru, pengajuan terakhir, atau status surat yang baru saja diajukan.",
        description: "Mengambil jenis, status, dan tanggal pengajuan surat terakhir yang diajukan oleh pengguna",
        schema: z.object({}),
    },
);

const getLetterSubmissionsByCode = tool(
    async ({ code }: { code: string }) => {
        try {
            const response = await letterSubmissionService.getByCode(code, { include: "letterType" });

            return (
                `Berikut adalah data pengajuan surat anda dengan code ${code}:\n\n` +
                `📄 Jenis Surat   : ${response.letter_type?.name || "-"}\n` +
                `📌 Status        : ${response.status || "-"}\n` +
                `📅 Tanggal Diajukan : ${
                    new Date(response.created_at!!)
                        .toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })
                        .replace(/\//g, "-") || "-"
                }`
            );
        } catch (error: any) {
            // Handle different types of errors
            if (error.response?.status === 403) {
                return `❌ Anda tida memiliki pengajuan surat dengan code ${code}`;
            }
        }
    },
    {
        name: "get_letter_submissions_by_code",
        description: "Untuk menampilkan detail surat berdasarkan kode surat yang diberikan. Hanya dapat mengakses surat milik user yang sedang login.",
        schema: z.object({
            code: z.string().describe("Kode surat yang ingin ditampilkan"),
        }),
    },
);

const explainLetterStatus = tool(
    async ({ status }) => {
        const explanations: Record<string, string> = {
            submitted: "📨 Surat telah diajukan dan menunggu untuk diproses oleh admin.",
            approved: "✅ Surat telah disetujui oleh petugas dan sedang dalam proses verifikasi.",
            rejected: "❌ Surat ditolak. Silakan cek alasan penolakan.",
            revision: "✏️ Surat perlu direvisi. Silakan perbaiki sesuai catatan revisi dan ajukan ulang.",
            completed: "📂 Proses surat telah selesai. Anda bisa mengambil surat di kantor FKIP UNS.",
            canceled: "🛑 Pengajuan surat dibatalkan, baik oleh user maupun sistem.",
        };

        return explanations[status] || "Status tidak dikenali. Silakan pastikan Anda menggunakan status yang valid.";
    },
    {
        name: "explain_letter_status",
        description: "Menjelaskan arti dari status surat yang ada dalam sistem.",
        schema: z.object({
            status: z.enum(["submitted", "approved", "rejected", "revision", "completed", "canceled"]),
        }),
    },
);

const Tools = [getLetterTypes, getLetterRequirements, getNewestLetterSubmissions, getLetterSubmissionsByCode, explainLetterStatus];

export default Tools;
