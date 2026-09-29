"use client"

const MESSAGE =
  "Autocare Paling Worth It — Denz Auto Detailing siap bikin kendaraanmu selalu bersih dan glossy!"

// Satu grup = pesan diulang 3x supaya selalu lebih lebar dari layar (termasuk monitor lebar).
function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 flex-nowrap"
      aria-hidden={hidden || undefined}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-flex shrink-0 items-center gap-3 pr-3 whitespace-nowrap"
        >
          <span className="whitespace-nowrap">{MESSAGE}</span>
          <span className="text-secondary whitespace-nowrap">•</span>
        </span>
      ))}
    </div>
  )
}

export function RunningText() {
  return (
    <div
      className="denz-marquee w-full overflow-hidden bg-primary-dark text-white py-2.5 sm:py-3"
      role="marquee"
      aria-label={MESSAGE}
    >
      <div className="denz-marquee-track flex w-max flex-nowrap whitespace-nowrap font-display text-xs sm:text-sm font-semibold tracking-wide">
        <Group />
        <Group hidden />
      </div>

      {/* "global" agar berlaku juga untuk elemen di komponen Group */}
      <style jsx global>{`
        .denz-marquee-track {
          will-change: transform;
          animation: denzMarquee 45s linear infinite;
        }

        .denz-marquee:hover .denz-marquee-track {
          animation-play-state: paused;
        }

        /* Geser tepat 1 grup (50% dari track) -> loop tanpa loncat */
        @keyframes denzMarquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .denz-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}