import { create } from "zustand"
import { useAuthStore } from "./auth-store"

type LoginSource = "initial" | "action" | null

interface AuthFlowState {
  isLoginOpen: boolean
  isDiscountOpen: boolean
  hasShownDiscount: boolean
  pendingAction: (() => void) | null
  loginSource: LoginSource

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
  loginSource: null,

  // Dipanggil sekali setiap web dimuat/direfresh.
  // Karena isLoggedIn sekarang tersimpan permanen (localStorage),
  // orang yang sudah pernah login tidak akan melihat modal ini lagi.
  openInitialLogin: () => {
    const { isLoggedIn } = useAuthStore.getState()
    if (!isLoggedIn) {
      set({ isLoginOpen: true, pendingAction: null, loginSource: "initial" })
    }
  },

  // Dipanggil oleh tombol Keranjang / Beli Sekarang
  requireAuth: (action) => {
    const { isLoggedIn } = useAuthStore.getState()
    if (isLoggedIn) {
      action()
      return
    }
    set({ isLoginOpen: true, pendingAction: action, loginSource: "action" })
  },

  // Pilih "Lanjut sebagai tamu"
  resolveGuest: () => {
    const action = get().pendingAction
    set({ isLoginOpen: false, pendingAction: null, loginSource: null })
    action?.()
  },

  // Berhasil login/daftar
  resolveLoginSuccess: () => {
    const { loginSource, hasShownDiscount, pendingAction } = get()

    set({ isLoginOpen: false })

    // Diskon cuma muncul kalau Login dipicu dari refresh awal,
    // dan belum pernah ditampilkan sebelumnya.
    if (loginSource === "initial" && !hasShownDiscount) {
      set({ isDiscountOpen: true, hasShownDiscount: true, loginSource: null })
      return
    }

    set({ pendingAction: null, loginSource: null })
    pendingAction?.()
  },

  // Modal diskon ditutup
  closeDiscount: () => {
    const action = get().pendingAction
    set({ isDiscountOpen: false, pendingAction: null, loginSource: null })
    action?.()
  },
}))