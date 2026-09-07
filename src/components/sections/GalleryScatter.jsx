import { useEffect, useRef, useState } from "react"

// Order matters — this is the sequence they pop in, alternating between
// cookies and the small doodles so it reads as scattered rather than swept.
const items = [
  { src: "/cookie-4.webp", left: "11%", top: "25%", width: "28%", cookie: true },
  { src: "/cheesecake.svg", left: "53%", top: "33%", width: "14%" },
  { src: "/cookie.webp", left: "90%", top: "38%", width: "28%", cookie: true },
  { src: "/milk.svg", left: "13%", top: "71%", width: "16%" },
  { src: "/cookie-3.webp", left: "50%", top: "78%", width: "30%", cookie: true },
  { src: "/blueberry.svg", left: "89%", top: "79%", width: "14%" },
]

function GalleryScatter() {
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
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-6 pt-6 pb-16 md:px-10 md:py-0">
      <div className="relative mx-auto aspect-[432/290] w-full max-w-4xl">
        {items.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt=""
            // Each item is centred on its own position with -translate-1/2,
            // so the pop scale has to compose with that translate — hence
            // both live in the same style block rather than as classes.
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              item.cookie ? "aspect-square object-cover" : ""
            }`}
            style={{
              left: item.left,
              top: item.top,
              width: item.width,
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "translate(-50%, -50%) scale(1) rotate(0deg)"
                : `translate(-50%, -50%) scale(0.4) rotate(${i % 2 ? 12 : -12}deg)`,
              transitionDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default GalleryScatter