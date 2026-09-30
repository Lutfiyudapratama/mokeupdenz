import type { Metadata, Viewport } from "next"
import { Manrope, Rubik } from "next/font/google"
import "./globals.css"
import { GlobalAuthModals } from "@/components/shared/global-auth-modals"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: {
    default: "Denz Auto Detailing | Perawatan Kendaraan Simple, Hasil Maksimal",
    template: "%s | Denz Auto Detailing",
  },
  description:
    "Produk perawatan kendaraan 100% original made in Bandung. Sabun, semir ban, wax, dan perlengkapan detailing untuk hasil kinclong maksimal.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${manrope.variable} ${rubik.variable}`}>
      <body className="antialiased text-gray-900 font-sans">
        {children}
        <GlobalAuthModals />
      </body>
    </html>
  )
}