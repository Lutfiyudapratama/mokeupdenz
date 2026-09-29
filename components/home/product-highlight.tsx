"use client"

import { Search } from "lucide-react"
import { useState } from "react"

import { ProductCard } from "@/components/shared/product-card"
import { products } from "@/lib/dummy-data/products"

export function ProductHighlight() {
  const [query, setQuery] = useState("")

  const keyword = query.trim().toLowerCase()
  const filteredProducts = keyword
    ? products.filter((product) =>
        String(product.name ?? "").toLowerCase().includes(keyword)
      )
    : products

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
          PRODUK TERBAIK!<br />
          BY DENZ AUTO DETAILING </h2>
        <p className="text-xs sm:text-sm text-black-600 mt-2 font-bold">
         100% Original Made in Bandung, Indonesia.{" "}
          {/* <span className="text-primary font-bold">consectetur adipiscing</span> */}
        </p>

        {/* Kotak Pencarian (dipindah dari Navbar) */}
        <div className="relative mx-auto mt-6 w-full max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-light transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}