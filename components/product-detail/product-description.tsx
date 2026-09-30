import { Product } from "@/types"
import { CheckCircle2 } from "lucide-react"

export function ProductDescription({ product }: { product: Product }) {
  if (!product.description && !product.highlights?.length) return null

  return (
    <section className="mt-10 pt-8 border-t border-primary-light">
      <h2 className="font-display text-lg sm:text-xl font-black text-primary-dark uppercase tracking-tight mb-4">
        Deskripsi Produk
      </h2>

      {product.description && (
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
          {product.description}
        </p>
      )}

      {product.highlights && product.highlights.length > 0 && (
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-3xl">
          {product.highlights.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}