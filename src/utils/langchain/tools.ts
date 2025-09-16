import { letterSubmissionService, letterTypeService } from "@/api";
import { LetterRequirement } from "@/api/types/letter-requirement.types";
import { LetterType } from "@/api/types/letter-type.types";
import { DynamicTool, tool } from "@langchain/core/tools";
import { z } from "zod";
import { llm } from "./llm";
import { caseService } from "@/api/services/case.services";
import { Case } from "@/api/types/case.types";

const getLetterTypes = tool(
    async () => {
        const response = await letterTypeService.getAll();
        const daftar = response.map((item: LetterType) => `- slug: ${item.slug} | name: ${item.name}`).join("\n");
        return `Berikut adalah daftar jenis surat:\n${daftar}`;
    },
    {
        name: "get_letter_types",
        description:
            "HANYA gunakan tool ini jika 'search_case_records' tidak menemukan solusi DAN Anda memerlukan 'slug' unik untuk menjalankan tool lain seperti 'get_letter_requirements'. Jangan tunjukkan slug kepada pengguna.",
        schema: z.object({}),
    },
);

const getLetterRequirements = tool(
    async ({ slug }: { slug: string }) => {
        const response = await letterTypeService.getBySlug(slug, { include: "requirements" });

        const reqs = response.requirements?.map((req: LetterRequirement, index: number) => `${index + 1}. ${req.name}`).join("\n");

        // Persiapkan pesan dasar
        let responseMessage = `Berikut adalah persyaratan untuk "${response.name}":\n${reqs}`;

        // Cek jika format_url ada
        if (response.format_url) {
            // 1. Decode URL agar menjadi format yang bersih dan dapat dibaca
            const decodedUrl = decodeURIComponent(response.format_url);

            // 2. Gunakan format Markdown untuk membuat link yang bisa diklik
            const linkMarkdown = `[Klik di sini untuk melihat format surat](${decodedUrl})`;

            responseMessage += `\n\nUntuk format suratnya, silakan ${linkMarkdown}.`;
        }

        return responseMessage;
    },
    {
        name: "get_letter_requirements",
        description:
            "Menampilkan persyaratan yang dibutuhkan untuk mengajukan sebuah surat berdasarkan slug suratnya dan juga menampilkan format_url jika ada data format_url tidak null. Gunakan tool get_leter_types untuk mengetahui slug dari surat yang di minta oleh pengguna dan jangan minta slug kepada pengguna",
        schema: z.object({
            slug: z.string().describe("Slug dari jenis surat yang ingin diajukan"),
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
        const response = await letterSubmissionService.getByCode(code, { include: "letterType" });

        return (
            `Berikut adalah data pengajuan surat anda dengan code ${code}:\n\n` +
            `📄 Jenis Surat   : ${response.letter_type?.name || "-"}\n` +
            `📌 Status        : ${response.status || "-"}\n` +
            `📅 Tanggal Diajukan : ${
                new Date(response.created_at!)
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
    },
    {
        name: "get_letter_submissions_by_code",
        description: "Untuk menampilkan detail surat berdasarkan kode surat yang diberikan. Hanya dapat mengakses surat milik user yang sedang login.",
        schema: z.object({
            code: z.string().describe("Kode surat yang ingin ditampilkan"),
        }),
    },
);

const explainAllLetterStatuses = tool(
    async () => {
        const explanations: Record<string, string> = {
            submitted: "📨 Surat telah diajukan dan menunggu untuk diproses oleh admin.",
            approved: "✅ Surat telah disetujui oleh petugas dan sedang dalam proses verifikasi.",
            rejected: "❌ Surat ditolak. Silakan cek alasan penolakan.",
            revision: "✏️ Surat perlu direvisi. Silakan perbaiki sesuai catatan revisi dan ajukan ulang.",
            completed: "📂 Proses surat telah selesai. Anda bisa mengambil surat di kantor FKIP UNS.",
            canceled: "🛑 Pengajuan surat dibatalkan, baik oleh user maupun sistem.",
        };

        return Object.entries(explanations)
            .map(([key, desc]) => `${key}: ${desc}`)
            .join("\n");
    },
    {
        name: "explain_all_letter_statuses",
        description: "Menjelaskan arti dari semua status surat.",
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

const searchCaseRecords = new DynamicTool({
    name: "search_case_records",
    description:
        "WAJIB digunakan sebagai langkah PERTAMA untuk SEMUA pertanyaan pengguna. Tool ini mencari jawaban di basis pengetahuan (case records) dari masalah yang pernah diselesaikan. Jika ditemukan solusi yang relevan, KEMBALIKAN solusi tersebut. Jika tool ini mengembalikan pesan 'Tidak ditemukan solusi yang relevan', barulah pertimbangkan untuk menggunakan tool lain yang lebih spesifik. Tool ini adalah gerbang utama sebelum memanggil tool lain.",
    func: async (input: string) => {
        try {
            // Langkah 1: Gunakan LLM untuk mengekstrak kata kunci dari pertanyaan pengguna
            const prompt = `Ekstrak kata kunci paling penting dari kalimat berikut: "${input}". Berikan jawaban HANYA dalam format JSON array string. Contoh: ["keyword1", "keyword2", "keyword3"]`;
            const llmResult = await llm.invoke(prompt);

            console.log(input);
            console.log(prompt);
            console.log(llmResult);
            console.log(llmResult.content);

            let keywords: string[] = [];
            try {
                let content = llmResult.content as string;

                // Langkah 1: Hapus semua karakter newline (`\n`) dan ` ```json` dari string
                content = content.replace(/```json|```/g, "").replace(/\n/g, "");

                // Langkah 2: Sekarang string sudah satu baris, regex sederhana bisa digunakan
                // Cari potongan string yang berbentuk array JSON (diawali '[' dan diakhiri ']')
                const jsonMatch = content.match(/(\[.*\])/);

                if (jsonMatch && jsonMatch[0]) {
                    // Jika ditemukan, parse bagian itu saja
                    keywords = JSON.parse(jsonMatch[0]);
                    console.log(keywords);
                } else {
                    // Jika tidak ada yang cocok sama sekali, lempar error agar ditangkap oleh catch
                    throw new Error("Respons LLM tidak mengandung array JSON yang valid.");
                }
            } catch (e) {
                // Fallback jika parsing tetap gagal
                console.log("Gagal mem-parsing keywords dari LLM, menggunakan input mentah:", e);
                keywords = input.split(" "); // Nanti kita perbaiki juga fallback ini
            }

            if (keywords.length === 0) {
                return "Tidak ada kata kunci yang bisa diekstrak untuk pencarian kasus.";
            }

            // Langkah 2: Panggil API Anda dengan kata kunci yang sudah diekstrak
            // Asumsi: caseRecordService.get() bisa menerima query 'keywords'
            const response = await caseService.getVerified({
                keywords: keywords.join(","), // Kirim keywords sebagai string dipisahkan koma
            });

            const caseRecords = response;

            if (!caseRecords || caseRecords.length === 0) {
                return "Tidak ditemukan solusi yang relevan dari kasus sebelumnya.";
            }

            // Langkah 3: (Opsional tapi direkomendasikan) Lakukan skoring sederhana jika API mengembalikan > 1 hasil
            // untuk menemukan yang terbaik.
            let bestCase: Case = {} as Case;
            let maxScore = 0;

            caseRecords.forEach((record: Case) => {
                let currentScore = 0;
                keywords.forEach((keyword) => {
                    if (record.keywords?.toLowerCase().includes(keyword.toLowerCase())) {
                        currentScore++;
                    }
                });
                if (currentScore > maxScore) {
                    maxScore = currentScore;
                    bestCase = record;
                }
            });

            if (!bestCase) {
                // Jika tidak ada yang cocok sama sekali setelah skoring, kembalikan hasil pertama
                return `Ditemukan kasus yang mungkin relevan. Solusinya adalah: ${caseRecords[0].solution}`;
            }

            // Langkah 4: Kembalikan solusi dari kasus terbaik
            return `Ditemukan kasus serupa yang pernah terjadi. Solusinya adalah: ${bestCase.solution}`;
        } catch (error) {
            console.error("Error di searchCaseRecords tool:", error);
            return "Terjadi kesalahan saat mencoba mencari di basis pengetahuan.";
        }
    },
});

const Tools = [searchCaseRecords, explainAllLetterStatuses, getLetterTypes, getLetterRequirements, getNewestLetterSubmissions, getLetterSubmissionsByCode, explainLetterStatus];

export default Tools;
