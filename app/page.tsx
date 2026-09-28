"use client" // Menandakan bahwa ini adalah Client Component agar fitur styled-jsx dapat berjalan dengan baik di Next.js

// Mengimpor komponen-komponen layout dan bagian halaman utama dari folder proyek masing-masing
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { HeroSection } from "@/components/home/hero-section"
import { TrustBanner } from "@/components/home/trust-banner"
import { CategorySection } from "@/components/home/category-section"
import { ProductHighlight } from "@/components/home/product-highlight"

// Fungsi utama untuk merender seluruh tampilan halaman beranda (HomePage)
export default function HomePage() {
  return (
    // Pembungkus utama halaman: tinggi minimum satu layar, tata letak fleksibel kolom, dan latar belakang putih
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      
      {/* Menampilkan komponen bilah navigasi atas (Navbar) */}
      <Navbar />

      {/* Bagian utama isi konten website (Main Content) */}
      <main className="flex-1">
        
        {/* Wadah pembungkus fitur Teks Berjalan (Running Text) dengan overflow tersembunyi */}
        <div className="bg-secondary text-white py-2.5 overflow-hidden relative">
          
          {/* Elemen pembungkus teks dengan animasi putaran halus berdurasi 30 detik */}
          <div 
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "smoothInfiniteScroll 30s linear infinite", // Mengatur kelancaran dan kecepatan putaran teks
            }}
            className="font-medium text-sm"
          >
            {/* Teks Pertama: Diberi jarak kanan (padding) selebar setengah layar agar transisinya longgar dan natural */}
            <span className="inline-block pr-[50vw]">
              ✨ Autocare Paling Worth It — Denz Auto Detailing siap bikin kendaraanmu selalu bersih dan glossy! ✨
            </span>
            
            {/* Teks Kedua: Berfungsi sebagai pengekor persis di belakang teks pertama untuk menjaga kesinambungan */}
            <span className="inline-block pr-[50vw]">
              ✨ Autocare Paling Worth It — Denz Auto Detailing siap bikin kendaraanmu selalu bersih dan glossy! ✨
            </span>
          </div>

          {/* Pengaturan skrip CSS keyframes lokal untuk pergerakan transisi yang mulus tanpa patah-patah */}
          <style jsx>{`
            @keyframes smoothInfiniteScroll {
              0% { transform: translateX(0%); }     {/* Posisi awal perputaran */}
              100% { transform: translateX(-50%); }  {/* Titik pergeseran separuh elemen agar kembali ke awal secara mulus */}
            }
          `}</style>
        </div>

        {/* Menampilkan bagian banner utama (Hero Section) */}
        <HeroSection />

        {/* Menampilkan bagian banner keunggulan atau kepercayaan pelanggan */}
        <TrustBanner />

        {/* Menampilkan bagian daftar kategori produk atau layanan */}
        <CategorySection />

        {/* Menampilkan bagian produk pilihan atau sorotan */}
        <ProductHighlight />
      </main>

      {/* Menampilkan komponen bagian bawah website (Footer) */}
      <Footer />

      {/* Menampilkan menu navigasi khusus perangkat seluler di bagian bawah */}
      <MobileBottomNav />
    </div>
  )
}