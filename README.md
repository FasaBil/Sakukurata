# SakuKurata
Aplikasi Pencatat Keuangan & Arsip Struk Digital

Nama: Nisrina Bilqis
NRP: 5027241054

"Dompet Rata? Tetap Tertata!"

SakuKurata adalah aplikasi manajemen keuangan pribadi berbasis web yang dirancang khusus untuk mahasiswa. Berbeda dengan pencatat keuangan biasa, SakuKurata mewajibkan pengguna untuk mengunggah bukti struk/foto pada setiap pengeluaran, menciptakan kebiasaan transparansi dan akuntabilitas finansial.

💡 Latar Belakang Masalah (Problem Statement)

Banyak mahasiswa mengalami kesulitan melacak kemana perginya uang bulanan mereka ("The Latte Factor"). Catatan manual seringkali tidak akurat karena lupa atau malas mencatat detail. Selain itu, bukti fisik seperti struk belanja sering hilang atau luntur, menyulitkan proses audit diri sendiri atau pelaporan ke orang tua/bendahara organisasi.

🚀 Solusi yang Ditawarkan

SakuKurata hadir sebagai Digital Receipt Repository yang menggabungkan pencatatan keuangan dengan arsip digital.

Wajib Bukti: Setiap transaksi didukung oleh bukti visual.

Anti Hilang: Struk tersimpan aman di server, tidak takut luntur atau terbuang.

User Friendly: Antarmuka yang ceria (Pinky Theme) membuat proses mencatat keuangan jadi tidak menakutkan.

🛠️ Tech Stack

Aplikasi ini dibangun menggunakan MERN Stack (MongoDB, Express, React, Node.js) dengan pendekatan arsitektur Monolith (Frontend & Backend dalam satu repo).

Frontend: React.js (Vite), JavaScript, Vanilla CSS (Custom Styling).

Backend: Node.js, Express.js.

Database: MongoDB (via Mongoose ODM).

Authentication: JSON Web Token (JWT) & BcryptJS.

File Storage: Multer (Local Storage / Static Serving).

✨ Fitur Utama

🔐 Autentikasi Pengguna Aman

Register & Login menggunakan email kampus/pribadi.

Password dienkripsi (Hashing) untuk keamanan.

Sesi pengguna dijaga menggunakan JWT Token.

💸 Dashboard Saldo Real-time

Melihat total Pemasukan, Pengeluaran, dan Sisa Saldo secara otomatis.

Indikator visual yang menarik.

📸 Upload Bukti Transaksi (Image Upload)

Fitur unggulan: Mengunggah foto struk belanja saat mencatat pengeluaran.

Preview gambar sebelum diupload.

Mendukung format gambar (JPG, PNG).

📝 Riwayat Transaksi (Transaction History)

List transaksi yang rapi dengan thumbnail gambar.

Detail tanggal dan nominal yang terformat Rupiah (IDR).

📦 Cara Menjalankan Project (Installation)

Pastikan di laptopmu sudah terinstall Node.js dan MongoDB.

1. Clone Repository

git clone [https://github.com/username-kamu/SakuKurata.git](https://github.com/username-kamu/SakuKurata.git)
cd SakuKurata


2. Setup Backend (Server)

Buka terminal baru, arahkan ke folder backend:

cd backend

# Install dependencies
npm install

# Buat folder uploads manual (PENTING!)
mkdir uploads

# Buat file .env
# Isi .env dengan:
MONGO_URI=mongodb://127.0.0.1:27017/sakukurata_db
JWT_SECRET=sakukurata_jwt_secret_key_change_this_in_production
PORT=5000


# Jalankan Server
npm run dev


Pastikan muncul pesan: 🚀 Server jalan di port 5000 dan ✅ MongoDB Konek!

3. Setup Frontend (Client)

Buka terminal baru lagi (jangan matikan terminal backend), arahkan ke folder frontend:

cd frontend

# Install dependencies
npm install

# Jalankan React
npm run dev


Buka browser di alamat yang muncul (biasanya http://localhost:5173)

📂 Struktur Folder Proyek

```
SakuKurata/
├── backend/                # Server Side Logic
│   ├── middleware/         # Auth Middleware
│   ├── models/             # Database Schema (User, Transaction)
│   ├── routes/             # API Endpoints
│   ├── uploads/            # Penyimpanan Gambar Fisik
│   └── index.js            # Entry Point Server
│
└── frontend/               # Client Side Interface
    ├── src/
    │   ├── pages/          # Halaman (Login, Dashboard, Add)
    │   ├── App.jsx         # Routing Configuration
    │   └── main.jsx        # Entry Point React
    └── package.json
```

👨‍💻 Author

