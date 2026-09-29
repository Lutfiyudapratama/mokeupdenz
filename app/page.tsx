"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { TrustBanner } from "@/components/home/trust-banner"
import { CategorySection } from "@/components/home/category-section"
import { ProductHighlight } from "@/components/home/product-highlight"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
// import { RunningText } from "@/components/home/running-text"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-0 bg-white">
      <Navbar />

      <main className="flex-1">
        {/* <RunningText /> */}
        <HeroSection />
        <TrustBanner />
        <CategorySection />
        <ProductHighlight />
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  )
}