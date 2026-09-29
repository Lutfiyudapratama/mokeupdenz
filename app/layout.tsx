import type { Metadata, Viewport } from "next"
import { Manrope, Poppins } from "next/font/google"
import "./globals.css"
import { MobileNavigation } from "@/components/layout/mobile-navigation"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "DENZAUTODETAILING",
  description: "Produk perawatan kendaraan 100% original made in Bandung.",
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
    <html lang="id" className={`${manrope.variable} ${poppins.variable}`}>
      <body>
        {children}

       <MobileNavigation />
      </body>
    </html>
  )
}