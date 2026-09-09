import { useEffect, useRef, useState } from "react"
import { ColorBar } from "./Flavors"
import { TypedHeading } from "./ProcessSteps"

// Positions are % of the stage, so the scatter scales with the container.
// `clustered` sits tight behind the cookie; `scattered` is where each
// ingredient springs to while the cookie is held aside.
const flavors = [
  {
    name: "OG Chocolate Chip",
    cookie: "/cookie.webp",
    items: [
      { src: "/oats.webp", label: "Rolled oats", clustered: { x: 44, y: 54 }, scattered: { x: 20, y: 70 } },
      { src: "/monk.webp", label: "Monk fruit", clustered: { x: 56, y: 50 }, scattered: { x: 80, y: 44 } },
      { src: "/chocolate.webp", label: "Dark chocolate", clustered: { x: 52, y: 58 }, scattered: { x: 66, y: 76 } },
      { src: "/almond.webp", label: "Almond butter", clustered: { x: 48, y: 44 }, scattered: { x: 52, y: 18 } },
      { src: "/vanilla.webp", label: "Vanilla", clustered: { x: 42, y: 48 }, scattered: { x: 16, y: 34 } },
    ],
  },
  {
    name: "Tasty Tiramisu",
    cookie: "/cookie-4.webp",
    items: [
      { src: "/oats.webp", label: "Rolled oats", clustered: { x: 44, y: 54 }, scattered: { x: 22, y: 72 } },
      { src: "/monk.webp", label: "Monk fruit", clustered: { x: 56, y: 50 }, scattered: { x: 78, y: 40 } },
      { src: "/coffee.webp", label: "Espresso", clustered: { x: 52, y: 58 }, scattered: { x: 70, y: 74 } },
      { src: "/mascarpone.webp", label: "Mascarpone", clustered: { x: 48, y: 44 }, scattered: { x: 50, y: 16 } },
      { src: "/cocoa.webp", label: "Cocoa", clustered: { x: 42, y: 48 }, scattered: { x: 18, y: 36 } },
    ],
  },
  {
    name: "Strawberry Cheesecake",
    cookie: "/cookie-1.webp",
    items: [
      { src: "/oats.webp", label: "Rolled oats", clustered: { x: 44, y: 54 }, scattered: { x: 20, y: 68 } },
      { src: "/monk.webp", label: "Monk fruit", clustered: { x: 56, y: 50 }, scattered: { x: 80, y: 46 } },
      { src: "/strawberry.webp", label: "Strawberries", clustered: { x: 52, y: 58 }, scattered: { x: 68, y: 76 } },
      { src: "/cream_cheese.webp", label: "Cream cheese", clustered: { x: 48, y: 44 }, scattered: { x: 50, y: 18 } },
      { src: "/white.webp", label: "White chocolate", clustered: { x: 42, y: 48 }, scattered: { x: 16, y: 32 } },
    ],
  },
  {
    name: "Blackcurrant Bliss",
    cookie: "/cookie-3.webp",
    items: [
      { src: "/oats.webp", label: "Rolled oats", clustered: { x: 44, y: 54 }, scattered: { x: 22, y: 70 } },
      { src: "/monk.webp", label: "Monk fruit", clustered: { x: 56, y: 50 }, scattered: { x: 78, y: 42 } },
      { src: "/blackcurrant.webp", label: "Blackcurrants", clustered: { x: 52, y: 58 }, scattered: { x: 70, y: 74 } },
      { src: "/cashew.webp", label: "Cashew butter", clustered: { x: 48, y: 44 }, scattered: { x: 48, y: 16 } },
      { src: "/lemon.webp", label: "Lemon zest", clustered: { x: 42, y: 48 }, scattered: { x: 18, y: 34 } },
    ],
  },
  {
    name: "Mango Marvel",
    cookie: "/cookie-2.webp",
    items: [
      { src: "/oats.webp", label: "Rolled oats", clustered: { x: 44, y: 54 }, scattered: { x: 20, y: 72 } },
      { src: "/monk.webp", label: "Monk fruit", clustered: { x: 56, y: 50 }, scattered: { x: 80, y: 44 } },
      { src: "/mango.webp", label: "Dried mango", clustered: { x: 52, y: 58 }, scattered: { x: 68, y: 74 } },
      { src: "/coconut.webp", label: "Coconut", clustered: { x: 48, y: 44 }, scattered: { x: 50, y: 16 } },
      { src: "/cardamom.webp", label: "Cardamom", clustered: { x: 42, y: 48 }, scattered: { x: 16, y: 36 } },
    ],
  },
]

