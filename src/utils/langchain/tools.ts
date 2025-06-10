import { letterSubmissionService } from "@/api";
import { LetterRequirement } from "@/api/types/letter-requirement.types";
import { LetterType } from "@/api/types/letter-type.types";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const getLetterTypes = tool(
    async () => {
        const response = await fetch("http://localhost:8000/api/letter-types");
        const data = await response.json();
        const daftar = data.data.map((item: LetterType) => `- slug: ${item.slug} | name: ${item.name}`).join("\n");
        return `Berikut adalah daftar jenis surat:\n${daftar}`;
    },
    {
        name: "get_letter_types",
        description:
            "Mengambil daftar semua jenis surat yang tersedia beserta 'slug' uniknya. Gunakan tool ini sebagai langkah pertama jika pengguna menyebutkan nama surat (misalnya 'Surat Keterangan Aktif Kuliah') tetapi agent belum tahu slug-nya (misalnya 'surat-keterangan-aktif-kuliah'). Slug ini wajib digunakan untuk tool lain seperti get_letter_requirements. Selain itu slug ini hanya digunakan untuk anda mencari data, tidak boleh diketahui oleh user/pengguna. Bila pengguna bertanya terkait slug, beritahu jika anda tidak mengetahuinya",
        schema: z.object({}),
    },
);

const getLetterRequirements = tool(
    async ({ slug }: { slug: string }) => {
        const response = await fetch(`http://localhost:8000/api/letter-types/slug/${slug}?include=requirements`);
        const data = await response.json();

        const surat = data.data;
        const reqs = surat.requirements.map((req: LetterRequirement, index: number) => `${index + 1}. ${req.name}`).join("\n");

        return `Berikut adalah persyaratan untuk "${surat.name}":\n${reqs}`;
    },
    {
        name: "get_letter_requirements",
        description: "Menampilkan persyaratan yang dibutuhkan untuk mengajukan sebuah surat berdasarkan slug suratnya. Gunakan tool get_leter_types untuk mengetahui slug dari surat yang di minta oleh pengguna dan jangan minta slug kepada pengguna",
        schema: z.object({
            slug: z.string().describe("SLug dari jenis surat yang ingin diajukan"),
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
        description:
            "Mengambil status pengajuan surat PALING BARU dari pengguna yang sedang login. Gunakan tool ini jika pengguna menanyakan 'status surat saya', 'pengajuan terakhir saya bagaimana?', atau pertanyaan serupa yang tidak menyebutkan kode spesifik.",
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
            // Di dalam getLetterSubmissionsByCode
        } catch (error: any) {
            if (error.response?.status === 404) {
                return `❌ Pengajuan surat dengan kode "${code}" tidak dapat ditemukan. Mohon periksa kembali kode Anda.`;
            }
            if (error.response?.status === 403) {
                return `❌ Anda tidak memiliki izin untuk melihat pengajuan surat dengan kode "${code}". Pastikan Anda login dengan akun yang benar.`;
            }
            console.error(`Error fetching submission with code ${code}:`, error);
            return `Maaf, terjadi kesalahan saat mengambil data untuk kode ${code}. Silakan coba lagi nanti.`;
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
