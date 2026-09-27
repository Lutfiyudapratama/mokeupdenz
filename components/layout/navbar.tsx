import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-secondary-light">
            <div className="mx-auto max-w-7xl px-3 sm:px-4 h-14 sm:h-16 flex items-center gap-2 sm:gap-6">
                <Link
                    href="/"
                    className="font-heading text-base sm:text-xl font-extrabold text-primary-dark shrink-0 tracking-tight"
                >
                    LOREM IPSUM
                </Link>

                <div className="hidden sm:flex flex-1 relative max-w-xl">
                    <input
                        type="text"
                        placeholder="Lorem ipsum dolor sit amet..."
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-light transition-all"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
                    <Link href="/search" className="sm:hidden p-1">
                        <Search className="h-5 w-5 text-primary-dark" />
                    </Link>
                    <Link href="/cart" className="relative p-1">
                        <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-dark" />
                        <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </Link>
                    <Link href="/profile" className="hidden sm:block">
                        <User className="h-6 w-6 text-primary-dark" />
                    </Link>
                </div>
            </div>
        </header>
    )
}