import { useRef } from "react"

const reviews = [
  {
    text: "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    name: "RIYA",
  },
  {
    text: "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    name: "RIYA",
  },
  {
    text: "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    name: "RIYA",
  },
  {
    text: "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    name: "RIYA",
  },
]

function ReviewCard({ review }) {
  return (
    <div className="flex aspect-[365/372] w-[300px] shrink-0 flex-col justify-center rounded-tl-[200px] rounded-tr-[200px] rounded-bl-[200px] rounded-br-[45px] bg-white py-8 pr-8 pl-10 shadow-[10px_10px_0_8px_#C6A272] sm:w-[310px] sm:py-[45px] sm:pr-[45px] sm:pl-[54px] md:w-[340px] lg:w-[365px] lg:py-[60px] lg:pr-[60px] lg:pl-[72px]">
      <div className="flex gap-1 text-secondary-3-bg-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} aria-hidden>
            ★
          </span>
        ))}
      </div>

      <p className="mt-4 font-body text-[14px] font-normal leading-[20px] text-primary-default sm:text-[16px] sm:leading-[22px]">
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

  const scrollByCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[0]
    const gap = 40 // matches gap-10
    const distance = card ? card.offsetWidth + gap : 400
    el.scrollBy({ left: direction * distance, behavior: "smooth" })
  }

  return (
   <section className="relative isolate z-20 overflow-hidden">
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
          <h2 className="text-center font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-[48px]">
            The People Have Spoken
          </h2>

<div className="flex shrink-0 items-center gap-0">
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
          screen size. */}
  <img
  src="/heart.svg"
  alt=""
  className="pointer-events-none absolute hidden left-[14%] top-[76%] w-[19%] max-w-[100px] sm:left-[8%] sm:top-[72%] sm:block sm:w-[16%] md:left-[10%] md:top-[72%] md:w-[10%]"
/>
<img
  src="/cookies.svg"
  alt=""
  className="pointer-events-none absolute hidden right-[4%] top-[35%] w-[19%] max-w-[110px] sm:right-[6%] sm:top-[30%] sm:block sm:w-[16%] md:right-[8%] md:top-[30%] md:w-[15%]"
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