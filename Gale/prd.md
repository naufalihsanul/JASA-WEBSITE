Berikut **Project Document (PD)** lengkap untuk website GALE Desain Konstruksi:

---

# PROJECT DOCUMENT (PD)
## GALE Desain Konstruksi | Landing Page Website
**Versi:** 1.0 | **Tanggal:** 8 April 2026 | **Status:** Ready for Development

---

## 1. INFORMASI PROYEK

| Field | Detail |
|---|---|
| Nama Website | GALE Desain Konstruksi |
| Tagline | Arsitek & Kontraktor Profesional di Mataram |
| Jenis | Landing Page (Single Page Application) |
| Teknologi | HTML, Tailwind CSS, JavaScript |
| UI Library | Aceternity UI |
| Status | Siap Pengembangan |

**Deskripsi Proyek:**
GALE Desain Konstruksi adalah biro arsitektur dan jasa konstruksi terpercaya di Kota Mataram, Nusa Tenggara Barat. Dengan fokus pada desain modern, fungsionalitas, dan kualitas bangunan yang presisi, kami siap membantu mewujudkan hunian impian, ruko, hingga proyek komersial mulai dari perencanaan hingga serah terima kunci.

---

## 2. TARGET AUDIENS

- Keluarga muda dan calon pemilik rumah
- Pengusaha properti dan investor villa di Lombok
- Pemilik ruko dan pelaku bisnis
- Masyarakat Mataram & NTB yang ingin membangun/renovasi
- Pencinta desain arsitektur modern minimalis

---

## 3. TEKNOLOGI & STACK

**Frontend:**
- HTML5 (semantik, terstruktur)
- Tailwind CSS (via CDN atau build)
- JavaScript (Vanilla JS / ES6+)
- Aceternity UI (komponen animasi & efek visual)

