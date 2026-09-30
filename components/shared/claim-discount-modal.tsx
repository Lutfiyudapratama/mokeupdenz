"use client"

import { useState } from "react"
import { X, Gift, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClaimDiscountModalProps {
    open: boolean
    isClosing: boolean
    onClose: () => void
}

const DISCOUNT_CODE = "DENZ20"

export function ClaimDiscountModal({
    open,
    isClosing,
    onClose,
}: ClaimDiscountModalProps) {
    const [claimed, setClaimed] = useState(false)

    if (!open) return null

    function handleClaim() {
        navigator.clipboard?.writeText(DISCOUNT_CODE).catch(() => { })
        setClaimed(true)
        setTimeout(() => {
            onClose()
        }, 1000)
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center">
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 backdrop-blur-[2px]",
                    isClosing ? "animate-overlay-out" : "animate-overlay-in"
                )}
                onClick={onClose}
            />

            <div
                className={cn(
                    "relative w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden",
                    isClosing ? "animate-modal-out" : "animate-modal-in"
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white active:scale-90 flex items-center justify-center text-gray-500 hover:text-primary-dark transition-all shadow-sm"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Header dekoratif */}
                <div className="relative bg-white px-5 pt-8 pb-6 text-center border-b border-primary-light overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <img
                            src="https://denzautodetailing.com/wp-content/uploads/2026/05/Main-Logo-Denz-Autodetailing-2026.png"
                            alt="Denz Auto Detailing"
                            className="h-9 sm:h-11 w-auto object-contain mb-4"
                        />
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1 mb-3">
                            <Gift className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                                Klaim Diskon Spesial
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xs">
                            Khusus pengunjung baru, klaim sekarang sebelum kehabisan
                        </p>
                    </div>
                </div>

                {/* Kode diskon */}
                <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-primary-light bg-primary-light/40 px-4 py-3">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                Kode Voucher
                            </p>
                            <p className="font-display text-lg font-black text-primary-dark tracking-widest">
                                {DISCOUNT_CODE}
                            </p>
                        </div>
                        <span className="text-lg font-black text-secondary">20%</span>
                    </div>

                    <p className="text-center text-[11px] sm:text-xs text-gray-400">
                        Berlaku untuk semua produk, minimal belanja Rp 50.000
                    </p>

                    <button
                        type="button"
                        onClick={handleClaim}
                        disabled={claimed}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all active:scale-[0.98] uppercase tracking-wide",
                            claimed
                                ? "bg-green-600 text-white"
                                : "bg-primary-dark hover:bg-primary text-white"
                        )}
                    >
                        {claimed ? (
                            <>
                                <Check className="h-4 w-4" />
                                Kode Tersalin
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Klaim Sekarang
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}