function Ingredients() {
  const stageRef = useRef(null)
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const startRef = useRef({ x: 0, y: 0 })

  const flavor = flavors[index]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const beginDrag = (clientX, clientY) => {
    startRef.current = { x: clientX, y: clientY }
    setDragging(true)
  }

  const moveDrag = (clientX, clientY) => {
    if (!dragging) return
    setOffset({
      x: clientX - startRef.current.x,
      y: clientY - startRef.current.y,
    })
  }

  const endDrag = () => {
    setDragging(false)
    setOffset({ x: 0, y: 0 })
  }

  // Pointer events cover mouse and touch in one path. Listening on window
  // means the drag survives the cursor leaving the cookie.
  useEffect(() => {
    if (!dragging) return

    const onMove = (e) => moveDrag(e.clientX, e.clientY)
    const onUp = () => endDrag()

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [dragging])

  const step = (dir) => {
    endDrag()
    setIndex((i) => (i + dir + flavors.length) % flavors.length)
  }

    return (
  <section ref={sectionRef} className="py-12 md:py-20">
    <ColorBar />

    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-16 md:px-10 md:py-20">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
        {/* Copy — centred on mobile, left-aligned beside the stage on desktop */}
        <div className="md:flex-1">
          <TypedHeading
            lines={["What's Inside"]}
            revealed={revealed}
            className="text-center font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-left md:text-[48px]"
          />

          <p
            className={`mx-auto mt-3 max-w-md text-center font-body text-[13px] leading-[20px] text-black transition-all duration-700 ease-out sm:text-[15px] md:mx-0 md:text-left ${
              revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: revealed ? "200ms" : "0ms" }}
          >
            Drag the cookie aside and see exactly what we put in each flavour,
            ingredient by ingredient.
          </p>


        </div>

        {/* Arrows and stage */}
                {/* Arrows, stage, and the flavour name beneath */}
        <div
          className={`flex w-full flex-col items-center gap-4 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:w-auto md:flex-1 ${
            revealed ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{ transitionDelay: revealed ? "400ms" : "0ms" }}
        >
          <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous flavour"
              className="group/arrow relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#C6A272]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img src="/arrow2.svg" alt="" className="relative h-[45%] w-auto" />
            </button>

            <div
              ref={stageRef}
              className="relative aspect-[440/340] w-full max-w-[400px] touch-none select-none"
            >
              {flavor.items.map((item, i) => {
                const pos = dragging ? item.scattered : item.clustered

                return (
                  <img
                    key={item.src + i}
                    src={item.src}
                    alt={item.label}
                    draggable={false}
                    className="pointer-events-none absolute w-[30%] -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      opacity: dragging ? 1 : 0.9,
                      transitionDelay: dragging ? `${i * 40}ms` : "0ms",
                      zIndex: 1,
                    }}
                  />
                )
              })}

              <img
                id="flying-cookie-target"
                src={flavor.cookie}
                alt={flavor.name}
                draggable={false}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  beginDrag(e.clientX, e.clientY)
                }}
                className={`absolute left-1/2 top-1/2 z-10 w-full cursor-grab rounded-full object-contain drop-shadow-[8px_8px_12px_rgba(64,40,24,0.3)] active:cursor-grabbing ${
                  dragging
                    ? ""
                    : "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                }`}
                style={{
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next flavour"
              className="group/arrow relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#C6A272]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img src="/arrow2.svg" alt="" className="relative h-[45%] w-auto rotate-180" />
            </button>
          </div>

          <p className="text-center font-heading text-[22px] uppercase text-neutral-black sm:text-[28px]">
            {flavor.name}
          </p>
        </div>
      </div>
    </div>

    <ColorBar />
  </section>
)

}

export default Ingredients