import Link from "next/link"
import { MarketplaceBadges } from "./marketplace-badges"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-light rounded-bl-[80px]" />
      <div className="absolute top-10 right-10 h-24 w-24 rounded-xl bg-secondary/10 rotate-12 hidden sm:block" />
      <div className="absolute bottom-8 left-8 h-16 w-16 rounded-xl bg-primary-dark/5 -rotate-12 hidden sm:block" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="flex justify-center mb-[var(--hero-logo-gap)]">
          <Link href="/" className="inline-flex items-center">
            <img
              src="https://denzautodetailing.com/wp-content/uploads/2026/05/Main-Logo-Denz-Autodetailing-2026.png"
              alt="Denz Auto Detailing"
              className="h-14 sm:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Judul */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tight leading-[var(--hero-title-leading)] mb-[var(--hero-title-gap)]">
          PERAWATAN KENDARAAN SIMPLE, HASIL MAKSIMAL!!!
        </h2>

        {/* Deskripsi */}
        <p className="font-display text-xs sm:text-sm md:text-base font-semibold text-gray-600 max-w-2xl mx-auto leading-[var(--hero-text-leading)] mb-[var(--hero-text-gap)]">
          Denz Auto Detailing hadir buat kamu yang pengen kendaraan selalu bersih, glossy, dan enak dilihat setiap hari. Mulai dari cuci, proteksi, sampai finishing. Semua bisa kamu lakuin sendiri dengan hasil yang tetap keliatan profesional. Dipakai harian oke, dipakai detailing juga masuk. Cocok buat kamu yang peduli tampilan kendaraan tanpa harus ribet.
        </p>

        <p className="text-xs sm:text-sm font-bold text-primary mb-6 tracking-wide">
          CEK KOLEKSI LENGKAPNYA SEKARANG DAN RASAIN SENDIRI HASILNYA
        </p>

        <MarketplaceBadges />
      </div>
    </section>
  )
}