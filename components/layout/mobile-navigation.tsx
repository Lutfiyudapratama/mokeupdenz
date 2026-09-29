"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutGrid,
  ShoppingCart,
  User,
  MessageCircle,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const WHATSAPP_NUMBER = "6288802347761"
const CART_COUNT = 0

const items = [
  {
    href: "/",
    label: "Lorem",
    icon: Home,
  },
  {
    href: "/products",
    label: "Ipsum",
    icon: LayoutGrid,
  },
  {
    href: "/cart",
    label: "Dolor",
    icon: ShoppingCart,
  },
  {
    href: "/profile",
    label: "Sit Amet",
    icon: User,
  },
]

export function MobileNavigation() {
  const pathname = usePathname()
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setChatOpen(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Halo Denz Auto Detailing, saya ingin bertanya mengenai produk/layanan."
    )

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    )
  }

  return (
    <>
      {/* =====================================================
          PC / LAPTOP
          ACCOUNT + CHAT + CART
          ===================================================== */}

      <div
        className="
          fixed
          right-6
          bottom-6
          z-[90]
          hidden
          md:block
        "
      >
        <div className="flex flex-col items-center gap-4">

          {/* ACCOUNT */}
          <Link
            href="/profile"
            aria-label="Akun"
            className={cn(
              `
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-primary-light
                bg-white
                text-primary-dark
                shadow-lg
                transition-transform
                duration-200
                hover:scale-105
                active:scale-90
              `,
              pathname === "/profile" &&
                "border-primary-dark"
            )}
          >
            <User className="h-6 w-6" />
          </Link>

          {/* CHAT */}
          <div className="relative">

            {/* CHAT POPUP */}
            {chatOpen && (
              <div
                className="
                  absolute
                  right-[72px]
                  top-1/2
                  z-[100]
                  w-[320px]
                  -translate-y-1/2
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  shadow-2xl
                "
              >
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  aria-label="Tutup chat"
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-500
                    hover:bg-gray-200
                  "
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="p-5 pr-10">
                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-primary-dark
                      "
                    >
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-primary-dark">
                        Butuh bantuan?
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        Ada yang ingin ditanyakan? Silakan chat dengan kami
                        melalui WhatsApp.
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-primary-dark
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                      transition
                      hover:bg-primary
                      active:scale-[0.98]
                    "
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* CHAT BUTTON */}
            <button
              type="button"
              onClick={() =>
                setChatOpen((value) => !value)
              }
              aria-label="Chat"
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-primary-dark
                text-white
                shadow-lg
                transition-transform
                duration-200
                hover:scale-105
                active:scale-90
              "
            >
              <MessageCircle className="h-6 w-6" />

              {!chatOpen && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    z-20
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    bg-sky-400
                    px-1
                    text-[10px]
                    font-bold
                    leading-none
                    text-white
                  "
                >
                  1
                </span>
              )}
            </button>

          </div>

          {/* CART */}
          <Link
            href="/cart"
            aria-label="Keranjang"
            className={cn(
              `
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-primary-light
                bg-white
                text-primary-dark
                shadow-lg
                transition-transform
                duration-200
                hover:scale-105
                active:scale-90
              `,
              pathname === "/cart" &&
                "border-primary-dark"
            )}
          >
            <ShoppingCart className="h-6 w-6" />

            {CART_COUNT > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  z-20
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  leading-none
                  text-white
                  shadow-sm
                "
              >
                {CART_COUNT > 99 ? "99+" : CART_COUNT}
              </span>
            )}
          </Link>

        </div>
      </div>


      {/* =====================================================
          MOBILE
          CHAT SAJA
          ===================================================== */}

      <div
        className="
          fixed
          right-4
          bottom-[78px]
          z-[90]
          md:hidden
        "
      >
        <div className="relative">

          {/* MOBILE CHAT POPUP */}
          {chatOpen && (
            <div
              className="
                absolute
                bottom-16
                right-0
                z-[100]
                w-[280px]
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
              "
            >
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Tutup chat"
                className="
                  absolute
                  right-2
                  top-2
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-500
                  hover:bg-gray-200
                "
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-4 pr-10">
                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary-dark
                    "
                  >
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-primary-dark">
                      Butuh bantuan?
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      Ada yang ingin ditanyakan? Silakan chat dengan kami
                      melalui WhatsApp.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-primary-dark
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    hover:bg-primary
                  "
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat via WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* MOBILE CHAT BUTTON */}
          <button
            type="button"
            onClick={() =>
              setChatOpen((value) => !value)
            }
            aria-label="Chat"
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-primary-dark
              text-white
              shadow-lg
            "
          >
            <MessageCircle className="h-6 w-6" />

            {!chatOpen && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  z-20
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-sky-400
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                1
              </span>
            )}
          </button>

        </div>
      </div>


      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          ===================================================== */}

      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-40
          border-t
          border-secondary-light
          bg-white
          md:hidden
        "
      >
        <div className="grid grid-cols-4">

          {items.map(
            ({ href, label, icon: Icon }) => {
              const active = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    `
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-0.5
                      py-2.5
                      text-[10px]
                      font-medium
                      transition-colors
                    `,
                    active
                      ? "text-secondary"
                      : "text-gray-400"
                  )}
                >
                  <Icon className="h-5 w-5" />

                  <span>{label}</span>
                </Link>
              )
            }
          )}

        </div>
      </nav>
    </>
  )
}