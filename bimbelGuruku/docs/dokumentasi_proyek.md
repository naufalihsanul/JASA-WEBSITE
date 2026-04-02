# Dokumentasi Proyek TK Purnama

---

## BAGIAN 1: ARSITEKTUR PROYEK

### Struktur File Utama

| File/Folder | Fungsi |
|---|---|
| `index.php` | Halaman utama website (frontend publik) |
| `db.sql` | Skema database (tabel-tabel) |
| `includes/db.php` | Koneksi ke database |
| `purnama-panel-x7k/` | Semua file admin panel |
| `assets/` | Gambar, foto guru, galeri |

### Alur Data Sederhana

```
Admin edit di panel → Data tersimpan ke Database → index.php baca Database → Tampil ke pengunjung
```

---

## BAGIAN 2: CARA KERJA ADMIN PANEL (DETAIL)

### 2.1 Login Admin
- **File:** `purnama-panel-x7k/login.php`
- Admin isi form → klik Submit → browser kirim data ke server via **POST**
- PHP baca: `$_POST['username']` dan `$_POST['password']`
- Cari user di database berdasarkan username
- Cek password: `password_verify($input, $hash_di_db)` — tidak disimpan plain text
- Jika cocok → simpan ke **Session**: `$_SESSION['admin_logged_in'] = true`
- Session = "ingatan sementara server" bahwa user ini sudah login
- Redirect ke `index.php` admin

### 2.2 Session & Keamanan
- **File:** `purnama-panel-x7k/includes/header.php` — diinclude di SEMUA halaman admin
- Setiap halaman admin dimulai dengan cek: apakah session ada?
  - Tidak ada → langsung redirect ke `login.php` (tidak bisa akses)
  - Ada → boleh lanjut
- Ada timer: jika tidak ada aktivitas **5 menit** → session dihapus → otomatis logout
- Setiap admin buka halaman, waktu aktivitas di-reset

### 2.3 `$_GET` vs `$_POST` — Dua Cara Kirim Data

| | `$_GET` | `$_POST` |
|---|---|---|
| **Cara kirim** | Lewat URL (`?action=edit&id=3`) | Lewat body form (tersembunyi) |
| **Terlihat?** | Ya, di URL | Tidak |
| **Dipakai untuk** | Navigasi, pilih action | Submit form, simpan data |
| **Contoh** | `$_GET['action']` baca dari URL | `$_POST['name']` baca dari form |

### 2.4 Cara Kerja `?action=` (Query String)
URL seperti `guru.php?action=edit&id=5` bukan halaman berbeda — **file-nya tetap satu** (`guru.php`), tapi PHP membaca parameternya:
```php
$action = $_GET['action'] ?? 'list'; // kalau kosong → 'list'
$id     = $_GET['id']     ?? null;
```
Lalu PHP putuskan tampilan mana yang muncul:
- `'list'` → tampilkan tabel daftar guru
- `'add'`  → tampilkan form kosong untuk tambah
- `'edit'` → tampilkan form yang sudah diisi data guru ID tersebut
- `'delete'` → langsung hapus dari DB, redirect balik

Ini disebut pola **Single File Controller** — satu file, banyak tampilan.

### 2.5 Alur Submit Form (Tambah/Edit Data)
Contoh saat admin tambah guru baru:
1. Admin buka `guru.php?action=add` → muncul form kosong
2. Admin isi nama, jabatan, pilih foto → klik "Tambah Guru"
3. Browser kirim semua data via **POST** ke `guru.php` (action form = `""`)
4. PHP cek: `if ($_SERVER['REQUEST_METHOD'] === 'POST')` → berarti ada form yang disubmit
5. PHP ambil data: `$name = $_POST['name']`, dst.
6. Kalau ada foto: handle upload, buat nama file unik, pindahkan ke `assets/guru/`
7. Simpan ke database
8. Reset `$action = 'list'` → tampilkan daftar lagi + pesan sukses

### 2.6 Kenapa Ada `isset($_POST['add'])` dan `isset($_POST['edit'])`?
Karena form tambah dan edit dikirim ke file yang sama. PHP perlu tahu: ini mau tambah atau edit?
- Form tambah: ada tombol `<button name="add">` → `$_POST['add']` ada
- Form edit: ada tombol `<button name="edit">` → `$_POST['edit']` ada
- PHP cek dengan `isset()` untuk bedakan keduanya

