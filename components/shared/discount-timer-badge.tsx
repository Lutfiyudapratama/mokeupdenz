"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { useDiscountStore } from "@/store/discount-store"
import { cn } from "@/lib/utils"

interface DiscountTimerBadgeProps {
  size?: "sm" | "md"
  className?: string
}

export function DiscountTimerBadge({ size = "sm", className }: DiscountTimerBadgeProps) {
  const isActive = useDiscountStore((s) => s.isActive)
  const remainingMs = useDiscountStore((s) => s.remainingMs)
  const [, forceTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!isActive()) return null

  const ms = remainingMs()
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const label = `${minutes}:${seconds.toString().padStart(2, "0")}`

  if (size === "sm") {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white whitespace-nowrap", className)}>
        <Clock className="h-3 w-3" />
        {label}
      </span>
    )
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs sm:text-sm font-bold text-red-600", className)}>
      <Clock className="h-4 w-4" />
      Diskon berakhir dalam {label}
    </div>
  )
}