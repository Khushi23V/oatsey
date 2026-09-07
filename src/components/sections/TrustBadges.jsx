import { useState } from "react"

const badges = [
  { src: "/badge (3).svg", alt: "Shipped within 24 hours" },
  { src: "/badge (2).svg", alt: "100% secured payments" },
  { src: "/badge (1).svg", alt: "Regular quality checks" },
]

function MobileBadges() {
  const [index, setIndex] = useState(0)

  const step = (direction) => {
    // wraps around in both directions
    setIndex((i) => (i + direction + badges.length) % badges.length)
  }

  return (
    <div className="relative aspect-[375/230] w-full md:hidden">
      <img
        src="/curve.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous badge"
        className="absolute left-[4%] top-[35%] z-10 flex h-[14%] -translate-y-1/2 items-center justify-center"
      >
        <img src="/arrow.svg" alt="" className="h-full w-auto rotate-180" />
      </button>

      <img
        key={badges[index].src}
        src={badges[index].src}
        alt={badges[index].alt}
        className="absolute left-1/2 top-[68%] w-[46%] -translate-x-1/2 -translate-y-1/2"
      />

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next badge"
        className="absolute right-[4%] top-[85%] z-10 flex h-[14%] -translate-y-1/2 items-center justify-center"
      >
        <img src="/arrow.svg" alt="" className="h-full w-auto" />
      </button>
    </div>
  )
}

function TrustBadges() {
  return (
    <section className="pt-0 pb-20 md:py-0">
      <MobileBadges />

      {/* All three at once from md up */}
      <div className="relative hidden aspect-[620/180] w-full md:block">
        <img
          src="/curve.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />

        {badges.map((badge, i) => (
          <img
            key={badge.src}
            src={badge.src}
            alt={badge.alt}
            className="absolute aspect-square top-[45%] w-[15%] -translate-x-1/2 -translate-y-1/2 object-contain"
            style={{ left: ["13%", "48%", "82%"][i] }}
          />
        ))}
      </div>
    </section>
  )
}

export default TrustBadges