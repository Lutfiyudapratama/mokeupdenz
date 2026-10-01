"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  Check,
  Tag,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { useCartStore } from "@/store/cart-store"
import { useAuthStore } from "@/store/auth-store"
import { useDiscountStore } from "@/store/discount-store"
import { formatPrice } from "@/lib/utils/format"
import { cn } from "@/lib/utils"

const DISCOUNT_CODE = "DENZ20"
const DISCOUNT_PERCENT = 20

export default function CartPage() {
  const router = useRouter()

  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const toggleSelect = useCartStore((s) => s.toggleSelect)
  const toggleSelectAll = useCartStore((s) => s.toggleSelectAll)

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const isDiscountActive = useDiscountStore((s) => s.isActive())

  const selectedItems = useMemo(
    () => items.filter((item) => item.selected),
    [items]
  )
  const selectedTotalPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [selectedItems]
  )
  const isAllSelected = useMemo(
    () => items.length > 0 && items.every((item) => item.selected),
    [items]
  )

  // Voucher hanya berlaku kalau: sudah login, voucher masih dalam 1 jam, dan ada item dipilih
  const voucherApplied =
    isLoggedIn && isDiscountActive && selectedTotalPrice > 0

  const discountAmount = voucherApplied
    ? Math.round((selectedTotalPrice * DISCOUNT_PERCENT) / 100)
    : 0

  const grandTotal = selectedTotalPrice - discountAmount

  const isEmpty = items.length === 0
  const selectedCount = selectedItems.length

  function handleDecrease(productId: string, size: string, currentQty: number) {
    if (currentQty <= 1) {
      removeItem(productId, size)
      return
    }
    updateQty(productId, size, currentQty - 1)
  }

  function handleIncrease(productId: string, size: string, currentQty: number) {
    updateQty(productId, size, currentQty + 1)
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="h-5 w-5 text-primary-dark" />
          <h1 className="font-display text-xl sm:text-2xl font-black text-primary-dark uppercase tracking-tight">
            Keranjang
          </h1>
          {!isEmpty && (
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              ({items.length} item)
            </span>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
            <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <ShoppingCart className="h-7 w-7 text-primary-dark" />
            </div>
            <p className="font-display text-base sm:text-lg font-black text-primary-dark uppercase tracking-tight mb-1.5">
              Keranjang Masih Kosong
            </p>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Yuk mulai belanja produk perawatan kendaraan favoritmu
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary active:scale-[0.98] text-white text-sm font-bold py-3 px-6 rounded-lg transition-all uppercase tracking-wide"
            >
              <ArrowLeft className="h-4 w-4" />
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-3">
              <label className="flex items-center gap-2.5 px-3 sm:px-4 py-3 rounded-xl border-2 border-primary-light cursor-pointer select-none">
                <Checkbox
                  checked={isAllSelected}
                  onClick={() => toggleSelectAll(!isAllSelected)}
                />
                <span className="text-sm font-bold text-primary-dark">
                  Pilih Semua
                </span>
              </label>

              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className={cn(
                    "flex gap-3 p-3 sm:p-4 rounded-xl border-2 bg-white transition-colors",
                    item.selected ? "border-primary-dark" : "border-primary-light"
                  )}
                >
                  <div className="flex items-start pt-1">
                    <Checkbox
                      checked={item.selected}
                      onClick={() => toggleSelect(item.productId, item.size)}
                    />
                  </div>

                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-primary-light shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-primary-dark line-clamp-2 leading-snug">
                        {item.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                        Ukuran: {item.size}
                      </p>
                      <p className="font-heading text-sm sm:text-base font-extrabold text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleDecrease(item.productId, item.size, item.qty)
                          }
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-md border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 transition-all"
                        >
                          <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-primary-dark">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleIncrease(item.productId, item.size, item.qty)
                          }
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-md border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 transition-all"
                        >
                          <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-bold text-primary-dark hidden sm:block">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size)}
                          aria-label="Hapus item"
                          className="h-7 w-7 sm:h-8 sm:w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 active:scale-90 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-xl border-2 border-primary-light p-4 sm:p-5 space-y-4">
                <p className="font-display text-sm sm:text-base font-black text-primary-dark uppercase tracking-tight">
                  Ringkasan Belanja
                </p>

                {/* Status voucher */}
                {voucherApplied ? (
                  <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-secondary bg-secondary-light/40 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-xs sm:text-sm font-bold text-primary-dark">
                        {DISCOUNT_CODE}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-secondary">
                      -{DISCOUNT_PERCENT}%
                    </span>
                  </div>
                ) : isLoggedIn && !isDiscountActive ? (
                  <p className="text-[11px] sm:text-xs text-gray-400 text-center">
                    Voucher diskon sudah tidak berlaku
                  </p>
                ) : !isLoggedIn ? (
                  <p className="text-[11px] sm:text-xs text-gray-400 text-center">
                    Masuk untuk memakai voucher diskon
                  </p>
                ) : null}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Produk dipilih</span>
                    <span>{selectedCount} item</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedTotalPrice)}</span>
                  </div>
                  {voucherApplied && (
                    <div className="flex items-center justify-between text-red-500 font-semibold">
                      <span>Diskon voucher</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Ongkos kirim</span>
                    <span>Dihitung saat checkout</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-primary-light">
                  <span className="text-sm font-bold text-primary-dark">
                    Total
                  </span>
                  <span className="font-heading text-lg sm:text-xl font-extrabold text-primary-dark">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  disabled={selectedCount === 0}
                  className={cn(
                    "w-full text-sm font-bold py-3 rounded-lg transition-all uppercase tracking-wide",
                    selectedCount === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-primary-dark hover:bg-primary active:scale-[0.98] text-white"
                  )}
                >
                  {selectedCount === 0
                    ? "Pilih Produk Dahulu"
                    : `Checkout (${selectedCount})`}
                </button>

                <Link
                  href="/"
                  className="block text-center text-xs sm:text-sm text-gray-500 hover:text-primary-dark transition-colors"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}

function Checkbox({
  checked,
  onClick,
}: {
  checked: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={cn(
        "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all active:scale-90 shrink-0",
        checked
          ? "bg-primary-dark border-primary-dark"
          : "bg-white border-primary-light"
      )}
    >
      {checked && <Check className="h-3.5 w-3.5 text-white" />}
    </button>
  )
}