### 2.7 Alur Delete (Hapus Data)
- Admin klik tombol hapus → link: `?action=delete&id=5`
- Sebelumnya ada `onclick="return confirm('Yakin?')"` — popup konfirmasi dulu
- Kalau OK → buka URL itu → PHP baca `$action === 'delete'` dan `$id = 5`
- Langsung eksekusi DELETE ke database
- Setelah hapus: `header('Location: guru.php?deleted=1')` — redirect, bawa pesan sukses di URL
- Halaman baru cek `isset($_GET['deleted'])` → tampilkan notifikasi hijau

### 2.8 `header.php` dan `footer.php` — Shared Layout
- Setiap halaman admin diawali: `require_once 'includes/header.php'`
- Setiap halaman admin diakhiri: `require_once 'includes/footer.php'`
- **header.php** berisi: cek session, HTML head, sidebar, navbar atas
- **footer.php** berisi: tutup tag HTML, script JS untuk sidebar mobile
- Dengan cara ini, semua halaman admin punya tampilan yang konsisten tanpa copy-paste kode sidebar

---

## BAGIAN 3: MAPPING ADMIN → FRONTEND (index.php) + DI BALIK LAYAR

### Konsep Penting: Bagaimana Perubahan Admin Muncul di Website?

Website ini **tidak statis** — setiap kali pengunjung buka `index.php`, PHP langsung query ke database saat itu juga. Jadi perubahan admin **langsung terlihat** tanpa perlu rebuild atau deploy ulang.

```
Admin simpan data → Database diupdate → Pengunjung refresh → index.php query ulang → Tampil yang baru
```

---

### 3.1 Hero & PPDB — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/hero.php`
- **Tabel:** `settings`
- **Di balik layar:**
  - Admin isi form judul, badge, deskripsi, lalu klik Simpan
  - PHP loop semua field POST, tiap field disimpan dengan query: `INSERT INTO settings ... ON DUPLICATE KEY UPDATE`
  - Artinya: jika key `hero_title_line1` sudah ada di tabel → **update**, kalau belum → **insert baru**
  - Upload background: file dipindah ke `assets/images/hero-bg-xxx.jpg`, pathnya disimpan ke settings
- **Di index.php:**
  - Fungsi `s('hero_title_line1')` dipanggil → cari di array settings yang sudah diload → tampil
  - Kalau tidak ada di database → pakai **nilai default** yang sudah ditulis di kode
- **Tampak di halaman:** Teks judul besar di atas (`#hero`) dan kartu info PPDB (`#ppdb`)

---

### 3.2 Guru / Tenaga Pengajar — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/guru.php`
- **Tabel:** `teachers` (kolom: id, name, role, photo, is_featured, created_at)
- **Di balik layar:**
  - Tambah guru: INSERT ke tabel `teachers`
  - Edit guru: UPDATE berdasarkan `id`
  - Hapus: DELETE berdasarkan `id`
  - Upload foto: file disimpan ke `assets/guru/`, nama file dibuat unik pakai `time()` + nama guru
  - `is_featured = 1` artinya guru ini adalah **Kepala Sekolah** → tampil paling atas
- **Di index.php:**
  - Query: `SELECT * FROM teachers ORDER BY is_featured DESC` → Kepala Sekolah otomatis di atas
  - Loop semua guru → tampilkan kartu foto + nama + jabatan
- **Tampak di halaman:** Section "Tim Pengajar" dengan kartu foto guru

---

### 3.3 Galeri — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/gallery.php`
- **Tabel:** `gallery` (kolom: id, title, image_path, aspect_ratio, created_at)
- **Di balik layar:**
  - Upload foto → simpan ke `assets/galeri/` → path masuk kolom `image_path`
  - `aspect_ratio` disimpan sebagai string: `'4/5'`, `'1/1'`, `'16/9'`, dll.
  - Ini dipakai CSS di frontend untuk menentukan **bentuk kotak** foto (portrait/landscape/square)
- **Di index.php:**
  - Query semua foto dari tabel `gallery`
  - Setiap foto dibungkus div dengan `style="aspect-ratio: {aspect_ratio}"`
  - Hasilnya adalah **masonry grid** — foto-foto tersusun seperti pinterest
- **Tampak di halaman:** Section `#galeri` dengan grid foto bergaya masonry

---

### 3.4 Program & Kegiatan — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/programs.php`
- **Tabel:** `program_kegiatan` (kolom: id, title, description, icon, category, sort_order)
- **Di balik layar:**
  - Admin pilih kategori (dropdown), isi judul, deskripsi, nama ikon Lucide
  - `sort_order` = angka urutan tampil (0 = paling atas)
  - Query saat load list: `ORDER BY category, sort_order ASC` → dikelompokkan per kategori
