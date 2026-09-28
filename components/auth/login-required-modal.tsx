"use client"

import { ArrowRight, UserRound, X } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoginRequiredModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: () => void
}

export function LoginRequiredModal({
  open,
  onOpenChange,
  onLogin,
}: LoginRequiredModalProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      setIsClosing(false)
      document.body.style.overflow = "hidden"
    } else if (shouldRender) {
      setIsClosing(true)
      document.body.style.overflow = ""

      const timer = setTimeout(() => {
        setShouldRender(false)
        setIsClosing(false)
      }, 250)

      return () => clearTimeout(timer)
    }
  }, [open, shouldRender])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!shouldRender) return null

  function handleClose() {
    onOpenChange(false)
  }

  function handleLogin() {
    onOpenChange(false)
    onLogin()
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center">
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-[2px]",
          isClosing
            ? "animate-overlay-out"
            : "animate-overlay-in"
        )}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-xl",
          isClosing
            ? "animate-modal-out"
            : "animate-modal-in"
        )}
      >
        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          className="
            absolute right-3 top-3 z-10
            flex h-8 w-8 items-center justify-center
            rounded-full
            bg-white/90
            text-gray-500
            shadow-sm
            transition-all
            hover:bg-white
            hover:text-primary-dark
            active:scale-90
          "
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-6 text-center sm:p-7">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
            <UserRound className="h-7 w-7 text-primary-dark" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-extrabold text-primary-dark sm:text-xl">
            Masuk untuk Melanjutkan
          </h2>

          {/* Description */}
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
            Silakan masuk atau daftar akun terlebih dahulu
            untuk mengakses keranjang dan pesanan kamu.
          </p>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="
              mt-6 flex w-full items-center justify-center
              gap-2 rounded-lg
              bg-primary-dark
              py-3
              text-sm font-bold
              text-white
              transition-all
              hover:bg-primary
              active:scale-[0.98]
              sm:text-base
            "
          >
            Masuk / Daftar

            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={handleClose}
            className="
              mt-3 w-full
              py-2.5
              text-sm font-semibold
              text-gray-500
              transition-colors
              hover:text-primary-dark
            "
          >
            Nanti saja
          </button>
        </div>
      </div>
    </div>
  )
}