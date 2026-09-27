import Link from "next/link"
import * as Icons from "lucide-react"
import { Category } from "@/types"

export function CategoryCard({ category }: { category: Category }) {
  const Icon = (Icons as any)[category.icon] ?? Icons.Package

  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex flex-col items-center gap-2 p-2 sm:p-3 rounded-xl hover:bg-secondary-light/50 transition-colors"
    >
      <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl bg-secondary-light flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </div>
      <span className="text-[11px] sm:text-sm text-center font-semibold text-primary-dark line-clamp-1">
        {category.name}
      </span>
    </Link>
  )
}