- **Di index.php:**
  - Ambil semua program, lalu group by kategori
  - Tiap kategori punya blok tersendiri (Program Utama, Ekstrakurikuler, dll.)
  - Nama ikon dipakai langsung: `<i data-lucide="{icon}">` → Lucide JS ubah jadi SVG ikon
- **Tampak di halaman:** Section program dengan ikon dan deskripsi singkat

---

### 3.5 Fasilitas — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/facilities.php`
- **Tabel:** `facilities` (kolom: id, name, description, icon)
- **Di balik layar:**
  - Sangat simpel — hanya INSERT/UPDATE/DELETE ke tabel `facilities`
  - Tidak ada upload gambar, hanya pakai ikon teks (nama ikon Lucide)
- **Di index.php:**
  - Query semua fasilitas → tampil sebagai grid ikon + nama
- **Tampak di halaman:** Section fasilitas dengan grid kotak ikon

---

### 3.6 Visi & Misi — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/vision_mission.php`
- **Tabel:** `vision_mission` (kolom: id, type, title, content, icon)
- **Di balik layar:**
  - Kolom `type` berisi string `'vision'` atau `'mission'` — ini yang membedakan keduanya
  - Visi hanya boleh **1 baris** (dibatasi `LIMIT 1` saat query)
  - Misi bisa **banyak** (query ambil semua yang `type = 'mission'`)
  - Satu tabel, dua fungsi berbeda — dibedain dari nilai kolom `type`
- **Di index.php:**
  - Query visi: `WHERE type = 'vision' LIMIT 1` → tampil sebagai quote besar
  - Query misi: `WHERE type = 'mission'` → tampil sebagai daftar poin dengan ikon
- **Tampak di halaman:** Section visi misi dengan quote dan daftar poin

---

### 3.7 Testimoni — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/testimonials.php`
- **Tabel:** `testimonials` (kolom: id, name, role, rating, message, photo)
- **Di balik layar:**
  - Admin input nama, status (wali murid kelas apa), pesan, rating 1-5, foto opsional
  - Rating disimpan sebagai angka integer (1-5)
- **Di index.php:**
  - Query semua testimoni → tampil sebagai kartu
  - Rating diloop: `for($i=0; $i<$item['rating']; $i++)` → tampilkan ikon bintang sebanyak nilainya
- **Tampak di halaman:** Kartu testimoni wali murid dengan bintang rating

---

### 3.8 FAQ — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/faq.php`
- **Tabel:** `faq` (kolom: id, question, answer)
- **Di balik layar:**
  - Paling simpel — hanya simpan pertanyaan dan jawaban
  - Tidak ada logika khusus, tidak ada gambar
- **Di index.php:**
  - Query semua FAQ → tampil sebagai accordion
  - **Accordion** = klik judul pertanyaan → jawaban muncul/sembuny (dihandle JavaScript)
  - Defaultnya semua tertutup, klik untuk buka
- **Tampak di halaman:** Section FAQ dengan efek buka-tutup

---

### 3.9 Pengaturan Umum — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/settings.php`
- **Tabel:** `settings` (kolom: site_key, site_value)
- **Di balik layar:**
  - Ini tabel "serba bisa" — apapun bisa disimpan selama punya key unik
  - Loop semua POST → tiap key-value disimpan: `INSERT ON DUPLICATE KEY UPDATE`
  - **WhatsApp multi-admin:** Disimpan sebagai JSON string di satu baris: `[{"name":"Bu Siti","number":"628..."},{...}]`
  - Saat dibaca → `json_decode()` → ubah balik jadi array
- **Di index.php:**
  - Di awal file, semua settings di-load sekaligus ke array `$settings`
  - Fungsi `s('key', 'default')` cukup cari di array itu — tidak query ulang tiap kali
- **Dampak tersebar di mana-mana:** Nama situs di navbar, WhatsApp di floating button, alamat di footer, Google Maps embed di section peta

---

### 3.10 Statistik — Di Balik Layar
- **Admin file:** `purnama-panel-x7k/stats.php`
- **Tabel:** `stats` (kolom: id, stat_label, stat_value)
- **Di balik layar:**
  - Admin edit langsung angka dan labelnya (misal: "2500++" dan "Alumni Lulus")
  - Update semua baris sekaligus lewat satu form
