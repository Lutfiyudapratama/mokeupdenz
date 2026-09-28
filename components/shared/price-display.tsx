import { Product } from "@/types"
import { formatPrice } from "@/lib/utils/format"
import { getFinalPrice, getPriceInfo } from "@/lib/utils/product"
import { cn } from "@/lib/utils"

export function DiscountBadge({
  percent,
  prefix,
  className,
}: {
  percent: number
  prefix?: string
  className?: string
}) {
  if (percent <= 0) return null

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white whitespace-nowrap",
        className
      )}
    >
      {prefix ? `${prefix} ` : "-"}
      {percent}%
    </span>
  )
}

interface PriceDisplayProps {
  product: Product
  selectedSize?: string | null
  className?: string
}

export function PriceDisplay({
  product,
  selectedSize,
  className,
}: PriceDisplayProps) {
  const variant = selectedSize
    ? product.variants?.find((v) => v.size === selectedSize)
    : undefined

  // Ukuran dipilih: harga pasti + harga coret + badge persen
  if (variant) {
    const discount = variant.discount ?? 0
    return (
      <div>
        <p className={className}>
          {formatPrice(getFinalPrice(variant.price, discount))}
        </p>
        {discount > 0 && (
          <p className="mt-0.5 flex items-center gap-1.5">
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(variant.price)}
            </span>
            <DiscountBadge percent={discount} />
          </p>
        )}
      </div>
    )
  }

  // Belum dipilih: rentang harga akhir (termurah - termahal)
  const { min, max } = getPriceInfo(product)

  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span className="whitespace-nowrap">{formatPrice(min)}</span>
      {min !== max && (
        <>
          <span aria-hidden="true">-</span>
          <span className="whitespace-nowrap">{formatPrice(max)}</span>
        </>
      )}
    </p>
  )
}