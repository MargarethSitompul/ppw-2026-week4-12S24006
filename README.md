# 🌐 Portofolio Digital & Web Service Dinamis — Margareth Bungaran Sitompul

[![Aksesibilitas WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Bootstrap 5](https://img.shields.io/badge/Framework-Bootstrap_5.3.2-purple)](https://getbootstrap.com/)
[![JavaScript ES6+](https://img.shields.io/badge/Language-JavaScript_ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Status Proyek](https://img.shields.io/badge/Status-Week_4_Refactored-blue)]()

Website portofolio pribadi responsif dan interaktif yang dibangun dengan standar aksesibilitas web (**WCAG 2.2 AA**), arsitektur *Separation of Concerns* (SoC), serta integrasi **Fetch API (Async/Await)** untuk pemuatan data secara dinamis dari penyimpan data lokal berseri JSON.

---

## 👤 Informasi Mahasiswa & Submisi

* **Nama Lengkap:** Margareth Bungaran Sitompul
* **NIM:** 12S24006
* **Program Studi:** D4/S1 Sistem Informasi (CIS)
* **Institusi:** Institut Teknologi Del, Laguboti, Balige, Sumatera Utara
* **Mata Kuliah:** Pengembangan Pemrograman Web (PPW) — Tugas Minggu 4
* **Nama Repositori:** `ppw-2026-week4-12S24006`

---

## 🚀 Pembaruan & Fitur Utama (Week 4 Update)

Pada iterasi Minggu ke-4 ini, proyek mengalami perombakan arsitektur dari halaman statis murni menjadi **Aplikasi Web Asinkron berbasis Data Services**:

### 1. 🔄 Arsitektur Data Dinamis (Fetch API & Async/Await)
* **`data/profile.json`**: Menyimpan identitas akademis, bio, status, dan informasi kontak secara terpisah.
* **`data/projects.json`**: Menyimpan daftar portofolio karya web, tag *tech stack*, serta tautan gambar.
* **`data/services.json`**: Menyimpan daftar paket layanan konsultasi yang ditawarkan beserta rincian biaya.

### 2. ⚡ Pengelolaan 4 Status Antarmuka UI (UI States Handling)
Pengalaman pengguna (*User Experience*) dioptimalkan dengan mengelola 4 kondisi UI secara eksplisit pada komponen portofolio proyek:
* **Loading State**: Menampilkan *spinner* animasi Bootstrap saat data sedang diambil dari server/JSON.
* **Success State**: Memetakan (*render*) kartu-kartu proyek secara otomatis ke dalam grid CSS modern.
* **Empty State**: Menampilkan pesan *alert* informatif jika berkas JSON tidak memuat data proyek.
* **Error State**: Menangkap kegagalan jaringan/HTTP dan menampilkan pesan penanganan kesalahan yang ramah pengguna.

### 3. 🛡️ Keamanan & Integrasi Modal Universal
* **Pencegahan DOM XSS**: Seluruh teks dinamis diinjeksi menggunakan `textContent` dan pembuatan elemen DOM native untuk mencegah eksekusi skrip berbahaya (*Cross-Site Scripting*).
* **Universal Bootstrap Modal**: Menampilkan detail lengkap proyek (deskripsi, gambar HD, dan tag) tanpa perlu membuat modal berulang.

### 4. 📬 Formulir Asinkron & Storage Lokal
* Penanganan formulir layanan secara asinkron tanpa *full page reload* (`e.preventDefault()`).
* Pengisian otomatis (*auto-populate*) *dropdown* layanan berdasarkan berkas `services.json`.
* Pemrosesan pesanan disimpan ke dalam **Browser LocalStorage** (`margareth_orders`).
* Umpan balik langsung menggunakan **Bootstrap Toast Notification**.

---

## 📁 Struktur Direktori Repositori

Struktur folder dan berkas proyek disusun secara rapi dan modular:

```text
ppw-2026-week4-12S24006/
├── asset/                            # Media & Dokumen Pendukung
│   ├── ambassador privy.jpeg         # Dokumentasi Privy Campus Ambassador
│   ├── ambassador.jpeg               # Dokumentasi Duta Kampus
│   ├── Background.mp4                # Video Latar Belakang Hero Section
│   ├── bem.jpeg                      # Dokumentasi Kepengurusan BEM IT Del
│   ├── depsenbud.jpeg                # Dokumentasi Divisi Depsenbud
│   ├── GEMASTIK.png                  # Bukti Conference Paper GEMASTIK
│   ├── GUARD.jpeg                    # Preview Poster Integrity-Guard
│   ├── jurnal .png                   # Preview Jurnal SIMASII
│   ├── Jurnal_SIMASII_Margareth.pdf  # Berkas PDF Publikasi SINTA 5
│   ├── mc.jpeg                       # Dokumentasi Master of Ceremony
│   ├── pas foto_margareth.jpeg       # Foto Profil Utama
│   ├── psm.jpeg                      # Dokumentasi Paduan Suara Mahasiswa
│   ├── RSUD.png                      # Dokumentasi Magang RSUD Sibolga
│   └── tobaverse.png                 # Tangkapan Layar Proyek TobaVerse
├── data/                             # Data Store Terstruktur (JSON)
│   ├── profile.json                  # Data Diri, Profil & Kontak
│   ├── projects.json                 # Data Portofolio Proyek Dinamis
│   └── services.json                 # Data Paket Layanan Konsultasi
├── js/                               # Logic Layer (JavaScript ES6)
│   ├── api-service.js                # Layer Pengambilan Data (Fetch API)
│   └── app.js                        # Controller Utama, UI Renderer & Event Form
├── desktop.ini                       # Berkas Sistem Konfigurasi Lokal
├── index.html                        # Dokumen HTML5 Utama (Semantic & Accessible)
├── README.md                         # Dokumentasi Resmi Proyek
└── style.css                         # Stylesheet Kustom & Responsive Layout

