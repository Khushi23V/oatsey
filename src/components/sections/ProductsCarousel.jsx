import { useEffect, useRef, useState } from "react"

const HEADING_LINES = [
  ["Eat", "And", "Leave", "No"],
  ["Crumbs", "Of", "Guilt"],
]

// Paragraph starts as the last heading word lands.
const paragraphDelay = HEADING_LINES.flat().length * 70

function MinusIcon() {
  return (
    <svg width="34" height="5" viewBox="0 0 34 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px]" aria-hidden="true">
      <path d="M0.532082 1.54221C-1.11221 2.70717 1.10689 3.66039 6.46235 4.16178C21.0287 5.37261 32.3036 5.14753 33.1829 3.50955C33.8309 2.32777 32.2628 1.14879 29.0854 0.411674C27.1846 0.00434568 21.281 -0.10873 14.8199 0.108281C2.27932 0.539812 1.83262 0.612678 0.532082 1.54221Z" fill="currentColor" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px]" aria-hidden="true">
      <path d="M0.712746 15.7961C-0.931544 16.9611 1.28756 17.9143 6.64302 18.4157C21.2094 19.6265 32.4843 19.4014 33.3636 17.7635C34.0115 16.5817 32.4435 15.4027 29.266 14.6656C27.3653 14.2583 21.4617 14.1452 15.0005 14.3622C2.45998 14.7937 2.01329 14.8666 0.712746 15.7961Z" fill="currentColor" />
      <path d="M17.716 0.716599C16.5316 -0.913725 15.6048 1.31655 15.1671 6.6776C14.1296 21.2573 14.4887 32.5288 16.137 33.3885C17.3264 34.0224 18.4866 32.4404 19.1859 29.2544C19.5706 27.3489 19.6135 21.4445 19.3197 14.9863C18.7391 2.4518 18.6609 2.006 17.716 0.716599Z" fill="currentColor" />
    </svg>
  )
}

const BAR = 49

