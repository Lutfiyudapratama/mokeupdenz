import type { Metadata, Viewport } from "next"
import { Manrope, Poppins } from "next/font/google"
import "./globals.css"

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
  title: "Lorem Ipsum",
  description: "Lorem ipsum dolor sit amet",
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
      <body className="antialiased text-gray-900 font-sans">
        {children}
      </body>
    </html>
  )
}