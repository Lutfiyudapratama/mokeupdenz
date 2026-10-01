"use client"

import { useState } from "react"
import Link from "next/link"
import {
  UserRound,
  Mail,
  LogOut,
  ChevronRight,
  Package,
  Heart,
  MapPin,
  Settings,
  LogIn,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { useAuthStore } from "@/store/auth-store"
import { useAuthFlowStore } from "@/store/auth-flow-store"

const menuItems = [
  { href: "/profile/orders", label: "Pesanan Saya", icon: Package },
  { href: "/profile/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile/addresses", label: "Alamat", icon: MapPin },
  { href: "/profile/settings", label: "Pengaturan", icon: Settings },
]

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuthStore()
  const requireAuth = useAuthFlowStore((s) => s.requireAuth)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function handleLogoutConfirm() {
    logout()
    setConfirmOpen(false)
  }

  // Tamu: tampilkan ajakan login, memakai modal Login global yang sama
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="text-center max-w-sm">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mb-5">
              <UserRound className="h-7 w-7 text-primary-dark" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-primary-dark uppercase tracking-tight mb-2">
              Kamu Belum Masuk
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Masuk atau buat akun untuk melihat profil, pesanan, dan
              wishlist kamu.
            </p>
            <button
              type="button"
              onClick={() => requireAuth(() => {})}
              className="inline-flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary active:scale-[0.98] text-white text-sm font-bold py-3 px-6 rounded-lg transition-all uppercase tracking-wide"
            >
              <LogIn className="h-4 w-4" />
              Masuk / Daftar
            </button>
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  // Sudah login: tampilkan info akun + menu + logout
  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Header akun */}
        <div className="flex items-center gap-4 pb-6 border-b border-primary-light">
          <div className="h-16 w-16 rounded-full bg-primary-dark flex items-center justify-center shrink-0">
            <UserRound className="h-8 w-8 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg sm:text-xl font-black text-primary-dark truncate">
              {user?.name ?? "Pengguna"}
            </p>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Menu navigasi */}
        <div className="mt-6 rounded-xl border-2 border-primary-light overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 hover:bg-primary-light/40 transition-colors ${
                  i !== menuItems.length - 1
                    ? "border-b border-primary-light"
                    : ""
                }`}
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-primary-dark">
                  <Icon className="h-4 w-4 text-secondary" />
                  {item.label}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </Link>
            )
          })}
        </div>

        {/* Tombol logout */}
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-500 hover:bg-red-50 active:scale-[0.98] text-sm font-bold py-3 rounded-lg transition-all uppercase tracking-wide"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Konfirmasi logout */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative w-full sm:max-w-xs bg-white rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden p-5 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <LogOut className="h-5 w-5 text-red-500" />
            </div>
            <p className="font-display text-base font-black text-primary-dark uppercase tracking-tight mb-1.5">
              Keluar dari Akun?
            </p>
            <p className="text-xs text-gray-500 mb-5">
              Kamu perlu masuk lagi untuk melihat profil dan diskon.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex-1 border-2 border-primary-light text-primary-dark text-sm font-bold py-2.5 rounded-lg hover:bg-primary-light/40 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}