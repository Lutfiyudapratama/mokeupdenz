export interface ProductVariant {
  size: string
  price: number
  discount?: number
}

export interface Product {
  id: string
  name: string
  price: number
  discount?: number
  image: string
  images?: string[] // galeri foto tambahan, urutan sesuai tampil
  category: string
  categoryLabel: string
  stock: number
  rating?: number
  sold?: number
  description?: string
  highlights?: string[] // poin-poin singkat (opsional)
  variants?: ProductVariant[]
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
  selected: boolean
}