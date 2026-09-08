import { useEffect, useRef, useState } from "react"
import { TypedHeading } from "./ProcessSteps"

const reviews = [
  {
    text: "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    name: "RIYA",
  },
  {
    text: "Ordered on a Tuesday, ate one warm on Wednesday. The blackcurrant is properly tart, not just sweet with a berry name slapped on it.",
    name: "ADITYA",
  },
  {
    text: "I bake a fair bit myself so I'm picky. These have actual texture — you can feel the oats. Most 'healthy' cookies are just sad and dry.",
    name: "MEHA",
  },
  {
    text: "Bought a box for my mum who's diabetic and very suspicious of desserts. She's now the one placing the reorders.",
    name: "KABIR",
  },
  {
    text: "The mango one sounded like a gimmick and I was ready to be annoyed. It's my favourite of the five. Genuinely didn't expect that.",
    name: "SANA",
  },
  {
    text: "Shipping was same-day like they claim. Box arrived intact, cookies weren't crumbs. That's rarer than it should be.",
    name: "DEV",
  },
]
function ReviewCard({ review }) {
  return (
    // Card moves up and left while the shadow pushes further out — the
    // opposing motion is what reads as lifting off the page.
    <div className="flex aspect-[365/372] w-[300px] shrink-0 flex-col justify-center rounded-tl-[200px] rounded-tr-[200px] rounded-bl-[200px] rounded-br-[45px] bg-white py-8 pr-8 pl-10 shadow-[10px_10px_0_8px_#C6A272] transition-all duration-300 ease-out hover:-translate-x-1 hover:-translate-y-2 hover:shadow-[16px_16px_0_8px_#C6A272] sm:w-[310px] sm:py-[45px] sm:pr-[45px] sm:pl-[54px] md:w-[340px] lg:w-[365px] lg:py-[60px] lg:pr-[60px] lg:pl-[72px]">
      <div className="flex gap-1 text-secondary-3-bg-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} aria-hidden>
            ★
          </span>
        ))}
      </div>

      <p className="mt-4 font-body text-[14px] font-medium leading-[20px] text-primary-default sm:text-[16px] sm:leading-[22px]">
        {review.text}
      </p>

      <div className="mt-6 border-t-2 border-primary-fill/100 pt-4">
        <p className="font-heading text-[20px] text-primary-default lg:text-[24px]">
          {review.name}
        </p>
      </div>
    </div>
  )
}

function ColorBar() {
  return (
    <div className="h-10 w-full overflow-hidden sm:h-12">
      <div className="flex w-max items-center">
        {[...Array(6)].map((_, tileIndex) => (
          <img
            key={tileIndex}
            src="/color marquee.svg"
            alt=""
            className="h-10 w-auto shrink-0 sm:h-12"
          />
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

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

  const scrollByCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[0]
    const gap = 40 // matches gap-10
    const distance = card ? card.offsetWidth + gap : 400
    el.scrollBy({ left: direction * distance, behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} className="relative isolate z-20 overflow-hidden">
      {/* Beige drip background — scaled up slightly for more presence */}
      <img
        src="/review-bg.svg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full origin-bottom scale-110 object-cover object-bottom"
      />

      {/* Static color strip along the top edge */}
      <ColorBar />

      <div className="relative px-6 pt-16 pb-6 md:pt-24 md:pb-8">
        <div className="flex flex-col items-center justify-between gap-10">
          <TypedHeading
            lines={["The People Have Spoken"]}
            revealed={revealed}
            className="text-center font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-[48px]"
          />

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous reviews"
              className="group/arrow relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary-fill shadow-[4px_4px_0_0_#402818] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#402818]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-default transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img
                src="/arrow2.svg"
                alt=""
                className="relative h-[50%] w-auto transition-transform duration-300 group-hover/arrow:-translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next reviews"
              className="group/arrow relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary-fill shadow-[4px_4px_0_0_#402818] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#402818]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-default transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img
                src="/arrow2.svg"
                alt=""
                className="relative h-[50%] w-auto rotate-[180deg] transition-transform duration-300 group-hover/arrow:-translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stickers — positioned against the whole section (which includes the
          carousel below), not just the heading block, so they stay anchored
          to the cards regardless of how tall the heading area is at a given
          screen size. They drift up with opposite rotations so they don't
          read as a matched pair. */}
      <img
        src="/heart.svg"
        alt=""
        className="pointer-events-none absolute left-[14%] top-[76%] hidden w-[19%] max-w-[100px] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-[8%] sm:top-[72%] sm:block sm:w-[16%] md:left-[10%] md:top-[72%] md:w-[10%]"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed
            ? "translateY(0) rotate(0deg)"
            : "translateY(40px) rotate(-18deg)",
          transitionDelay: revealed ? "900ms" : "0ms",
        }}
      />
      <img
        src="/cookies.svg"
        alt=""
        className="pointer-events-none absolute right-[4%] top-[35%] hidden w-[19%] max-w-[110px] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-[6%] sm:top-[30%] sm:block sm:w-[16%] md:right-[8%] md:top-[30%] md:w-[15%]"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed
            ? "translateY(0) rotate(0deg)"
            : "translateY(40px) rotate(16deg)",
          transitionDelay: revealed ? "1100ms" : "0ms",
        }}
      />

      {/* Full-bleed carousel — no section padding, so cards run edge to edge */}
      <div
        ref={scrollRef}
        className="mt-0 flex gap-10 overflow-x-auto py-4 pl-6 sm:gap-20 md:pl-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      <div className="pb-32 md:pb-48" />
    </section>
  )
}

export default Reviews