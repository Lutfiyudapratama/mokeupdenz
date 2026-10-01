import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DiscountState {
  claimedAt: number | null
  claim: () => void
  isActive: () => boolean
  remainingMs: () => number
}

const ONE_HOUR = 60 * 60 * 1000

export const useDiscountStore = create<DiscountState>()(
  persist(
    (set, get) => ({
      claimedAt: null,
      claim: () => set({ claimedAt: Date.now() }),
      isActive: () => {
        const { claimedAt } = get()
        if (!claimedAt) return false
        return Date.now() - claimedAt < ONE_HOUR
      },
      remainingMs: () => {
        const { claimedAt } = get()
        if (!claimedAt) return 0
        const left = ONE_HOUR - (Date.now() - claimedAt)
        return left > 0 ? left : 0
      },
    }),
    { name: "denz-discount" }
  )
)