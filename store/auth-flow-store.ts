import { create } from "zustand"
import { useAuthStore } from "./auth-store"

interface AuthFlowState {
  isLoginOpen: boolean
  isDiscountOpen: boolean
  hasShownDiscount: boolean
  pendingAction: (() => void) | null

  openInitialLogin: () => void
  requireAuth: (action: () => void) => void
  resolveGuest: () => void
  resolveLoginSuccess: () => void
  closeDiscount: () => void
}

export const useAuthFlowStore = create<AuthFlowState>((set, get) => ({
  isLoginOpen: false,
  isDiscountOpen: false,
  hasShownDiscount: false,
  pendingAction: null,

  // Dipanggil sekali setiap web dimuat/direfresh
  openInitialLogin: () => {
    const { isLoggedIn } = useAuthStore.getState()
    if (!isLoggedIn) {
      set({ isLoginOpen: true, pendingAction: null })
    }
  },

  // Dipanggil oleh tombol Keranjang / Beli Sekarang
  requireAuth: (action) => {
    const { isLoggedIn } = useAuthStore.getState()
    if (isLoggedIn) {
      action()
      return
    }
    set({ isLoginOpen: true, pendingAction: action })
  },

  // Pilih "Lanjut sebagai tamu"
  resolveGuest: () => {
    const action = get().pendingAction
    set({ isLoginOpen: false, pendingAction: null })
    action?.()
  },

  // Berhasil login/daftar
  resolveLoginSuccess: () => {
    set({ isLoginOpen: false })
    if (!get().hasShownDiscount) {
      set({ isDiscountOpen: true, hasShownDiscount: true })
    } else {
      const action = get().pendingAction
      set({ pendingAction: null })
      action?.()
    }
  },

  // Modal diskon ditutup
  closeDiscount: () => {
    const action = get().pendingAction
    set({ isDiscountOpen: false, pendingAction: null })
    action?.()
  },
}))