**Font (Google Fonts):**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Jost:ital,wght@0,100..900;1,100..900&family=Radley:ital@0;1&display=swap" rel="stylesheet">
```
- **Heading:** Cormorant Garamond
- **Body / UI:** Jost
- **Aksen:** Radley

**Eksternal:**
- Google Maps Embed API
- WhatsApp API (floating button)
- Placehold.co / Unsplash (placeholder images)

---

## 4. DESAIN SISTEM

### 4.1 Gaya Desain
- Modern & Minimalis
- Glassmorphism (backdrop-blur, frosted glass effect, semi-transparent cards)

### 4.2 Palet Warna

| Nama | HEX | Penggunaan |
|---|---|---|
| Primary White | #FFFFFF / #F8F9FA | Background utama, card |
| Secondary Blue | #4A90D9 | CTA, aksen, highlight |
| Blue Light | #EBF4FF | Background section alternatif |
| Blue Deep | #1E3A5F | Heading, footer background |
| Glass White | rgba(255,255,255,0.15) | Glassmorphism cards |
| Text Dark | #1A1A2E | Body text utama |
| Text Muted | #6B7280 | Subtext, caption |

### 4.3 Typography Scale

| Elemen | Font | Weight | Size |
|---|---|---|---|
| H1 Hero | Cormorant Garamond | 700 | 64–80px |
| H2 Section | Cormorant Garamond | 600 | 40–52px |
| H3 Card | Cormorant Garamond | 500 | 24–32px |
| Body | Jost | 400 | 16–18px |
| Caption | Jost | 300 | 13–14px |
| Aksen | Radley | 400 | sesuai kebutuhan |

### 4.4 Spacing System
Menggunakan Tailwind spacing scale (4px base unit): `p-4`, `p-8`, `p-16`, `gap-6`, `my-12`, `section py-20`, dll.

---

## 5. STRUKTUR SECTION

### Section 1 — Navbar / Navigation Bar
- **Posisi:** Fixed/sticky di atas
- **Konten:** Logo GALE, menu navigasi (Beranda, Tentang, Layanan, Portofolio, Harga, Tim, Kontak), CTA button "Konsultasi Gratis"
- **Efek:** Glassmorphism saat scroll, smooth scroll ke anchor
- **Mobile:** Hamburger menu dengan dropdown animasi

### Section 2 — Hero Section
- **Layout:** Full-viewport height, background parallax (foto proyek/bangunan premium)
- **Konten:** Headline besar (H1), subheadline, 2 CTA button (Lihat Portofolio & Hubungi Kami)
- **Efek:** Fade-in animasi, overlay gradient biru, Aceternity UI animated background (particles / beam)
- **Elemen tambahan:** Badge "Terpercaya sejak [tahun]", statistik singkat (proyek selesai, klien puas, dll.)

### Section 3 — Partner / Client Logos (Marquee)
- **Layout:** Horizontal scrolling marquee tanpa henti
- **Konten:** Logo-logo klien/partner (placeholder)
- **Efek:** Auto-scroll kiri-kanan, hover pause

### Section 4 — About Us / Tentang Kami
- **Layout:** 2 kolom (teks kiri, gambar kanan) dengan glassmorphism card
- **Konten:** Narasi singkat perusahaan, visi & misi, nilai utama, statistik (angka proyek, pengalaman tahun, tim arsitek)
- **Efek:** Scroll fade-in, counter animasi angka

### Section 5 — Services / Layanan
- **Layout:** Grid 3 kolom (desktop), 1 kolom (mobile)
- **Konten:** Icon + judul + deskripsi singkat per layanan
- **Layanan yang ditampilkan:**
  1. Desain Arsitektur
  2. Konstruksi Bangunan
  3. Renovasi & Retrofit
  4. Desain Interior
  5. Konsultasi Proyek
  6. Manajemen Konstruksi
- **Efek:** Hover glassmorphism card lift, slide-up animasi

### Section 6 — Portfolio / Gallery Proyek
- **Layout:** Masonry/grid layout, filter kategori (Rumah Tinggal, Ruko, Villa, Komersial)
- **Konten:** Thumbnail proyek dengan nama, lokasi, tahun
- **Efek:** Lightbox gallery saat diklik, hover overlay dengan detail proyek, scroll reveal

### Section 7 — Testimonial / Review
- **Layout:** Carousel/slider dengan auto-play
- **Konten:** Foto klien, nama, jabatan/kota, bintang rating, kutipan review
- **Efek:** Glassmorphism card, fade transition antar slide

### Section 8 — Pricing / Paket Harga
- **Layout:** 3 card compare (Basic, Standard, Premium), dengan highlight card tengah
- **Konten:** Nama paket, harga mulai dari, daftar fitur, CTA button
- **Efek:** Hover scale, glassmorphism card, badge "Terpopuler" di paket tengah

### Section 9 — Team / Tim Kami
- **Layout:** Grid 4 kolom (desktop), 2 kolom (mobile)
- **Konten:** Foto, nama, jabatan, ikon sosial media
- **Efek:** Hover flip card atau overlay glassmorphism

### Section 10 — FAQ / Pertanyaan Umum
- **Layout:** Accordion list
- **Konten:** 8–10 pertanyaan umum seputar layanan, proses, harga, dan proyek
- **Efek:** Smooth expand/collapse animasi, ikon plus/minus

### Section 11 — CTA Section (Terpisah)
- **Layout:** Full-width banner dengan background gradient biru
- **Konten:** Teks ajakan kuat, sub-teks, 2 tombol CTA (WhatsApp & Formulir)
- **Efek:** Parallax background, Aceternity spotlight effect

### Section 12 — Newsletter / Subscribe
- **Layout:** Centered, minimalis
- **Konten:** Judul, deskripsi singkat, input email, tombol subscribe
- **Efek:** Glassmorphism card, hover animasi tombol

### Section 13 — Contact Form / Formulir Kontak
- **Layout:** 2 kolom (form kiri, info kontak kanan)
- **Konten form:** Nama, Email, No. HP, Jenis Layanan (dropdown), Pesan, tombol Kirim
- **Info kontak:** Alamat, telepon, email, jam operasional
- **Efek:** Focus animation input, submit button loading state

### Section 14 — Google Maps
- **Layout:** Full-width embed peta lokasi kantor GALE di Mataram
- **Konten:** Google Maps iframe embed

### Section 15 — Footer
- **Layout:** 4 kolom (Logo & deskripsi, Navigasi, Layanan, Kontak & Sosmed)
- **Konten:** Logo, tagline, link navigasi, link layanan, alamat, ikon sosial media, copyright
- **Efek:** Hover link underline animasi, ikon sosmed hover color

---

## 6. FITUR TEKNIS

| Fitur | Deskripsi | Prioritas |
|---|---|---|
| Responsive Design | Mobile-first, breakpoint sm/md/lg/xl Tailwind | Wajib |
| Scroll Animation | Intersection Observer API — fade-in, slide-up | Wajib |
| Parallax Effect | CSS / JS parallax pada Hero & CTA section | Wajib |
| Lightbox Gallery | Fslightbox atau custom JS | Wajib |
| Loading Screen | Preloader animasi logo GALE sebelum konten tampil | Wajib |
| WhatsApp Float | Tombol WA fixed kanan-bawah dengan tooltip | Wajib |
| Sticky Navbar | Glassmorphism navbar saat scroll | Wajib |
| Counter Animasi | Angka statistik count-up saat masuk viewport | Opsional |
| Portfolio Filter | Filter kategori proyek (isotope/vanilla JS) | Wajib |
| Form Validation | Validasi client-side sebelum submit | Wajib |
| SEO Meta Tags | Title, description, OG tags, structured data JSON-LD | Wajib |
| Smooth Scroll | Scroll mulus ke setiap section | Wajib |

---

## 7. SEO & META

```html
<!-- Primary Meta -->
<title>GALE Desain Konstruksi | Arsitek & Kontraktor Profesional di Mataram</title>
<meta name="description" content="Biro arsitektur dan jasa konstruksi terpercaya di Mataram NTB. Desain rumah modern, ruko, villa, dan proyek komersial. Konsultasi gratis!">
<meta name="keywords" content="arsitek mataram, kontraktor NTB, desain rumah lombok, jasa konstruksi mataram, renovasi rumah NTB">

