# SakuKurata
Aplikasi Pencatat Keuangan & Arsip Struk Digital

## Dibuat oleh
Nama: Nisrina Bilqis
NRP: 5027241054

## Penjelasan
"Dompet Rata? Tetap Tertata!"

## Deskripsi

SakuKurata adalah aplikasi manajemen keuangan pribadi berbasis web yang dirancang khusus untuk mahasiswa. Berbeda dengan pencatat keuangan biasa, SakuKurata mewajibkan pengguna untuk mengunggah bukti struk/foto pada setiap pengeluaran, menciptakan kebiasaan transparansi dan akuntabilitas finansial.

## Latar Belakang

Banyak mahasiswa mengalami kesulitan melacak kemana perginya uang bulanan mereka. Catatan manual seringkali tidak akurat karena lupa atau malas mencatat detail. Selain itu, bukti fisik seperti struk belanja sering hilang atau luntur, menyulitkan proses audit diri sendiri atau pelaporan ke orang tua/bendahara organisasi.

## Solusi

SakuKurata hadir sebagai Digital Receipt Repository yang menggabungkan pencatatan keuangan dengan arsip digital:

- **Wajib Bukti**: Setiap transaksi didukung oleh bukti visual
- **Anti Hilang**: Struk tersimpan aman di server, tidak takut luntur atau terbuang
- **User Friendly**: Antarmuka yang ceria membuat proses mencatat keuangan jadi tidak menakutkan

## Tech Stack

Aplikasi ini dibangun menggunakan MERN Stack dengan pendekatan arsitektur Monolith:

- **Frontend**: React.js (Vite), JavaScript, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Token (JWT) & BcryptJS
- **File Storage**: Multer (Local Storage)

## Fitur Utama

### Autentikasi Pengguna
- Register & Login menggunakan email
- Password dienkripsi untuk keamanan
- Sesi pengguna dijaga menggunakan JWT Token

### Dashboard Saldo Real-time
- Melihat total Pemasukan, Pengeluaran, dan Sisa Saldo secara otomatis
- Indikator visual yang menarik

### Upload Bukti Transaksi
- Mengunggah foto struk belanja saat mencatat pengeluaran
- Preview gambar sebelum diupload
- Mendukung format gambar JPG dan PNG

### Riwayat Transaksi
- List transaksi yang rapi dengan thumbnail gambar
- Detail tanggal dan nominal yang terformat Rupiah (IDR)

## Cara Menjalankan Project

Pastikan sudah terinstall Node.js dan MongoDB.

### 1. Clone Repository

```bash
git clone https://github.com/FasaBil/SakuKurata.git
cd SakuKurata
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` dengan isi:

# Buat file .env
# Isi .env dengan:
MONGO_URI=mongodb://127.0.0.1:27017/sakukurata_db
JWT_SECRET=sakukurata_jwt_secret_key_change_this_in_production
PORT=5000


Jalankan server:

```bash
npm run dev
```

### 3. Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

Buka browser di `http://localhost:5173`

## Struktur Folder

```
SakuKurata/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── index.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```


