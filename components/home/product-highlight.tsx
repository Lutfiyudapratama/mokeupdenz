import { ProductCard } from "@/components/shared/product-card"
import { products } from "@/lib/dummy-data/products"

export function ProductHighlight() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          {/* <span className="h-px w-6 bg-secondary" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-secondary">
            LOREM IPSUM
          </span>
          <span className="h-px w-6 bg-secondary" /> */}
        </div>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-primary-dark uppercase leading-[0.95] tracking-tight">
          PRODUK TERBAIK!< br>
          </br>
          BY DENZ AUTO DETAILING </h2>
        <p className="text-xs sm:text-sm text-black-600 mt-2 font-bold">
         100% Original Made in Bandung, Indonesia.{" "}
          {/* <span className="text-primary font-bold">consectetur adipiscing</span> */}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}