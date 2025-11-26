# Chatbot Pengajuan Surat Online

Aplikasi chatbot untuk membantu proses pengajuan surat online berbasis [Next.js](https://nextjs.org) dengan integrasi LangChain untuk fitur chatbot AI.

## Daftar Isi

- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Penggunaan Chatbot](#penggunaan-chatbot)

## Instalasi

### Prasyarat

Pastikan sistem Anda telah terinstal:
- **Node.js** (versi 18.x atau lebih baru)
- **npm**, **yarn**, **pnpm**, atau **bun** sebagai package manager
- **Git** untuk clone repository

### Setup API Backend (Laravel)

**Penting**: Project ini memerlukan API backend Laravel untuk berfungsi dengan baik. API menyediakan data dan endpoint yang digunakan oleh chatbot dan fitur aplikasi lainnya.

Repository API: [https://github.com/elhamsyahrianputra/api-chatbot-pengajuan-surat-online](https://github.com/elhamsyahrianputra/api-chatbot-pengajuan-surat-online)

Silakan clone, setup, dan jalankan project Laravel tersebut terlebih dahulu sebelum menjalankan aplikasi frontend ini. Instruksi lengkap instalasi tersedia di README project Laravel.

> **Catatan**: Pastikan API Laravel sudah berjalan sebelum menjalankan aplikasi ini.

### Setup Google Gemini API

Aplikasi ini menggunakan **Google Gemini AI** untuk fitur chatbot. Ikuti langkah berikut untuk mendapatkan API key:

1. **Buka Google AI Studio**
   - Kunjungi [https://aistudio.google.com/](https://aistudio.google.com/)
   - Login dengan akun Google Anda

2. **Buat API Key**
   - Klik tombol **"Get API Key"** atau **"Create API Key"**
   - Pilih project Google Cloud Anda (atau buat project baru jika belum ada)
   - API Key akan otomatis di-generate

3. **Salin API Key**
   - Salin API Key yang telah dibuat
   - Simpan dengan aman untuk digunakan pada konfigurasi environment

> **Catatan**: Satu Google Gemini API Key dapat digunakan untuk berbagai model Gemini (1.5 Pro, 1.5 Flash, 2.0 Flash, dll). Aplikasi ini secara default menggunakan **Gemini 2.5 Flash**. Google Gemini API memiliki free tier dengan quota tertentu.

### Clone Project Frontend

1. Kembali ke direktori parent atau buka terminal baru, kemudian clone repository frontend:

```bash
git clone https://github.com/elhamsyahrianputra/chatbot-pengajuan-surat-online.git
```

2. Masuk ke direktori project:

```bash
cd chatbot-pengajuan-surat-online
```

3. Install dependencies:

```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

### Konfigurasi Environment

Buat file `.env.local` di root project dan tambahkan konfigurasi yang diperlukan:

```env
# URL API Backend Laravel (sesuaikan dengan port Laravel Anda)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Google API Key untuk fitur chatbot AI
GOOGLE_API_KEY=your_google_api_key_here
```

**Penjelasan Variabel:**
- `NEXT_PUBLIC_API_URL`: URL endpoint API backend Laravel yang digunakan untuk mengambil data jenis surat, persyaratan, dan data lainnya
- `GOOGLE_API_KEY`: API key dari Google Gemini yang digunakan untuk mengaktifkan fitur chatbot AI

> **Catatan**: Pastikan API Laravel sudah berjalan sebelum menjalankan aplikasi frontend.

### Kredensial Default

Untuk testing dan development, gunakan kredensial berikut:

**User:**
- Email: `elhamsyahrianputra@student.uns.ac.id`
- Password: `password`

**Admin:**
- Email: `admin@admin.uns.ac.id`
- Password: `password`

> **Catatan**: Kredensial ini hanya untuk keperluan development. Pastikan mengubah kredensial untuk production.

### Konfigurasi Model Gemini (Opsional)

Aplikasi ini secara default menggunakan model **Gemini 2.5 Flash**. Jika Anda ingin mengubah model yang digunakan:

1. Buka file `src/utils/langchain/llm.ts`
2. Ubah nilai `model` sesuai dengan model Gemini yang diinginkan:

```typescript
export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash", // Ubah di sini
    temperature: 0,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
});
```

**Model yang tersedia:**
- `gemini-2.5-flash` (default - lebih cepat dan hemat)
- `gemini-1.5-pro` (lebih canggih, lebih lambat)
- `gemini-1.5-flash` (cepat, generasi sebelumnya)
- Model lainnya sesuai dokumentasi Google Gemini

> **Penting**: Pastikan menggunakan **Gemini 2.5 Flash** atau model yang kompatibel. Penggunaan model yang berbeda mungkin memerlukan penyesuaian konfigurasi.

## Menjalankan Aplikasi

### Development Mode

Jalankan aplikasi dalam mode development:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000). Buka URL tersebut di browser untuk melihat hasilnya.

### Production Build

Untuk membuild aplikasi untuk production:

```bash
npm run build
npm run start
```

### Struktur Halaman

- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Login**: [http://localhost:3000/login](http://localhost:3000/login)
- **Register**: [http://localhost:3000/register](http://localhost:3000/register)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Pengajuan Surat Online**: [http://localhost:3000/pengajuan-surat-online](http://localhost:3000/pengajuan-surat-online)

## Penggunaan Chatbot

### Fitur Chatbot

Chatbot ini dirancang untuk membantu pengguna dalam proses pengajuan surat online dengan menggunakan teknologi AI (LangChain). Chatbot dapat:

- Memberikan informasi tentang jenis-jenis surat yang tersedia
- Membantu pengguna memahami persyaratan dokumen untuk setiap jenis surat
- Menjawab pertanyaan umum seputar proses pengajuan surat
- Memandu pengguna langkah demi langkah dalam mengisi formulir pengajuan

### Cara Menggunakan Chatbot

1. **Akses Chatbot**
   - Buka halaman utama aplikasi di [http://localhost:3000](http://localhost:3000)
   - Cari widget/icon chatbot yang biasanya terletak di pojok kanan bawah halaman
   - Klik icon tersebut untuk membuka jendela chat

2. **Memulai Percakapan**
   - Ketik pesan atau pertanyaan Anda di kolom input chat
   - Tekan tombol kirim atau Enter untuk mengirim pesan
   - Chatbot akan merespons dengan informasi yang relevan

3. **Contoh Pertanyaan yang Dapat Diajukan**
   ```
   - "Saya ingin mengajukan surat keterangan aktif kuliah"
   - "Dokumen apa saja yang diperlukan untuk surat rekomendasi?"
   - "Bagaimana cara mengajukan surat pengantar penelitian?"
   - "Berapa lama proses pengajuan surat?"
   ```

4. **Mengikuti Panduan Chatbot**
   - Chatbot akan memberikan instruksi step-by-step
   - Ikuti petunjuk yang diberikan untuk melengkapi informasi
   - Chatbot dapat mengarahkan Anda ke formulir pengajuan yang sesuai

5. **Tips Penggunaan**
   - Gunakan bahasa yang jelas dan spesifik
   - Jika chatbot tidak memahami pertanyaan, coba formulasikan ulang dengan kata-kata yang berbeda
   - Chatbot dapat membantu kapan saja selama Anda menggunakan aplikasi

### Teknologi Chatbot

Chatbot ini dibangun menggunakan:
- **LangChain**: Framework untuk membangun aplikasi berbasis language model
- **Google Gemini AI**: Model AI (Gemini 2.5 Flash) untuk pemrosesan bahasa alami dan respons chatbot
- Custom tools dan agents untuk menangani logika spesifik pengajuan surat
