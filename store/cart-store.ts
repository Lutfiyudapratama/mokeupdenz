import { create } from "zustand"
import { CartItem } from "@/types"

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, qty: number) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (newItem) => {
    set((state) => {
      const existing = state.items.find(
        (item) =>
          item.productId === newItem.productId && item.size === newItem.size
      )

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === newItem.productId && item.size === newItem.size
              ? { ...item, qty: item.qty + newItem.qty }
              : item
          ),
        }
      }

      return { items: [...state.items, newItem] }
    })
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      ),
    }))
  },

  updateQty: (productId, size, qty) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, qty }
          : item
      ),
    }))
  },

  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.qty, 0)
  },

  totalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
  },
}))