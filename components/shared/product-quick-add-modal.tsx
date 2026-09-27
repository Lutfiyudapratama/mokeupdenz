"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, ShoppingCart, Zap, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils/format"
import { useCartStore } from "@/store/cart-store"
import { cn } from "@/lib/utils"

interface ProductQuickAddModalProps {
  product: Product | null
  open: boolean
  mode?: "cart" | "buy"
  onOpenChange: (open: boolean) => void
}

export function ProductQuickAddModal({
  product,
  open,
  mode = "cart",
  onOpenChange,
}: ProductQuickAddModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  // Kontrol mount/unmount supaya animasi keluar sempat jalan sebelum dihapus dari DOM
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
  }, [open])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!shouldRender || !product) return null

  const sizes = product.sizes ?? []
  const maxQty = product.stock
  const isDisabled = sizes.length > 0 && !selectedSize

  function handleConfirm() {
    if (!product || isDisabled) return

    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize ?? "Reguler",
      qty,
    })

    if (mode === "buy") {
      router.push("/checkout")
      return
    }

    setAdded(true)
    setTimeout(() => {
      handleClose()
    }, 800)
  }

  function handleClose() {
    onOpenChange(false)
    setTimeout(() => {
      setSelectedSize(null)
      setQty(1)
      setAdded(false)
    }, 250)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-[2px]",
          isClosing ? "animate-overlay-out" : "animate-overlay-in"
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          "relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden",
          isClosing ? "animate-modal-out" : "animate-modal-in"
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white active:scale-90 flex items-center justify-center text-gray-500 hover:text-primary-dark transition-all shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-3 p-4 sm:p-5 border-b border-primary-light">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-primary-light shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-1">
              {product.categoryLabel}
            </p>
            <p className="text-sm sm:text-base font-bold text-primary-dark leading-snug line-clamp-2">
              {product.name}
            </p>
            <p className="font-heading text-base sm:text-lg font-extrabold text-primary mt-1">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-5 max-h-[50vh] overflow-y-auto">
          {sizes.length > 0 && (
            <div>
              <p className="text-xs sm:text-sm font-bold text-primary-dark mb-2.5">
                Pilih Ukuran
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-3.5 py-2 rounded-lg border-2 text-xs sm:text-sm font-semibold transition-all active:scale-95",
                      selectedSize === size
                        ? "border-primary-dark bg-primary-dark text-white"
                        : "border-primary-light bg-white text-primary-dark hover:border-secondary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs sm:text-sm font-bold text-primary-dark mb-2.5">
              Jumlah
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 disabled:opacity-30 disabled:active:scale-100 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm sm:text-base font-bold text-primary-dark transition-all">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={qty >= maxQty}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 disabled:opacity-30 disabled:active:scale-100 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="text-[11px] sm:text-xs text-gray-400 ml-1">
                Stok: {product.stock}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-primary-light">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              Subtotal
            </span>
            <span className="font-heading text-base sm:text-xl font-extrabold text-primary-dark">
              {formatPrice(product.price * qty)}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 pt-0">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDisabled}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm sm:text-base transition-all active:scale-[0.98] uppercase tracking-wide",
              added
                ? "bg-green-600 text-white"
                : isDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed active:scale-100"
                : "bg-primary-dark hover:bg-primary text-white"
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4 sm:h-5 sm:w-5 animate-in zoom-in duration-200" />
                Berhasil Ditambahkan
              </>
            ) : mode === "buy" ? (
              <>
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                Lanjut ke Checkout
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                Masukkan Keranjang
              </>
            )}
          </button>
          {isDisabled && (
            <p className="text-center text-[11px] sm:text-xs text-red-500 mt-2">
              Pilih ukuran terlebih dahulu
            </p>
          )}
        </div>
      </div>
    </div>
  )
}