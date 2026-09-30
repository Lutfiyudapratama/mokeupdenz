"use client"

import { useState } from "react"
import { Star, Minus, Plus, ShoppingCart, Zap, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils/format"
import { getFinalPrice, getPriceInfo } from "@/lib/utils/product"
import { PriceDisplay, DiscountBadge } from "@/components/shared/price-display"
import { useCartStore } from "@/store/cart-store"
import { useAuthStore } from "@/store/auth-store"
import { useAuthFlowStore } from "@/store/auth-flow-store"
import { cn } from "@/lib/utils"

export function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.variants?.[0]?.size ?? null
  )
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const requireAuth = useAuthFlowStore((s) => s.requireAuth)
  const router = useRouter()

  const variants = product.variants ?? []
  const maxQty = product.stock
  const { maxDiscount } = getPriceInfo(product, isLoggedIn)
  const selectedVariant = variants.find((v) => v.size === selectedSize)

  const base = selectedVariant
    ? {
        price: selectedVariant.price,
        discount: isLoggedIn ? selectedVariant.discount ?? 0 : 0,
      }
    : variants.length === 0
    ? { price: product.price, discount: isLoggedIn ? product.discount ?? 0 : 0 }
    : null

  const unitPrice = base
    ? getFinalPrice(base.price, base.discount, isLoggedIn)
    : null
  const savings = base && unitPrice !== null ? (base.price - unitPrice) * qty : 0
  const isSelectionInvalid = variants.length > 0 && !selectedSize

  function runAction(mode: "cart" | "buy") {
    if (isSelectionInvalid || unitPrice === null) return

    requireAuth(() => {
      addItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: unitPrice,
        size: selectedSize ?? "Reguler",
        qty,
      })

      if (mode === "buy") {
        router.push("/checkout")
        return
      }

      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    })
  }

  return (
    <div>
      {/* Kategori + rating */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-primary-dark text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md">
          {product.categoryLabel}
        </span>
        <DiscountBadge percent={maxDiscount} prefix="Hemat hingga" />
      </div>

      {/* Nama produk */}
      <h1 className="font-display text-xl sm:text-2xl font-black text-primary-dark uppercase tracking-tight leading-snug">
        {product.name}
      </h1>

      {/* Rating & terjual */}
      <div className="flex items-center gap-3 mt-2 mb-4">
        <div className="flex items-center gap-1 bg-secondary-light px-2 py-1 rounded-md">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
          <span className="text-xs font-bold text-primary-dark">
            {product.rating ?? "-"}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Terjual {product.sold ?? 0}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          Stok {product.stock}
        </span>
      </div>

      {/* Harga */}
      <div className="pb-4 border-b border-primary-light">
        <PriceDisplay
          product={product}
          selectedSize={selectedSize}
          className="font-heading text-2xl sm:text-3xl font-extrabold text-primary leading-tight"
        />
      </div>

      {/* Pilih ukuran */}
      {variants.length > 0 && (
        <div className="pt-4">
          <p className="text-sm font-bold text-primary-dark mb-2.5">
            Pilih Ukuran
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const active = selectedSize === v.size
              const discount = isLoggedIn ? v.discount ?? 0 : 0
              return (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedSize(v.size)}
                  className={cn(
                    "relative flex flex-col items-start px-4 py-2.5 rounded-lg border-2 transition-all active:scale-95 text-left",
                    active
                      ? "border-primary-dark bg-primary-dark text-white"
                      : "border-primary-light bg-white text-primary-dark hover:border-secondary"
                  )}
                >
                  <span className="text-sm font-semibold">{v.size}</span>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      active ? "text-white" : "text-primary"
                    )}
                  >
                    {formatPrice(getFinalPrice(v.price, discount, isLoggedIn))}
                  </span>
                  {discount > 0 && (
                    <DiscountBadge
                      percent={discount}
                      className="absolute -top-2 -right-2 shadow-sm"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Jumlah */}
      <div className="pt-5">
        <p className="text-sm font-bold text-primary-dark mb-2.5">Jumlah</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="h-10 w-10 rounded-lg border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 disabled:opacity-30 transition-all"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-base font-bold text-primary-dark">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            disabled={qty >= maxQty}
            className="h-10 w-10 rounded-lg border-2 border-primary-light flex items-center justify-center text-primary-dark hover:border-primary-dark active:scale-90 disabled:opacity-30 transition-all"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mt-5 pt-4 border-t border-primary-light space-y-1.5">
        {isLoggedIn && savings > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Kamu hemat</span>
            <span className="text-sm font-bold text-red-500">
              {formatPrice(savings)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Subtotal</span>
          <span className="font-heading text-xl font-extrabold text-primary-dark">
            {unitPrice !== null ? formatPrice(unitPrice * qty) : "-"}
          </span>
        </div>
      </div>

      {/* Tombol aksi */}
      <div className="flex flex-col xs:flex-row gap-2.5 mt-5">
        <button
          type="button"
          onClick={() => runAction("cart")}
          disabled={isSelectionInvalid}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 uppercase tracking-wide",
            added
              ? "bg-green-600 text-white"
              : isSelectionInvalid
              ? "border-2 border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-2 border-primary-dark text-primary-dark hover:bg-primary-light"
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Ditambahkan
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Keranjang
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => runAction("buy")}
          disabled={isSelectionInvalid}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 uppercase tracking-wide",
            isSelectionInvalid
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary-dark hover:bg-primary text-white"
          )}
        >
          <Zap className="h-4 w-4" /> Beli Sekarang
        </button>
      </div>

      {isSelectionInvalid && (
        <p className="text-center text-xs text-red-500 mt-2">
          Pilih ukuran terlebih dahulu
        </p>
      )}
    </div>
  )
}