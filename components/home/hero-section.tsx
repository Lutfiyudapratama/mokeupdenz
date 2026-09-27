import { MarketplaceBadges } from "./marketplace-badges"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-light rounded-bl-[80px]" />
      <div className="absolute top-10 right-10 h-24 w-24 rounded-xl bg-secondary/10 rotate-12 hidden sm:block" />
      <div className="absolute bottom-8 left-8 h-16 w-16 rounded-xl bg-primary-dark/5 -rotate-12 hidden sm:block" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-primary-dark">
              LOREM IPSUM
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="h-px w-5 bg-secondary" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-secondary">
                DOLOR SIT AMET
              </span>
              <span className="h-px w-5 bg-secondary" />
            </div>
          </div>
        </div>

        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark leading-[1.15] mb-4">
          Lorem Ipsum Dolor Sit Amet
          <br />
          <span className="text-secondary">Consectetur Adipiscing Elit</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <p className="text-xs sm:text-sm font-bold text-primary mb-6 tracking-wide">
          LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT
        </p>

        <MarketplaceBadges />
      </div>
    </section>
  )
}