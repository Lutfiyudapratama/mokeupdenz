"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircle, ShoppingCart, User, X, Send } from "lucide-react"

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    // Diundur ke 4.5 detik supaya tidak tertumpuk di belakang popup
    // Login dan Klaim Diskon yang muncul lebih dulu (di 0.4 detik)
    const timer = setTimeout(() => {
      setChatOpen(true)
    }, 4500)

    return () => clearTimeout(timer)
  }, [])

  const whatsappNumber = "6288802347761"
  const whatsappMessage = encodeURIComponent(
    "Halo, saya ingin bertanya mengenai produk Denz Auto Detailing."
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    /* Di Mobile posisinya di atas MobileBottomNav (bottom-[84px]), di PC di pojok bawah (bottom-5) */
    <div className="fixed right-5 bottom-[84px] md:bottom-5 z-[100]">
      <div className="flex flex-col items-center gap-3">

        {/* ================= 1. ACCOUNT (HANYA PC / LAPTOP) ================= */}
        <Link
          href="/profile"
          aria-label="Akun"
          className="hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg ring-1 ring-gray-200 transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          <User size={23} strokeWidth={2.2} />
        </Link>

        {/* ================= 2. CHAT (MOBILE & PC) ================= */}
        <div className="relative">
          {/* CHAT POPUP WINDOW */}
          {chatOpen && (
            <div className="absolute bottom-[68px] right-0 z-50 w-[300px] rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between rounded-t-2xl bg-primary-dark px-4 py-3 text-white">
                <div>
                  <p className="text-sm font-bold">Denz Auto Detailing</p>
                  <p className="text-[11px] text-white/80">
                    Biasanya membalas dengan cepat
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  aria-label="Tutup chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/15"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="rounded-xl bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
                  Halo 👋
                  <br />
                  Ada yang bisa kami bantu?
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  <Send size={17} />
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* NOTIFICATION BADGE */}
          {!chatOpen && (
            <span className="absolute -right-1 -top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white ring-2 ring-white">
              1
            </span>
          )}

          {/* CHAT BUTTON */}
          <button
            type="button"
            onClick={() => setChatOpen((prev) => !prev)}
            aria-label="Buka chat"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary hover:shadow-xl"
          >
            {chatOpen ? (
              <X size={24} strokeWidth={2.3} />
            ) : (
              <MessageCircle size={24} strokeWidth={2.3} />
            )}
          </button>
        </div>

        {/* ================= 3. KERANJANG (HANYA PC / LAPTOP) ================= */}
        <Link
          href="/cart"
          aria-label="Keranjang"
          className="relative hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg ring-1 ring-gray-200 transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          <ShoppingCart size={23} strokeWidth={2.2} />

          {/* BADGE KERANJANG */}
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            0
          </span>
        </Link>
      </div>
    </div>
  )
}