<!-- Open Graph -->
<meta property="og:title" content="GALE Desain Konstruksi | Arsitek & Kontraktor Profesional di Mataram">
<meta property="og:description" content="Wujudkan hunian impian bersama GALE. Layanan arsitektur & konstruksi profesional di Mataram, NTB.">
<meta property="og:image" content="[URL_thumbnail_OG]">
<meta property="og:type" content="website">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ArchitectOrDesigner",
  "name": "GALE Desain Konstruksi",
  "address": { "@type": "PostalAddress", "addressLocality": "Mataram", "addressRegion": "NTB" },
  "telephone": "[nomor telepon]",
  "url": "[URL website]"
}
</script>
```

---

## 8. ASET YANG DIBUTUHKAN

**Dari Klien (GALE):**
- Logo GALE (PNG/SVG, transparan)
- Foto proyek portofolio (min. 12 foto)
- Foto tim (background netral)
- Logo partner/klien
- Data nyata: alamat, nomor WA, email, sosmed
- Teks resmi: narasi about, layanan, FAQ

**Placeholder Sementara:**
- Gambar: `https://placehold.co/` atau Unsplash (arsitektur, interior, bangunan)
- Ikon: Heroicons, Lucide, atau Font Awesome

---

## 9. DELIVERABLE

- [ ] 1 file `index.html` lengkap semua section
- [ ] Inline / embedded CSS (Tailwind + custom CSS)
- [ ] Inline / embedded JavaScript
- [ ] Semua animasi dan fitur berfungsi
- [ ] Responsif di mobile, tablet, desktop
- [ ] SEO tags terpasang
- [ ] Dokumentasi komentar kode
- [ ] Preview screenshot (opsional)

---

## 10. CATATAN DEVELOPER

1. Gunakan **Aceternity UI** untuk efek spotlight, beam, card hover, dan animated background di Hero & CTA
2. **Glassmorphism** diterapkan konsisten: `backdrop-blur-md`, `bg-white/10`, `border border-white/20`, `rounded-2xl`
3. Semua animasi harus ringan dan tidak mengorbankan performa (gunakan `will-change` seperlunya)
4. Pastikan **aksesibilitas dasar**: alt text gambar, label form, kontras warna minimal 4.5:1
5. **WhatsApp button** default nomor: isi dengan nomor aktif GALE sebelum go-live
6. **Google Maps** gunakan embed iframe standar, bukan API key berbayar
7. Kode harus **single file** (semua dalam `index.html`) kecuali diminta modular

---

*Dokumen ini dibuat sebagai panduan pengembangan. Segala perubahan spesifikasi harus dikomunikasikan sebelum implementasi dimulai.*