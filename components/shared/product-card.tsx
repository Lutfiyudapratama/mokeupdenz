"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Zap } from "lucide-react"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils/format"
import { ProductQuickAddModal } from "./product-quick-add-modal"

export function ProductCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"cart" | "buy">("cart")

  function openModal(mode: "cart" | "buy") {
    setModalMode(mode)
    setModalOpen(true)
  }

  return (
    <>
      <div className="group block rounded-xl border-2 border-primary-light bg-white overflow-hidden hover:border-primary-dark hover:shadow-xl transition-all duration-200">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square w-full overflow-hidden bg-primary-light relative border-b-2 border-primary-light group-hover:border-primary-dark transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-primary-dark text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md">
              {product.categoryLabel}
            </span>
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

          <p className="font-heading text-base sm:text-xl font-extrabold text-primary pt-0.5">
            {formatPrice(product.price)}
          </p>

          {/* Dua tombol aksi, responsive: stack di mobile sempit, sejajar di lebih lebar */}
          <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => openModal("cart")}
  className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 border-2 border-primary-dark text-primary-dark hover:bg-primary-light text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-lg transition-colors uppercase tracking-wide">
              <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="truncate">Keranjang</span>
            </button>
            <button
              type="button"
              onClick={() => openModal("buy")}
  className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 border-2 border-primary-dark text-primary-dark hover:bg-primary-light text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-lg transition-colors uppercase tracking-wide">
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