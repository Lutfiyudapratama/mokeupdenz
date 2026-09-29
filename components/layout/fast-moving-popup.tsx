"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"

export function FastMovingPopup() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed right-5 top-20 z-[9999] pt-3 pr-3">
      <div className="relative rounded-lg bg-white p-2 shadow-xl border border-gray-100">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-3 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
          aria-label="Tutup"
        >
          <X size={14} />
        </button>

        <Link href="/products/fast-moving" className="block">
          <div className="relative h-[100px] w-[100px] overflow-hidden rounded bg-gray-50">
            <Image 
              src="/promo-produk.jpg.webp" 
              alt="Promo"
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>
          <div className="mt-1 rounded bg-[#CBA474] py-1 text-center text-[10px] font-bold text-white uppercase">
            Promo Denz <br /> Best Seller
          </div>
        </Link>
      </div>
    </div>
  )
}