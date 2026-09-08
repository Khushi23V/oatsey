import { useEffect, useRef, useState } from "react"

const badges = [
  { src: "/badge (3).svg", alt: "Shipped within 24 hours" },
  { src: "/badge (2).svg", alt: "100% secured payments" },
  { src: "/badge (1).svg", alt: "Regular quality checks" },
]

const BADGE_LEFT = ["13%", "48%", "82%"]

function MobileBadges() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [entranceDone, setEntranceDone] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [entering, setEntering] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Roll finishes at 1000 + 1300ms; after that the carousel owns the transform.
  useEffect(() => {
    if (!revealed) return
    const id = setTimeout(() => setEntranceDone(true), 2300)
    return () => clearTimeout(id)
  }, [revealed])

  const step = (dir) => {
    setDirection(dir)
    setEntering(true)
    setIndex((i) => (i + dir + badges.length) % badges.length)
  }

  useEffect(() => {
    if (!entering) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntering(false))
    )
    return () => cancelAnimationFrame(id)
  }, [entering, index])

  // Before the entrance completes, the badge is rolling in from the left.
  // After, the carousel's side-slide takes over.
  const badgeStyle = entranceDone
    ? {
        transform: entering
          ? `translate(calc(-50% + ${direction * 140}%), -50%)`
          : "translate(-50%, -50%)",
        opacity: entering ? 0 : 1,
        transitionDelay: "0ms",
      }
    : {
        transform: revealed
          ? "translate(-50%, -50%) rotate(0deg)"
          : "translate(-320%, -50%) rotate(-540deg)",
        opacity: revealed ? 1 : 0,
        transitionDelay: revealed ? "1000ms" : "0ms",
      }

  return (
    <div
      ref={ref}
      className="relative aspect-[375/230] w-full overflow-hidden md:hidden"
    >
      {/* Curve wipes in left to right, same as desktop */}
      <img
        src="/curve.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-[1300ms] ease-out"
        style={{ clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
      />

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous badge"
        className="absolute left-[4%] top-[35%] z-10 flex h-[14%] -translate-y-1/2 cursor-pointer items-center justify-center transition-transform duration-100 active:scale-90"
      >
        <img src="/arrow.svg" alt="" className="h-full w-auto rotate-180" />
      </button>

      {/* key only changes once the carousel is live — remounting during the
          entrance would restart the roll */}
      <img
        key={entranceDone ? index : "entrance"}
        src={badges[index].src}
        alt={badges[index].alt}
        className={`absolute left-1/2 top-[68%] w-[46%] transition-all ${
          entranceDone
            ? "duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            : "duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        }`}
        style={badgeStyle}
      />

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next badge"
        className="absolute right-[4%] top-[85%] z-10 flex h-[14%] -translate-y-1/2 cursor-pointer items-center justify-center transition-transform duration-100 active:scale-90"
      >
        <img src="/arrow.svg" alt="" className="h-full w-auto" />
      </button>
    </div>
  )
}

function DesktopBadges() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative hidden aspect-[620/180] w-full overflow-hidden md:block"
    >
      {/* Curve wipes in left to right — clip-path rather than a stroke
          animation, since the SVG loads as an img and is a filled band. */}
      <img
        src="/curve.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-contain transition-[clip-path] duration-[1300ms] ease-out"
        style={{
          clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        }}
      />

      {/* Badges roll in from the left once the curve has drawn. The rotation
          runs with the travel so they read as rolling rather than sliding. */}
{badges.map((badge, i) => (
  <div
    key={badge.src}
    className="absolute top-[45%] aspect-square w-[15%] transition-all duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    style={{
      left: BADGE_LEFT[i],
      opacity: revealed ? 1 : 0,
      transform: revealed
        ? "translate(-50%, -50%) rotate(0deg)"
        : "translate(-320%, -50%) rotate(-540deg)",
      transitionDelay: revealed ? `${1000 + i * 260}ms` : "0ms",
    }}
  >
    {/* Hover lives on the inner element so it's free of the entrance's
        transform and its delay — it fires instantly at any time. */}
    <img
      src={badge.src}
      alt={badge.alt}
      className="h-full w-full object-contain transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-110"
    />
  </div>
))}
    </div>
  )
}

function TrustBadges() {
  return (
    <section className="pt-0 pb-20 md:py-0">
      <MobileBadges />
      <DesktopBadges />
    </section>
  )
}

export default TrustBadges