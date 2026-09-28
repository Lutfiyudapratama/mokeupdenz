import { CategoryCard } from "@/components/shared/category-card"
import { categories } from "@/lib/dummy-data/categories"

export function CategorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 bg-secondary" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-secondary">
            KATEGORI
          </span>
          <span className="h-px w-6 bg-secondary" />
        </div>
        <h2 className="font-heading text-lg sm:text-3xl font-extrabold text-primary-dark leading-snug">
          Belanja Sesuai Kebutuhan
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 bg-white rounded-xl border-2 border-primary-light p-3 sm:p-6 shadow-sm">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  )
}