export function Footer() {
  return (
    <footer className="hidden sm:block mt-10 sm:mt-16 py-10 bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-secondary/40" />

      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between gap-4 text-xs sm:text-sm">
        <div>
          <p className="font-heading font-extrabold text-white mb-1.5 text-base">
            LOREM IPSUM
          </p>
          <p className="text-white/60 max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed.
          </p>
        </div>
        <div className="flex gap-6 text-white/60">
          <span className="hover:text-secondary transition-colors cursor-pointer">Lorem Ipsum</span>
          <span className="hover:text-secondary transition-colors cursor-pointer">Dolor Sit</span>
          <span className="hover:text-secondary transition-colors cursor-pointer">Amet Consectetur</span>
        </div>
      </div>

      <p className="text-center text-white/30 text-[11px] mt-8">
        © 2026 Lorem Ipsum. All rights reserved.
      </p>
    </footer>
  )
}