# 🗳️ Pemira Himasta UGM v2

> **Pemilihan Raya Himpunan Mahasiswa Statistika UGM** — Sistem e-voting modern, aman, dan transparan untuk memilih Ketua Himpunan.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 📑 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Proyek](#-arsitektur-proyek)
- [Panduan Pengguna](#-panduan-pengguna)
  - [Untuk Mahasiswa (Voter)](#-untuk-mahasiswa-voter)
  - [Untuk Admin / Panitia](#-untuk-admin--panitia)
- [Panduan Developer](#-panduan-developer)
  - [Prasyarat](#prasyarat)
  - [Instalasi & Setup](#instalasi--setup)
  - [Konfigurasi Environment](#konfigurasi-environment)
  - [Setup Database](#setup-database)
  - [Menjalankan Development Server](#menjalankan-development-server)
- [Skema Database](#-skema-database)
- [Struktur Folder](#-struktur-folder)
- [API & Server Actions](#-api--server-actions)
- [Autentikasi & Middleware](#-autentikasi--middleware)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)

---

## 📖 Tentang Proyek

**Pemira Himasta UGM v2** adalah aplikasi web full-stack untuk menyelenggarakan Pemilihan Raya (Pemira) di lingkungan Himpunan Mahasiswa Statistika (Himasta) Universitas Gadjah Mada. Sistem ini menggantikan proses voting manual dengan platform digital yang:

- **Aman** — Autentikasi berbasis cookie dengan session terpisah untuk admin dan mahasiswa
- **Transparan** — Hasil pemilihan dapat dipantau secara real-time oleh panitia
- **Mudah digunakan** — Antarmuka intuitif untuk mahasiswa dan admin
- **Scalable** — Dibangun di atas Next.js 16 dengan PostgreSQL dan Prisma ORM

---

## ✨ Fitur Utama

### 🎓 Sisi Mahasiswa (Voter)
| Fitur | Deskripsi |
|-------|-----------|
| **Landing Page Dinamis** | Informasi Pemira, timeline, dan profil kandidat yang dikelola dari admin panel |
| **Login Mahasiswa** | Autentikasi menggunakan NIM dan password unik |
| **Profil Kandidat** | Melihat detail kandidat: foto, visi, misi, inovasi, CV, dan Grand Design |
| **Halaman Voting** | Memilih kandidat dengan konfirmasi sebelum submit |
| **Halaman Konfirmasi** | Konfirmasi bahwa suara telah berhasil dikirim |

### 🔧 Sisi Admin / Panitia
| Fitur | Deskripsi |
|-------|-----------|
| **Dashboard** | Statistik real-time: total voter, sudah memilih, tingkat partisipasi, jumlah kandidat |
| **Manajemen Voter** | Tambah, hapus, aktifkan/nonaktifkan voter secara satuan maupun massal per angkatan |
| **Import CSV** | Import daftar voter dari file CSV (format: `nim,angkatan`) |
| **Manajemen Kandidat** | CRUD data kandidat beserta visi, misi, inovasi, foto, CV, dan Grand Design |
| **Pengaturan Landing Page** | Edit informasi landing page (judul, tahun, deskripsi, alamat, Instagram) |
| **Manajemen Timeline** | Tambah/hapus event timeline Pemira |
| **Manajemen Admin** | Undang admin baru via email, hapus admin, ganti password |
| **Reset Password** | Sistem reset password via email dengan token kedaluwarsa |
| **Hasil Pemilihan** | Monitoring real-time hasil perolehan suara |

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Komponen UI** | [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/), [Recharts](https://recharts.org/) |
| **ORM** | [Prisma 5](https://www.prisma.io/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (via Supabase) |
| **Autentikasi** | Cookie-based session + [bcryptjs](https://github.com/nicolo-ribaudo/bcrypt.js) |
| **Email** | [Nodemailer](https://nodemailer.com/) (SMTP) |
| **Notifikasi** | [Sonner](https://sonner.emilkowal.dev/) (toast notifications) |
| **Font** | Custom local fonts (Avenue, Futura) |

---

## 🏗️ Arsitektur Proyek

```
┌──────────────────────────────────────────────────┐
│                    Client (Browser)               │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐ │
│  │  Landing    │  │  Voting    │  │  Admin      │ │
│  │  Page       │  │  Flow      │  │  Dashboard  │ │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘ │
└────────┼───────────────┼────────────────┼────────┘
         │               │                │
    ┌────▼───────────────▼────────────────▼────┐
    │           Next.js 16 (App Router)         │
    │  ┌──────────────────────────────────────┐ │
    │  │         Middleware (Auth Guard)       │ │
    │  └──────────────────────────────────────┘ │
    │  ┌──────────────────────────────────────┐ │
    │  │    Server Actions (Business Logic)   │ │
    │  │  ┌────────┐ ┌──────┐ ┌────────────┐ │ │
    │  │  │  Auth  │ │ Vote │ │ Admin CRUD │ │ │
    │  │  └────────┘ └──────┘ └────────────┘ │ │
    │  └─────────────────┬────────────────────┘ │
    └────────────────────┼──────────────────────┘
                         │
    ┌────────────────────▼──────────────────────┐
    │          Prisma ORM (Data Layer)           │
    └────────────────────┬──────────────────────┘
                         │
    ┌────────────────────▼──────────────────────┐
    │      PostgreSQL (Supabase / Self-hosted)   │
    └───────────────────────────────────────────┘
```

---

## 👤 Panduan Pengguna

### 🎓 Untuk Mahasiswa (Voter)

#### 1. Membuka Website
Kunjungi URL Pemira yang diberikan panitia. Halaman utama menampilkan informasi umum Pemira, timeline, dan daftar kandidat.

#### 2. Melihat Profil Kandidat
Klik pada foto atau nama kandidat di landing page untuk melihat detail lengkap: visi, misi, program inovasi, CV, dan Grand Design.

#### 3. Login
1. Klik tombol **"Mulai Voting"** atau buka halaman login
2. Masukkan **NIM** dan **Password** yang diberikan panitia
3. Klik **"Login"**

> [!NOTE]
> Password diberikan oleh panitia dan bersifat unik untuk setiap mahasiswa. Hubungi panitia jika belum mendapatkan akses.

#### 4. Melakukan Voting
1. Setelah login, halaman voting menampilkan daftar kandidat
2. Pilih kandidat yang diinginkan
3. Konfirmasi pilihan Anda
4. Suara akan tercatat dan Anda diarahkan ke halaman konfirmasi

> [!CAUTION]
> Voting hanya bisa dilakukan **satu kali**. Setelah memilih, Anda **tidak dapat mengubah** pilihan. Pastikan pilihan sudah benar sebelum mengonfirmasi.

---

### 🔧 Untuk Admin / Panitia

#### Login Admin
1. Akses `/admin/login`
2. Masukkan email dan password
3. Untuk login pertama kali, sistem otomatis membuat akun default:
   - **Email:** `admin@example.com`
   - **Password:** `password123`

> [!WARNING]
> Segera ganti password default setelah login pertama melalui menu **Settings > Ganti Password**.

#### Dashboard
Setelah login, dashboard menampilkan:
- **Total voter terdaftar** dan jumlah voter aktif
- **Jumlah yang sudah memilih**
- **Tingkat partisipasi** (persentase)
- **Jumlah kandidat** terdaftar

#### Manajemen Voter
Navigasi ke menu **Voters** untuk:

- **Tambah voter satuan** — Masukkan NIM dan angkatan. Password di-generate otomatis
- **Import CSV** — Upload file CSV dengan format:
  ```csv
  nim,angkatan
  12345678,2023
  23456789,2022
  ```
- **Aktifkan/Nonaktifkan voter** — Toggle status per individu atau massal per angkatan
- **Hapus voter** — Hapus data voter dari sistem
- **Reset status voting** — Reset status "sudah memilih" jika terjadi kesalahan

#### Manajemen Kandidat
Navigasi ke menu **Candidates** untuk:
- Tambah kandidat baru (nomor urut, nama, foto, visi, misi, inovasi, CV, Grand Design)
- Edit data kandidat yang sudah ada
- Hapus kandidat

#### Pengaturan Landing Page
Navigasi ke menu **Landing** untuk:
- Edit informasi umum (judul, tahun, deskripsi, alamat, URL Instagram)
- Kelola timeline event Pemira (tambah/hapus event, tandai event voting)

#### Manajemen Admin
Navigasi ke menu **Admins** untuk:
- **Undang admin baru** — Kirim undangan via email. Admin baru akan menerima link untuk mengatur password
- **Hapus admin** — Hapus akun admin lain (tidak bisa menghapus akun sendiri)

#### Ganti Password
Navigasi ke menu **Settings** untuk mengubah password akun admin.

#### Lupa Password
1. Pada halaman login admin, klik **"Lupa Password"**
2. Masukkan email yang terdaftar
3. Cek inbox email untuk link reset password (berlaku 1 jam)
4. Klik link dan atur password baru

---

## 🧑‍💻 Panduan Developer

### Prasyarat

Pastikan tools berikut sudah terinstall:

| Tool | Versi Minimum | Keterangan |
|------|:------------:|------------|
| [Node.js](https://nodejs.org/) | 18.x | Runtime JavaScript |
| [npm](https://www.npmjs.com/) | 9.x | Package manager (bundled dengan Node.js) |
| [PostgreSQL](https://www.postgresql.org/) | 14.x | Database (atau gunakan Supabase) |
| [Git](https://git-scm.com/) | 2.x | Version control |

### Instalasi & Setup

```bash
# 1. Clone repository
git clone https://github.com/AhmadSPriaji/pemira-himasta-v2.git
cd pemira-himasta-v2

# 2. Install dependencies
npm install

# 3. Salin file environment
cp .env.example .env

# 4. Edit file .env dengan konfigurasi Anda (lihat bagian selanjutnya)

# 5. Generate Prisma Client
npx prisma generate

# 6. Jalankan migrasi database
npx prisma db push

# 7. Jalankan development server
npm run dev
```

### Konfigurasi Environment

Salin `.env.example` ke `.env` dan isi sesuai konfigurasi Anda:

```env
# === DATABASE ===
# URL koneksi PostgreSQL (gunakan pooler untuk production)
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"

# URL koneksi langsung (untuk migrasi Prisma)
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# === SMTP (Email) ===
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# === APLIKASI ===
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Mendapatkan Gmail App Password
1. Aktifkan **2-Step Verification** di [Google Account](https://myaccount.google.com/security)
2. Buka [App Passwords](https://myaccount.google.com/apppasswords)
3. Pilih **Mail** → **Other** → Beri nama (contoh: "Pemira Himasta")
4. Salin password 16 karakter yang dihasilkan ke `SMTP_PASS`

#### Menggunakan Supabase sebagai Database
1. Buat project baru di [Supabase](https://supabase.com/)
2. Buka **Settings > Database**
3. Salin **Connection string (URI)** format pooler ke `DATABASE_URL`
4. Salin **Connection string (URI)** format session/direct ke `DIRECT_URL`

### Setup Database

```bash
# Push schema ke database (development)
npx prisma db push

# Atau gunakan migration (production-ready)
npx prisma migrate dev --name init

# Buka Prisma Studio untuk melihat data di browser
npx prisma studio
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

#### Script yang Tersedia

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| `dev` | `npm run dev` | Jalankan development server dengan hot reload |
| `build` | `npm run build` | Generate Prisma Client + build production bundle |
| `start` | `npm run start` | Jalankan production server |
| `lint` | `npm run lint` | Jalankan ESLint untuk cek kualitas kode |
| `postinstall` | *(otomatis)* | Generate Prisma Client setelah `npm install` |

---

## 🗄️ Skema Database

Aplikasi menggunakan 5 model utama:

```
┌──────────────┐     ┌──────────────┐
│    Student    │     │  Candidate   │
│──────────────│     │──────────────│
│ id (PK)      │     │ id (PK)      │
│ nim (UNIQUE) │     │ candidateNo  │
│ password     │     │ name         │
│ generation   │     │ photoUrl     │
│ isActive     │     │ cvUrl        │
│ isVoted      │     │ grandDesign  │
│ votedAt      │     │ vision       │
│ createdAt    │     │ missions[]   │
│ updatedAt    │     │ innovations[]│
└──────┬───────┘     │ createdAt    │
       │             │ updatedAt    │
       │             └──────┬───────┘
       │                    │
       │    ┌───────────┐   │
       └───►│   Vote    │◄──┘
            │───────────│
            │ id (PK)   │
            │ studentId │  (UNIQUE, FK → Student)
            │ candidateId│  (FK → Candidate)
            │ createdAt │
            └───────────┘

┌──────────────┐     ┌────────────────┐
│    Admin     │     │ TimelineEvent  │
│──────────────│     │────────────────│
│ id (PK)      │     │ id (PK)        │
│ email (UNQ)  │     │ eventName      │
│ passwordHash │     │ displayDate    │
│ resetToken   │     │ sortOrder      │
│ resetExpiry  │     │ isVotingEvent  │
│ createdAt    │     │ createdAt      │
│ updatedAt    │     │ updatedAt      │
└──────────────┘     └────────────────┘

┌──────────────┐
│ LandingInfo  │
│──────────────│
│ id (PK)      │
│ title        │
│ year         │
│ about        │
│ address      │
│ instagramUrl │
│ logoWarnaUrl │
│ logoPutihUrl │
│ createdAt    │
│ updatedAt    │
└──────────────┘
```

### Relasi Utama
- **Student ↔ Vote**: One-to-One — Setiap student hanya bisa memiliki satu vote (dijamin oleh `@unique` pada `studentId`)
- **Candidate ↔ Vote**: One-to-Many — Setiap kandidat bisa menerima banyak vote
- **Cascade Delete**: Menghapus Student atau Candidate akan otomatis menghapus Vote terkait

---

## 📁 Struktur Folder

```
pemira-himasta-v2/
├── prisma/
│   └── schema.prisma          # Definisi skema database
├── public/
│   ├── candidate/             # Aset kandidat (foto, dll)
│   ├── fonts/                 # Font lokal (Avenue, Futura)
│   ├── landing/               # Aset landing page
│   └── ui/                    # Aset UI umum
├── src/
│   ├── app/
│   │   ├── actions/           # Server Actions (business logic)
│   │   │   ├── adminAuth.ts       # Login/logout admin
│   │   │   ├── adminManagement.ts # CRUD admin, invite, change password
│   │   │   ├── auth.ts            # Login/logout mahasiswa
│   │   │   ├── candidateAdmin.ts  # CRUD kandidat
│   │   │   ├── landingAdmin.ts    # Update landing info & timeline
│   │   │   ├── passwordReset.ts   # Forgot & reset password
│   │   │   ├── vote.ts            # Submit voting
│   │   │   └── voterAdmin.ts      # CRUD voter, import CSV, toggle status
│   │   ├── admin/
│   │   │   ├── (dashboard)/       # Route group: protected admin pages
│   │   │   │   ├── admins/        # Halaman manajemen admin
│   │   │   │   ├── candidates/    # Halaman manajemen kandidat
│   │   │   │   ├── landing/       # Halaman pengaturan landing
│   │   │   │   ├── results/       # Halaman hasil pemilihan
│   │   │   │   ├── settings/      # Halaman pengaturan (ganti password)
│   │   │   │   ├── voters/        # Halaman manajemen voter
│   │   │   │   ├── layout.tsx     # Layout admin (sidebar)
│   │   │   │   └── page.tsx       # Dashboard utama
│   │   │   ├── forgot-password/   # Halaman lupa password
│   │   │   ├── login/             # Halaman login admin
│   │   │   └── reset-password/    # Halaman reset password
│   │   ├── candidate/
│   │   │   └── [id]/             # Halaman detail kandidat (dynamic route)
│   │   ├── login/                # Halaman login mahasiswa
│   │   ├── voting/               # Halaman voting mahasiswa
│   │   ├── response/             # Halaman konfirmasi setelah voting
│   │   ├── globals.css           # Global stylesheet
│   │   ├── layout.tsx            # Root layout (fonts, metadata, SEO)
│   │   ├── page.tsx              # Landing page (homepage)
│   │   ├── robots.ts             # SEO: robots.txt generator
│   │   └── sitemap.ts            # SEO: sitemap.xml generator
│   ├── components/
│   │   ├── admin/                # Komponen admin (AppSidebar)
│   │   ├── Candidate/            # Komponen halaman detail kandidat
│   │   ├── Landing/              # Komponen landing page
│   │   ├── login/                # Komponen login
│   │   ├── submitted/            # Komponen halaman konfirmasi voting
│   │   ├── ui/                   # Komponen UI reusable (shadcn/ui)
│   │   └── Voting/               # Komponen halaman voting
│   ├── hooks/
│   │   └── use-mobile.ts        # Hook deteksi perangkat mobile
│   ├── lib/
│   │   ├── mail.ts              # Konfigurasi Nodemailer & template email
│   │   ├── prisma.ts            # Singleton Prisma Client
│   │   └── utils.ts             # Utility functions (cn, dll)
│   └── middleware.ts            # Route protection (auth guard)
├── .env.example                 # Template environment variables
├── .gitignore                   # File yang diabaikan Git
├── components.json              # Konfigurasi shadcn/ui
├── next.config.ts               # Konfigurasi Next.js
├── package.json                 # Dependensi & scripts
├── postcss.config.mjs           # Konfigurasi PostCSS
└── tsconfig.json                # Konfigurasi TypeScript
```

---

## ⚡ API & Server Actions

Aplikasi ini menggunakan **Next.js Server Actions** (`"use server"`) sebagai pengganti REST API tradisional. Semua business logic berjalan di sisi server.

### Autentikasi Mahasiswa (`auth.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `loginStudent` | `username`, `password` | Login dengan NIM, cek status aktif & belum voting |
| `logoutStudent` | — | Hapus cookie session mahasiswa |

### Autentikasi Admin (`adminAuth.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `loginAdmin` | `email`, `password` | Login admin dengan bcrypt verification. Auto-seed admin default jika belum ada |
| `logoutAdmin` | — | Hapus cookie session admin & redirect ke login |

### Voting (`vote.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `submitVote` | `candidateId` | Submit vote dengan validasi & transaksi atomik |

### Manajemen Voter (`voterAdmin.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `addVoter` | `{ nim, password?, generation }` | Tambah voter. Password auto-generate jika kosong |
| `deleteVoter` | `id` | Hapus voter |
| `resetVoterStatus` | `id` | Reset status voting (hapus vote & set `isVoted=false`) |
| `importVotersCsv` | `voters[]` | Import voter massal dari data CSV |
| `toggleVoterStatus` | `id`, `isActive` | Aktifkan/nonaktifkan voter individu |
| `toggleVotersByGeneration` | `generation`, `isActive` | Aktifkan/nonaktifkan voter per angkatan |

### Manajemen Kandidat (`candidateAdmin.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `addCandidate` | `data` | Tambah kandidat baru |
| `updateCandidate` | `id`, `data` | Update data kandidat |
| `deleteCandidate` | `id` | Hapus kandidat |

### Pengaturan Landing Page (`landingAdmin.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `updateLandingInfo` | `data` | Update/create info landing page |
| `addTimelineEvent` | `data` | Tambah event timeline |
| `deleteTimelineEvent` | `id` | Hapus event timeline |

### Manajemen Admin (`adminManagement.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `getAdmins` | — | Ambil daftar semua admin beserta status |
| `inviteAdmin` | `email` | Undang admin baru via email |
| `deleteAdmin` | `id` | Hapus admin (tidak bisa menghapus diri sendiri) |
| `changePassword` | `oldPassword`, `newPassword` | Ganti password admin |

### Password Reset (`passwordReset.ts`)

| Action | Parameter | Deskripsi |
|--------|-----------|-----------|
| `forgotPassword` | `email` | Kirim email reset password (aman dari enumerasi) |
| `resetPassword` | `token`, `password` | Reset password dengan token (berlaku 1 jam) |

---

## 🔐 Autentikasi & Middleware

### Mekanisme Autentikasi

Aplikasi menggunakan **cookie-based session** tanpa library autentikasi eksternal:

| Aspek | Admin | Mahasiswa |
|-------|-------|-----------|
| **Cookie Name** | `admin_session` | `student_session` |
| **Cookie Value** | Admin UUID | Student UUID |
| **Max Age** | 24 jam | 2 jam |
| **HttpOnly** | ✅ | ✅ |
| **Secure (prod)** | ✅ | ✅ |
| **Password** | Hashed (bcrypt) | Plain text (diberikan panitia) |

### Middleware Route Protection

Middleware (`src/middleware.ts`) melindungi route sensitif:

```
/admin/*         → Redirect ke /admin/login jika tidak ada admin_session
                   (kecuali: /admin/login, /admin/forgot-password, /admin/reset-password)

/admin/login     → Redirect ke /admin jika sudah login (admin_session ada)

/voting/*        → Redirect ke /login jika tidak ada student_session
/response/*      → Redirect ke /login jika tidak ada student_session
```

---

## 🚀 Deployment

### Deploy ke Netlify

1. Push kode ke GitHub
2. Login ke [Netlify](https://netlify.com/) dan hubungkan repository
3. Atur build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Tambahkan **Environment Variables** di Netlify:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `NEXT_PUBLIC_APP_URL` (URL production Anda, contoh: `https://pemira-himasta.netlify.app`)
5. Deploy!

### Deploy ke Vercel

1. Push kode ke GitHub
2. Import project di [Vercel](https://vercel.com/)
3. Tambahkan Environment Variables yang sama
4. Deploy otomatis setiap kali push ke branch utama

### Production Checklist

- [ ] Ganti password default admin (`admin@example.com` / `password123`)
- [ ] Atur `NEXT_PUBLIC_APP_URL` ke URL production
- [ ] Pastikan `DATABASE_URL` menggunakan connection pooler
- [ ] Konfigurasi SMTP yang benar untuk pengiriman email
- [ ] Jalankan `npx prisma db push` atau `npx prisma migrate deploy` di production
- [ ] Test alur voting end-to-end sebelum hari-H
- [ ] Aktifkan voter yang berhak memilih

---

## 🔧 Troubleshooting

### Error: `PrismaClientInitializationError`
**Penyebab:** Koneksi database gagal.
**Solusi:**
1. Pastikan `DATABASE_URL` dan `DIRECT_URL` di `.env` sudah benar
2. Pastikan database PostgreSQL bisa diakses
3. Jalankan `npx prisma db push` ulang

### Error: Halaman admin redirect terus ke login
**Penyebab:** Cookie session tidak di-set atau sudah expired.
**Solusi:**
1. Hapus cookie browser dan login ulang
2. Pastikan admin sudah ada di database (`npx prisma studio` untuk cek)

### Email undangan / reset password tidak terkirim
**Penyebab:** Konfigurasi SMTP salah.
**Solusi:**
1. Pastikan `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` sudah benar
2. Untuk Gmail, gunakan **App Password** (bukan password akun biasa)
3. Pastikan **2-Step Verification** aktif di akun Google

### Error saat import CSV
**Penyebab:** Format CSV tidak sesuai.
**Solusi:**
- Pastikan format file: `nim,angkatan` (contoh: `12345678,2023`)
- Angkatan harus berupa 4 digit angka (tahun)
- NIM harus unik dan belum terdaftar

### Voter tidak bisa login
**Penyebab:** Akun belum diaktifkan atau sudah voting.
**Solusi:**
1. Cek status voter di admin panel (`/admin/voters`)
2. Pastikan status **isActive** = `true`
3. Jika voter sudah voting, status tidak bisa digunakan untuk login ulang

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. **Fork** repository ini
2. Buat branch baru:
   ```bash
   git checkout -b feature/nama-fitur
   ```
3. Lakukan perubahan dan commit:
   ```bash
   git commit -m "feat: deskripsi perubahan"
   ```
4. Push ke branch:
   ```bash
   git push origin feature/nama-fitur
   ```
5. Buat **Pull Request** ke branch `main`

### Konvensi Commit

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Penggunaan |
|--------|------------|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Perubahan dokumentasi |
| `style:` | Perubahan styling (tanpa mengubah logika) |
| `refactor:` | Refactoring kode |
| `chore:` | Maintenance & konfigurasi |

---

## 📄 Lisensi

Proyek ini bersifat **private** dan dikembangkan untuk kepentingan internal **HIMASTA UGM**.

---

<div align="center">

Dikembangkan dengan ❤️ oleh **HIMASTA UGM**

[🌐 Website](https://pemira-himasta.netlify.app) · [📸 Instagram](https://instagram.com/himasta_ugm)

</div>
