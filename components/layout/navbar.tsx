"use client"

import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { LoginRequiredModal } from "@/components/auth/login-required-modal"
import { useAuthStore } from "@/store/auth-store"

export function Navbar() {
  const router = useRouter()

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  function handleCartClick() {
    if (!isLoggedIn) {
      setLoginModalOpen(true)
      return
    }

    router.push("/cart")
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-secondary-light">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 h-14 sm:h-16 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-3">

          {/* Grup tengah: logo + search */}
          <div className="flex items-center gap-2 sm:gap-6 sm:col-start-2">

            <Link
              href="/"
              aria-label="Denz Auto Detailing - Beranda"
              className="inline-flex items-center shrink-0"
            >
              <img
                src="https://denzautodetailing.com/wp-content/uploads/2026/05/Main-Logo-Denz-Autodetailing-2026.png"
                alt="Denz Auto Detailing"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </Link>

            <div className="hidden sm:flex items-center relative sm:w-72 lg:w-96">
              <input
                type="text"
                placeholder="search products..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-light transition-all"
              />

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
            </div>
          </div>

          {/* Kanan: ikon */}
          <div className="flex items-center gap-3 sm:gap-5 justify-self-end sm:col-start-3">

            {/* Search mobile */}
            <Link
              href="/search"
              className="sm:hidden p-1"
            >
              <Search className="h-5 w-5 text-primary-dark" />
            </Link>

            {/* Keranjang */}
            <button
              type="button"
              onClick={handleCartClick}
              aria-label="Keranjang"
              className="relative p-1"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-dark" />

              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile */}
            <Link
              href="/profile"
              className="hidden sm:block p-1"
            >
              <User className="h-6 w-6 text-primary-dark" />
            </Link>
          </div>
        </div>
      </header>

      {/* Modal Login */}
      <LoginRequiredModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={() => router.push("/login")}
      />
    </>
  )
}