- **Di index.php:**
  - Query semua stats → tampil sebagai counter angka
  - Ada **animasi counter** (JavaScript): angka tidak langsung muncul, tapi naik pelan-pelan dari 0 ke target
  - Animasi baru jalan saat section masuk layar (pakai `IntersectionObserver`)
- **Tampak di halaman:** Section angka pencapaian dengan animasi counting

---

## BAGIAN 4: PENJELASAN TEKNIS "?action=" DI URL

Banyak halaman admin menggunakan `?action=list`, `?action=add`, `?action=edit`, `?action=delete`. Ini disebut **Query String**.

| URL | Artinya |
|---|---|
| `guru.php` atau `guru.php?action=list` | Tampilkan daftar guru |
| `guru.php?action=add` | Tampilkan form tambah guru baru |
| `guru.php?action=edit&id=3` | Tampilkan form edit guru dengan ID 3 |
| `guru.php?action=delete&id=3` | Langsung hapus guru ID 3, redirect balik |

### Cara kerjanya di PHP:
```php
$action = $_GET['action'] ?? 'list'; // baca dari URL, default 'list'
$id = $_GET['id'] ?? null;           // baca ID juga kalau ada

if ($action === 'delete' && $id) {
    // hapus dari database
    // redirect balik
}
```

Semua logika cukup **satu file**, tidak perlu banyak file terpisah.

---

## BAGIAN 5: CARA KERJA UPLOAD GAMBAR

Semua upload gambar menggunakan `$_FILES` PHP:

1. Form HTML: `enctype="multipart/form-data"` + `<input type="file">`
2. PHP cek: `if (!empty($_FILES['photo']['name']))`
3. Buat nama file unik: `time() . '_' . nama . '.jpg'`
4. Pindahkan: `move_uploaded_file(tmp_name, target_path)`
5. Simpan path-nya ke database, bukan file-nya

---

## BAGIAN 6: CARA KERJA TABEL `settings`

Tabel `settings` berbeda dari tabel lain. Ini adalah **key-value store**:

| site_key | site_value |
|---|---|
| `site_name` | TK PURNAMA |
| `hero_title_line1` | Generasi Cerdas & |
| `whatsapp_number` | 6281353642194 |

- **Simpan:** `INSERT ... ON DUPLICATE KEY UPDATE` — jika key sudah ada, update; jika belum, insert.
- **Baca di index.php:** Fungsi `s('site_name', 'default')` — ambil nilai, kalau kosong pakai default.

---

## BAGIAN 7: METODOLOGI SCRUM

### Apa itu Scrum?
Scrum adalah **framework kerja Agile** untuk mengelola proyek yang kompleks, terutama software. Intinya: kerja dalam siklus pendek yang terulang disebut **Sprint**.

### Kenapa Pilih Scrum untuk Proyek Ini?
- Proyek website sekolah punya fitur yang terus berkembang (gallery, guru, FAQ, dll.)
- Mudah adaptasi jika ada perubahan permintaan dari pihak sekolah
- Tim kecil → cocok dengan Scrum yang ringan
- Bisa deliver fitur bertahap (iteratif), tidak harus tunggu semua selesai

---

## BAGIAN 8: EVENT-EVENT DALAM SCRUM

### 8.1 Sprint
- Periode kerja tetap, biasanya **1-4 minggu**
- Setiap Sprint menghasilkan **produk yang bisa dipakai (increment)**
- Contoh: Sprint 1 = selesai halaman hero + login admin

### 8.2 Sprint Planning
- **Kapan:** Awal setiap Sprint
- **Tujuan:** Tim sepakat: "Sprint ini kita kerjakan apa?"
- **Output:** Sprint Backlog (daftar task yang dikerjakan sprint ini)
- **Contoh:** Sprint ini kita selesaikan: fitur galeri, fitur guru, dan halaman settings

### 8.3 Daily Scrum (Stand-up)
- **Kapan:** Setiap hari, **max 15 menit**
- **Format 3 pertanyaan:**
  1. Kemarin saya kerjakan apa?
  2. Hari ini saya akan kerjakan apa?
  3. Ada hambatan apa?
- **Tujuan:** Sinkronisasi tim, bukan laporan ke atasan
- **Contoh Daily Scrum proyek ini:**
  - "Kemarin: selesai halaman `guru.php` beserta upload foto."
  - "Hari ini: akan mengerjakan `gallery.php`."
  - "Hambatan: belum tahu cara handle aspect ratio gambar."

