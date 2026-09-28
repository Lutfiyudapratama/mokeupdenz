import { ShieldCheck } from "lucide-react"

export function TrustBanner() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-4 sm:mt-8 mb-12 sm:mb-20">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-primary via-primary to-primary-dark text-white p-8 sm:p-14 text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[140%] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-xl bg-white/95 text-primary-dark px-4 py-1.5 mb-6">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wide">
             LOGO
            </span>
          </div>

          <span className="font-heading text-xl sm:text-3xl font-extrabold tracking-tight mb-1">
            LOREM IPSUM
          </span>
          <div className="flex items-center gap-2 mb-7 sm:mb-8">
            <span className="h-px w-5 bg-white/40" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/80 font-semibold">
              DOLOR SIT AMET
            </span>
            <span className="h-px w-5 bg-white/40" />
          </div>

          <h2 className="font-heading text-base sm:text-2xl font-bold leading-snug mb-4 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            <br className="hidden sm:block" />
            Sed do eiusmod tempor incididunt ut labore et dolore.
          </h2>

          <p className="text-sm sm:text-lg italic text-white/80 font-semibold">
            &ldquo;Lorem Ipsum Dolor Sit Amet&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}