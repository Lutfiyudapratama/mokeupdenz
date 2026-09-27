"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Lorem", icon: Home },
  { href: "/products", label: "Ipsum", icon: LayoutGrid },
  { href: "/cart", label: "Dolor", icon: ShoppingCart },
  { href: "/profile", label: "Sit Amet", icon: User },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-secondary-light sm:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-secondary" : "text-gray-400"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}