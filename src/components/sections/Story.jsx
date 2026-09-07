import { useEffect, useRef, useState } from "react"

// The paragraph is a mix of plain text, inline images and coloured spans, so
// it's built from tokens rather than a single string. Text tokens get split
// into words; images and spans each count as one beat.
const tokens = [
  { type: "text", value: "We started" },
  { type: "node", key: "logo" },
  {
    type: "text",
    value: "because dessert shouldn't mean compromise. Every cookie",
  },
  { type: "node", key: "pill1" },
  { type: "text", value: "is" },
  { type: "node", key: "handmade" },
  { type: "text", value: "in small batches with" },
  { type: "node", key: "oats" },
  { type: "text", value: "and" },
  { type: "node", key: "sugar" },
  { type: "text", value: ". Wholesome enough for every day," },
  { type: "node", key: "pill2" },
  { type: "text", value: "delicious enough for every craving." },
]

const nodes = {
  logo: (
    <img
      src="/oatsey-logo.svg"
      alt="Oatsey"
      className="inline-block h-[1.35em] w-auto align-middle"
    />
  ),
  pill1: (
    <img
      src="/pill1.webp"
      alt=""
      className="inline-block h-[1.15em] w-auto rounded-full align-middle object-cover"
    />
  ),
  pill2: (
    <img
      src="/pill2.webp"
      alt=""
      className="inline-block h-[1.15em] w-auto rounded-full align-middle object-cover"
    />
  ),
  handmade: <span className="font-semibold text-secondary-1-text">handmade</span>,
  oats: <span className="font-semibold text-secondary-3-text">100% oats</span>,
  sugar: (
    <span className="font-semibold text-secondary-2-text">zero refined sugar</span>
  ),
}

function Story() {
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
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Flatten tokens into one list of beats so delays run continuously across
  // text, images and coloured spans alike.
  const beats = []
  tokens.forEach((token, ti) => {
    if (token.type === "text") {
      token.value.split(" ").forEach((word, wi) => {
        beats.push({ id: `${ti}-${wi}`, content: word })
      })
    } else {
      beats.push({ id: token.key, content: nodes[token.key] })
    }
  })

  return (
    <section ref={ref} className="px-6 pt-16 pb-6 md:px-10 md:py-24">
      <p className="mx-auto max-w-4xl text-center text-[24px] font-normal leading-[34px] text-black sm:text-[28px] sm:leading-[40px] md:text-[36px] md:leading-[50px]">
        {beats.map((beat, i) => (
          <span key={beat.id}>
            {/* inline-block so translate works; the space lives outside the
                span as a real text node so wrapping behaves normally */}
            <span
  className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
    revealed
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-3 scale-90 opacity-0"
  }`}
  style={{ transitionDelay: `${i * 60}ms` }}
>
              {beat.content}
            </span>{" "}
          </span>
        ))}
      </p>
    </section>
  )
}

export default Story