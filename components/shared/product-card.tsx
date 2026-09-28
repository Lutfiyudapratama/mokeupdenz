"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Zap } from "lucide-react"
import { Product } from "@/types"
import { getPriceInfo } from "@/lib/utils/product"
import { PriceDisplay, DiscountBadge } from "./price-display"
import { ProductQuickAddModal } from "./product-quick-add-modal"

export function ProductCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"cart" | "buy">("cart")
  const { maxDiscount } = getPriceInfo(product)

  function openModal(mode: "cart" | "buy") {
    setModalMode(mode)
    setModalOpen(true)
  }

  return (
    <>
      <div className="group block rounded-xl border-2 border-primary-light bg-white overflow-hidden hover:border-primary-dark hover:shadow-xl transition-all duration-200">
        <Link href={`/products/${product.id}`}>
          {/* Tanpa border bawah, outline hanya di sekeliling card */}
          <div className="aspect-square w-full overflow-hidden bg-primary-light relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-primary-dark text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md">
              {product.categoryLabel}
            </span>
            <DiscountBadge
              percent={maxDiscount}
              prefix="Hemat hingga"
              className="absolute top-2 right-2 shadow-sm"
            />
          </div>
        </Link>

        <div className="p-3 sm:p-4 space-y-2">
          <Link href={`/products/${product.id}`}>
            <p className="text-xs sm:text-sm font-bold text-primary-dark line-clamp-2 leading-snug min-h-[2.4em] hover:text-primary transition-colors">
              {product.name}
            </p>
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 bg-secondary-light px-1.5 py-0.5 rounded-md">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              <span className="text-[11px] font-bold text-primary-dark">
                {product.rating ?? "-"}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
              Terjual {product.sold ?? 0}
            </span>
          </div>

          <PriceDisplay
            product={product}
            className="font-heading text-sm sm:text-lg font-extrabold text-primary leading-tight pt-0.5"
          />

          <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => openModal("cart")}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 border-2 border-primary-dark text-primary-dark hover:bg-primary-light active:scale-95 text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-lg transition-all uppercase tracking-wide"
            >
              <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="truncate">Keranjang</span>
            </button>
            <button
              type="button"
              onClick={() => openModal("buy")}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 border-2 border-primary-dark text-primary-dark hover:bg-primary-light active:scale-95 text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-lg transition-all uppercase tracking-wide"
            >
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
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