### 8.4 Sprint Review
- **Kapan:** Akhir Sprint
- **Tujuan:** Demo hasil kerja ke stakeholder (pihak sekolah/klien)
- **Yang terjadi:** Tim menunjukkan fitur yang sudah selesai, stakeholder beri feedback
- **Contoh:** Demo ke kepala sekolah: "Ini lho Bu, bapak/ibu sekarang bisa edit foto guru langsung dari sini."

### 8.5 Sprint Retrospective
- **Kapan:** Setelah Sprint Review, sebelum Sprint berikutnya
- **Tujuan:** Tim evaluasi **cara kerjanya**, bukan produknya
- **3 pertanyaan utama:**
  1. Apa yang berjalan baik? (**Keep**)
  2. Apa yang kurang baik? (**Stop**)
  3. Apa yang perlu dicoba? (**Start**)
- **Contoh Retro:**
  - Keep: Komunikasi via WhatsApp berjalan lancar
  - Stop: Menunggu feedback terlalu lama sebelum lanjut coding
  - Start: Review kode bersama sebelum push ke server

### 8.6 Product Backlog Refinement (Grooming)
- **Kapan:** Di tengah Sprint (opsional, tidak wajib)
- **Tujuan:** Tim mempersiapkan & memprioritaskan backlog untuk Sprint berikutnya
- **Contoh:** Sambil ngerjain Sprint 2, tim sudah mulai bahas: "Sprint 3 nanti kita tambahin fitur testimoni atau FAQ dulu ya?"

---

## BAGIAN 9: ARTEFAK SCRUM

### Product Backlog
- Daftar semua fitur/kebutuhan yang ingin dibuat
- Diurutkan berdasarkan prioritas
- **Contoh untuk proyek ini:**
  - [HIGH] Login admin ✅
  - [HIGH] Edit hero section ✅  
  - [HIGH] Kelola guru ✅
  - [MEDIUM] Kelola galeri ✅
  - [MEDIUM] Kelola testimoni ✅
  - [LOW] Dark mode toggle ✅
  - [LOW] Multi-admin WhatsApp ✅

### Sprint Backlog
- Subset dari Product Backlog — hanya yang dikerjakan Sprint ini
- Contoh Sprint 1: Login + Hero + Database setup

### Increment
- Hasil kerja setiap Sprint yang **siap dipakai**
- Tidak harus 100% selesai semua fitur, tapi yang ada harus bisa jalan

---

## BAGIAN 10: PERAN DALAM SCRUM

| Peran | Tanggung Jawab |
|---|---|
| **Product Owner** | Menentukan prioritas fitur (bisa: kepala sekolah / klien) |
| **Scrum Master** | Fasilitator, pastikan tim ikut Scrum dengan benar, hapus hambatan |
| **Development Team** | Yang mengerjakan kode (developer, desainer) |

> Untuk proyek kecil (1-2 orang), bisa merangkap semua peran.

---

## BAGIAN 11: ALUR LENGKAP SATU SPRINT (Ringkasan)

```
[Awal Sprint]
Sprint Planning → Buat Sprint Backlog

[Setiap Hari]
Coding + Daily Scrum (15 menit)

[Akhir Sprint]
Sprint Review → Demo ke klien
Sprint Retrospective → Evaluasi cara kerja tim

[Ulangi untuk Sprint berikutnya]
```

---

## BAGIAN 12: RINGKASAN TEKNIS UNTUK PERTANYAAN UJIAN

| Pertanyaan | Jawaban Singkat |
|---|---|
| Dimana data tersimpan? | Database MySQL, tabel sesuai fitur |
| Bagaimana gambar disimpan? | File di `assets/`, path-nya di database |
| Bagaimana admin edit hero? | Buka `hero.php`, isi form, submit → UPDATE tabel `settings` |
| Bagaimana pengunjung lihat perubahan? | `index.php` query database setiap kali diakses |
| Kenapa pakai Scrum? | Proyek iteratif, kebutuhan bisa berubah, cocok tim kecil |
| Apa beda Sprint Review vs Retro? | Review = demo produk ke klien; Retro = evaluasi cara kerja tim |
| Daily Scrum isinya apa? | Kemarin ngapain, hari ini ngapain, ada hambatan apa |
| Apa itu `?action=edit&id=3`? | Beri tahu PHP untuk menampilkan form edit data dengan ID 3 |
| Apa itu tabel `settings`? | Penyimpanan key-value untuk konfigurasi website yang dinamis |
| Siapa Product Owner? | Klien / kepala sekolah — yang tentukan prioritas fitur |
