import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { ProductCard } from "@/components/shared/product-card"
import { categories } from "@/lib/dummy-data/categories"
import { products } from "@/lib/dummy-data/products"

export default function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = categories.find((c) => c.slug === params.slug)
  if (!category) return notFound()

  const filteredProducts = products.filter((p) => p.category === params.slug)

  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Header kategori */}
        <div className="mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-secondary" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-secondary">
              KATEGORI
            </span>
          </div>
          <h1 className="font-heading text-xl sm:text-3xl font-extrabold text-primary-dark">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        {/* Grid produk */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <p className="text-sm sm:text-base text-gray-400">
              Belum ada produk di kategori ini.
            </p>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}