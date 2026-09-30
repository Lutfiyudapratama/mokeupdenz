"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Zap } from "lucide-react"

import { Product } from "@/types"
import { getPriceInfo } from "@/lib/utils/product"
import { PriceDisplay, DiscountBadge } from "./price-display"
import { ProductQuickAddModal } from "./product-quick-add-modal"

import { useAuthFlowStore } from "@/store/auth-flow-store"
import { useAuthStore } from "@/store/auth-store"

export function ProductCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"cart" | "buy">("cart")

  const requireAuth = useAuthFlowStore((s) => s.requireAuth)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  // Badge "Hemat hingga X%" cuma dihitung dari harga diskon kalau sudah login
  const { maxDiscount } = getPriceInfo(product, isLoggedIn)

  const href = `/products/${product.id}`

  function openModal(mode: "cart" | "buy") {
    requireAuth(() => {
      setModalMode(mode)
      setModalOpen(true)
    })
  }

  return (
    <>
      <div className="group block overflow-hidden rounded-xl border-2 border-primary-light bg-white transition-all duration-200 hover:border-primary-dark hover:shadow-xl">
        <Link href={href}>
          <div className="relative aspect-square w-full overflow-hidden bg-primary-light">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <span className="absolute left-2 top-2 rounded-md bg-primary-dark px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
              {product.categoryLabel}
            </span>

            <DiscountBadge
              percent={maxDiscount}
              prefix="Hemat hingga"
              className="absolute right-2 top-2 shadow-sm"
            />
          </div>
        </Link>

        <div className="space-y-2 p-3 sm:p-4">
          <Link href={href}>
            <p className="min-h-[2.4em] line-clamp-2 text-xs font-bold leading-snug text-primary-dark transition-colors hover:text-primary sm:text-sm">
              {product.name}
            </p>
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 rounded-md bg-secondary-light px-1.5 py-0.5">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              <span className="text-[11px] font-bold text-primary-dark">
                {product.rating ?? "-"}
              </span>
            </div>
            <span className="text-[11px] font-medium text-gray-400 sm:text-xs">
              Terjual {product.sold ?? 0}
            </span>
          </div>

          <PriceDisplay
            product={product}
            className="pt-0.5 font-heading text-sm font-extrabold leading-tight text-primary sm:text-lg"
          />

          <div className="flex flex-col gap-1.5 pt-0.5 xs:flex-row sm:gap-2">
            <button
              type="button"
              onClick={() => openModal("cart")}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-primary-dark py-2 text-[10px] font-bold uppercase tracking-wide text-primary-dark transition-all hover:bg-primary-light active:scale-95 sm:gap-1.5 sm:py-2.5 sm:text-xs"
            >
              <ShoppingCart className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              <span className="truncate">Keranjang</span>
            </button>

            <button
              type="button"
              onClick={() => openModal("buy")}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-primary-dark py-2 text-[10px] font-bold uppercase tracking-wide text-primary-dark transition-all hover:bg-primary-light active:scale-95 sm:gap-1.5 sm:py-2.5 sm:text-xs"
            >
              <Zap className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              <span className="truncate">Beli Sekarang</span>
            </button>
          </div>
        </div>
      </div>

      <ProductQuickAddModal
        product={product}
        open={modalOpen}
        mode={modalMode}
        onOpenChange={setModalOpen}
      />
    </>
  )
}