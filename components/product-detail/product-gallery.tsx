"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Foto utama */}
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-primary-light border-2 border-primary-light">
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                active === i
                  ? "border-primary-dark"
                  : "border-primary-light opacity-70 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt={`${alt} - foto ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}