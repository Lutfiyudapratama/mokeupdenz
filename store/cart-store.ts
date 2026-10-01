import { create } from "zustand"
import { CartItem } from "@/types"

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "selected">) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, qty: number) => void
  toggleSelect: (productId: string, size: string) => void
  toggleSelectAll: (selected: boolean) => void
  totalItems: () => number
  totalPrice: () => number
  selectedItems: () => CartItem[]
  selectedTotalPrice: () => number
  isAllSelected: () => boolean
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

      return { items: [...state.items, { ...newItem, selected: true }] }
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

  toggleSelect: (productId, size) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, selected: !item.selected }
          : item
      ),
    }))
  },

  toggleSelectAll: (selected) => {
    set((state) => ({
      items: state.items.map((item) => ({ ...item, selected })),
    }))
  },

  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.qty, 0)
  },

  totalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  selectedItems: () => {
    return get().items.filter((item) => item.selected)
  },

  selectedTotalPrice: () => {
    return get()
      .items.filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  isAllSelected: () => {
    const { items } = get()
    return items.length > 0 && items.every((item) => item.selected)
  },
}))