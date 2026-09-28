import { Product } from "@/types"

export function getFinalPrice(price: number, discount = 0) {
  return Math.round(price * (1 - discount / 100))
}

export function getPriceInfo(product: Product) {
  const items = product.variants?.length
    ? product.variants
    : [{ price: product.price, discount: product.discount }]

  const finals = items.map((i) => getFinalPrice(i.price, i.discount))
  const discounts = items.map((i) => i.discount ?? 0)

  return {
    min: Math.min(...finals),
    max: Math.max(...finals),
    maxDiscount: Math.max(...discounts),
  }
}