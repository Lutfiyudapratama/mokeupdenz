export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  categoryLabel: string
  stock: number
  rating?: number
  sold?: number
  description?: string
  sizes?: string[]
}

export interface Category {
  slug: string
  name: string
  icon: string
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  size: string
  qty: number
}