function AddToCartBar({ price }) {
  const [stage, setStage] = useState("idle")
  const [qty, setQty] = useState(1)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const stageIndex = { idle: 0, added: 1, stepper: 2 }[stage]

  const handleAdd = (e) => {
    e.stopPropagation()
    setStage("added")
    setQty(1)
    timerRef.current = setTimeout(() => setStage("stepper"), 800)
  }

  const step = (delta) => (e) => {
    e.stopPropagation()
    const next = qty + delta
    if (next < 1) {
      setStage("idle")
      setQty(1)
    } else {
      setQty(next)
    }
  }

  return (
    <div
      className="shrink-0 overflow-hidden rounded-[10px] bg-primary-bg shadow-md"
      style={{ height: BAR }}
    >
      <div
        className="transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateY(-${stageIndex * BAR}px)` }}
      >
        <button
          type="button"
          onClick={handleAdd}
          tabIndex={stage === "idle" ? 0 : -1}
          className="flex w-full cursor-pointer items-center justify-between px-5 transition-transform duration-100 active:scale-[0.98]"
          style={{ height: BAR }}
        >
          <span className="whitespace-nowrap font-heading text-[16px] uppercase leading-none text-black">
            Add To Cart
          </span>
          <span className="whitespace-nowrap font-body text-[16px] font-semibold leading-none text-black">
            {price}
          </span>
        </button>

        <div
          className="flex items-center justify-center font-heading text-[16px] uppercase leading-none text-black"
          style={{ height: BAR }}
        >
          Added
        </div>

        <div
          className="flex items-center justify-center gap-6"
          style={{ height: BAR }}
        >
          <button
            type="button"
            onClick={step(-1)}
            tabIndex={stage === "stepper" ? 0 : -1}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black text-primary-bg transition-transform duration-100 active:scale-[0.9]"
          >
            <MinusIcon />
          </button>

          <span className="min-w-[20px] text-center font-heading text-[17px] leading-none text-black">
            {qty}
          </span>

          <button
            type="button"
            onClick={step(1)}
            tabIndex={stage === "stepper" ? 0 : -1}
            aria-label="Increase quantity"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black text-primary-bg transition-transform duration-100 active:scale-[0.9]"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

const products = [
  { name: "Strawberry", name2: "Cheesecake", price: "₹299.00", box: "/box-strawberry.webp", cookie: "/cookie-1.webp", bg: "bg-secondary-1-fill" },
  { name: "Blackcurrant", name2: "Bliss", price: "₹299.00", box: "/box-blackcurrant.webp", cookie: "/cookie-3.webp", bg: "bg-secondary-2-fill" },
  { name: "Mango", name2: "Marvel", price: "₹299.00", box: "/box-mango.webp", cookie: "/cookie-2.webp", bg: "bg-secondary-3-fill" },
  { name: "Tasty", name2: "Tiramisu", price: "₹299.00", box: "/box-tiramisu.webp", cookie: "/cookie-4.webp", bg: "bg-primary-fill" },
  { name: "OG Chocolate", name2: "Chip", price: "₹249.00", box: "/box-chocochip.webp", cookie: "/cookie.webp", bg: "bg-primary-bg" },
]

function ProductCard({ product, revealed, index }) {
  return (
    <div
      className={`group relative flex aspect-[390/470] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] px-5 py-8 sm:w-[340px] sm:animate-none sm:opacity-100 lg:w-[390px] lg:px-[27px] lg:py-[40px] ${product.bg} ${
        revealed ? "animate-card-rise" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 160}ms` }}
    >
      <h3 className="mb-4 whitespace-nowrap text-center font-heading text-[24px] uppercase leading-[32px] text-black transition-all duration-300 sm:group-hover:text-[24px] sm:group-hover:leading-[32px] lg:mb-6 lg:text-[32px] lg:leading-[44px]">
        {product.name}
        <br />
        {product.name2}
      </h3>

      {/* Images fill whatever height is left between heading and buttons */}
      <div className="relative min-h-0 flex-1">
        {/* Cookie sits behind the box's top-right corner. Positioned at the
            corner itself (not the stage's edge) so it reads as peeking out. */}
        <img
          src={product.cookie}
          alt=""
          className="absolute left-[68%] top-[32%] z-0 h-[58%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-contain drop-shadow-[6px_6px_8px_rgba(64,40,24,0.35)] transition-all duration-500 sm:left-[76%] sm:top-[28%] sm:h-[38%] sm:group-hover:left-1/2 sm:group-hover:top-1/2 sm:group-hover:h-[110%]"
        />
        {/* Sized by width and centred — object-contain on inset-0 was letting
            height win and shrinking the box to nothing. */}
        <img
          src={product.box}
          alt={`${product.name} ${product.name2}`}
          className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 drop-shadow-[6px_6px_8px_rgba(64,40,24,0.35)] transition-opacity duration-300 sm:w-[85%] sm:group-hover:opacity-0"
        />
      </div>

      <div className="relative z-20 mt-6 flex max-h-[110px] flex-col gap-1.5 overflow-hidden transition-all duration-300 sm:mt-0 sm:max-h-0 sm:group-hover:mt-6 sm:group-hover:max-h-[110px]">
        <AddToCartBar price={product.price} />

        <a
          href="#shop"  data-concept
   
          className="flex h-[49px] shrink-0 items-center justify-between rounded-[10px] border-2 border-primary-bg px-5 shadow-md transition-transform duration-100 active:scale-[0.98]"
        >
          <span className="font-heading   text-[16px] uppercase leading-none text-black">
            View Product
          </span>
          <img src="/arrow3.svg" alt="" className="relative h-[50%] w-auto" />
        </a>
      </div>
    </div>
  )
}

function ProductsCarousel() {
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
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollByCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[0]
    const gap = 24 // matches gap-6
    const distance = card ? card.offsetWidth + gap : 300
    el.scrollBy({ left: direction * distance, behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} className="px-6 py-12 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            {/* Word-level reveal — each line is its own block span, so the
                break lands where intended regardless of how the words fit. */}
            <h2 className="font-heading text-[30px] uppercase leading-[1.05] text-black sm:text-[40px] md:text-[48px]">
              {HEADING_LINES.map((line, li) => {
                // running count so delays continue across the line break
                const offset = HEADING_LINES.slice(0, li).flat().length

                return (
                  <span key={li} className="block">
                    {line.map((word, wi) => (
                      <span
                        key={word}
                        className={`mr-[0.25em] inline-block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          revealed
                            ? "translate-y-0 opacity-100"
                            : "translate-y-3 opacity-0"
                        }`}
                        style={{ transitionDelay: `${(offset + wi) * 70}ms` }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                )
              })}
            </h2>

            <p
              className={`mt-4 max-w-md font-body text-[12px] leading-[18px] text-black transition-all duration-700 ease-out sm:text-body-md sm:leading-[22px] ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${paragraphDelay}ms` }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud ex
            </p>
          </div>

          {/* Arrows are desktop-only — touch users swipe the carousel directly */}
          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous products"
              className="group/arrow relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#C6A272]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img
                src="/arrow2.svg"
                alt=""
                className="relative h-[50%] w-auto transition-transform duration-300 group-hover/arrow:-translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next products"
              className="group/arrow relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.97] active:shadow-[2px_2px_0_0_#C6A272]"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/arrow:scale-100" />
              <img
                src="/arrow2.svg"
                alt=""
                className="relative h-[50%] w-auto rotate-[180deg] transition-transform duration-300 group-hover/arrow:-translate-x-1"
              />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overflow-y-visible pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              revealed={revealed}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsCarousel