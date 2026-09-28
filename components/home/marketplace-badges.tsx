import { ShoppingBag } from "lucide-react"

const marketplaces = [
  { name: "Lazada" },
  { name: "Shopee" },
  { name: "Tokopedia" },
  { name: "Tiktokshop" },
]

export function MarketplaceBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      {marketplaces.map((m) => (
        <div
          key={m.name}
          className="flex items-center gap-2 rounded-xl border border-primary-light bg-white px-4 py-2 shadow-sm hover:border-secondary hover:shadow-md transition-all"
        >
          <ShoppingBag className="h-4 w-4 text-secondary" />
          <span className="text-xs sm:text-sm font-semibold text-primary-dark">
            {m.name}
          </span>
        </div>
      ))}
    </div>
  )
}