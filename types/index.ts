export interface ProductVariant {
  size: string
  price: number     // harga normal (sebelum diskon)
  discount?: number // persen, contoh: 20 = diskon 20%
}

export interface Product {
  id: string
  name: string
  price: number     // harga normal dasar, dipakai kalau produk tanpa variants
  discount?: number // persen, dipakai kalau produk tanpa variants
  image: string
  category: string
  categoryLabel: string
  stock: number
  rating?: number
  sold?: number
  description?: string
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
  price: number // harga akhir per item (setelah diskon)
  size: string
  qty: number
}