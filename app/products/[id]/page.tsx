import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { ProductGallery } from "@/components/product-detail/product-gallery"
import { ProductInfo } from "@/components/product-detail/product-info"
import { ProductCard } from "@/components/shared/product-card"
import { products } from "@/lib/dummy-data/products"
import { ProductDescription } from "@/components/product-detail/product-description"
import { FloatingActions } from "@/components/layout/floating-actions"

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = products.find((p) => String(p.id) === id)
  if (!product) return notFound()

  const gallery = product.images?.length ? product.images : [product.image]

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={gallery} alt={product.name} />
            <ProductInfo product={product} />
          </div>

          <ProductDescription product={product} />

          {relatedProducts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-primary-light">
              <h2 className="font-display text-lg sm:text-xl font-black text-primary-dark uppercase tracking-tight mb-5">
                Produk Serupa
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <FloatingActions />
    </div>
  )
}