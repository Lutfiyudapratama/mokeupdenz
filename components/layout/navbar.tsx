"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { LoginRequiredModal } from "@/components/auth/login-required-modal"
import { RunningText } from "@/components/home/running-text"
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
      {/* Navbar = running text full lebar layar */}
      <header className="sticky top-0 z-40 w-full border-b border-secondary-blue bg-white">
        <RunningText />
      </header>

      {/*
        Tombol bulat melayang (kanan bawah). Sengaja di luar <header>
        agar `fixed` menempel ke layar.
      */}
      <div
        className="fixed right-4 sm:right-6 z-50 flex flex-col gap-3"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        {/* Profile */}
        <Link
          href="/profile"
          aria-label="Profil"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg ring-1 ring-secondary-light transition-transform hover:scale-105 active:scale-95"
        >
          <User className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        {/* Keranjang */}
        <button
          type="button"
          onClick={handleCartClick}
          aria-label="Keranjang"
          className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary-dark text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
            2
          </span>
        </button>
      </div>

      {/* Modal Login */}
      <LoginRequiredModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={() => router.push("/login")}
      />
    </>
  )
}