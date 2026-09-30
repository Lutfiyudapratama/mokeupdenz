"use client"

import { useState } from "react"
import { X, Mail, Lock, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth-store"

interface LoginModalProps {
    open: boolean
    isClosing: boolean
    onGuest: () => void
    onLoginSuccess: () => void
}

export function LoginModal({
    open,
    isClosing,
    onGuest,
    onLoginSuccess,
}: LoginModalProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = useAuthStore((state) => state.login)

    if (!open) return null

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email || !password) return

        // Belum ada logic auth asli: email/password apa pun dianggap berhasil,
        // sekaligus berlaku sebagai "daftar" kalau akun belum ada
        login({
            id: "user-001",
            name: "Pengguna",
            email,
        })

        onLoginSuccess()
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center">
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 backdrop-blur-[2px]",
                    isClosing ? "animate-overlay-out" : "animate-overlay-in"
                )}
                onClick={onGuest}
            />

            <div
                className={cn(
                    "relative w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden",
                    isClosing ? "animate-modal-out" : "animate-modal-in"
                )}
            >
                <button
                    type="button"
                    onClick={onGuest}
                    className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white active:scale-90 flex items-center justify-center text-gray-500 hover:text-primary-dark transition-all shadow-sm"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Header dengan aksen diskon, senada dengan Trust Banner & Claim Discount */}
                {/* Header putih dengan logo, senada dengan Navbar */}
                <div className="relative bg-white px-5 pt-8 pb-6 text-center border-b border-primary-light overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <img
                            src="https://denzautodetailing.com/wp-content/uploads/2026/05/Main-Logo-Denz-Autodetailing-2026.png"
                            alt="Denz Auto Detailing"
                            className="h-10 sm:h-12 w-auto object-contain mb-4"
                        />
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1 mb-3">
                            <Gift className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                                Klaim Diskon Spesial
                            </span>
                        </div>
                        {/* <p className="font-display text-lg sm:text-xl font-black text-primary-dark uppercase tracking-tight">
                            Masuk & Klaim Diskon
                        </p> */}
                        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xs">
                            Masuk atau buat akun sekarang, dapatkan voucher diskon spesial
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-primary-dark mb-1.5 block">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full rounded-lg border-2 border-primary-light px-4 py-2.5 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-primary-dark mb-1.5 block">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-lg border-2 border-primary-light px-4 py-2.5 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-dark hover:bg-primary active:scale-[0.98] text-white text-sm font-bold py-3 rounded-lg transition-all uppercase tracking-wide"
                    >
                        Masuk & Klaim Diskon
                    </button>

                    <p className="text-center text-xs text-gray-500">
                        Belum punya akun? Cukup isi email &amp; kata sandi, akun baru
                        otomatis dibuat.
                    </p>

                    <button
                        type="button"
                        onClick={onGuest}
                        className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors pt-1"
                    >
                        Lanjut sebagai tamu
                    </button>
                </form>
            </div>
        </div>
    )
}