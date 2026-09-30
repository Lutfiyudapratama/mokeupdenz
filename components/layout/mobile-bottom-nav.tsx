"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingCart, User } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Produk",
      href: "/produk",
      icon: Package,
    },
    {
      label: "Keranjang",
      href: "/keranjang",
      icon: ShoppingCart,
      badge: 0,
    },
    {
      label: "Akun",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[90] flex h-[68px] items-center justify-around border-t border-gray-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex h-full min-w-[65px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-200 ${
              active
                ? "text-brand-700"
                : "text-gray-500 hover:text-brand-700"
            }`}
          >
            <span className="relative">
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />

              {/* CART BADGE */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </span>

            <span>{item.label}</span>

            {/* ACTIVE INDICATOR */}
            {active && (
              <span className="absolute bottom-1 h-1 w-5 rounded-full bg-brand-700" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}