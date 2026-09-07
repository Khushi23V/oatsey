import { useEffect, useRef, useState } from "react"

const ROW = 48 // height of one state row; all three must match
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


function AddToCart({ buttonBg, iconColor }) {
  // idle → added → stepper, each a row in a vertically sliding stack
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
    <div className={`overflow-hidden ${buttonBg}`} style={{ height: ROW }}>
      <div
        className="transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateY(-${stageIndex * ROW}px)` }}
      >
        {/* Row 1 — idle */}
        <button
          type="button"
          onClick={handleAdd}
          tabIndex={stage === "idle" ? 0 : -1}
          className="flex w-full cursor-pointer items-center justify-center font-heading text-[20px] text-white transition-transform duration-100 active:scale-[0.97]"
          style={{ height: ROW }}
        >
          ADD TO CART
        </button>

        {/* Row 2 — confirmation */}
        <div
          className="flex items-center justify-center font-heading text-[20px] text-white"
          style={{ height: ROW }}
        >
          ADDED
        </div>

        {/* Row 3 — stepper */}
        <div
          className="flex items-center justify-center gap-6"
          style={{ height: ROW }}
        >
          <button
  type="button"
  onClick={step(-1)}
  tabIndex={stage === "stepper" ? 0 : -1}
  aria-label="Decrease quantity"
  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white transition-transform duration-100 active:scale-[0.9] ${iconColor}`}
>
  <MinusIcon />
</button>
          <span className="min-w-[20px] text-center font-heading text-[20px] text-white">
            {qty}
          </span>

          <button
  type="button"
  onClick={step(1)}
  tabIndex={stage === "stepper" ? 0 : -1}
  aria-label="Increase quantity"
  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white transition-transform duration-100 active:scale-[0.9] ${iconColor}`}
>
  <PlusIcon />
</button>
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    name: "OG Chocolate Chip",
    price: "$25.00",
    reviews: 10,
    box: "/box-chocolate.webp",
    cookie: "/cookie.webp",
    // Mobile: this is the card's default background. Desktop: hover only.
    bg: "bg-primary-fill",
    hoverBg: "sm:hover:bg-primary-fill",
    buttonBg: "bg-primary-default",
    iconColor: "text-primary-default",
  },
  {
    name: "Tasty Tiramisu",
    price: "$25.00",
    reviews: 10,
    box: "/box-tiramisu.webp",
    cookie: "/cookie-4.webp",
    bg: "bg-primary-default",
    hoverBg: "sm:hover:bg-primary-default",
    buttonBg: "bg-primary-bg-2",
    iconColor: "text-primary-bg-2",
  },
  {
    name: "Strawberry Cheesecake",
    price: "$25.00",
    reviews: 10,
    box: "/box-strawberry.webp",
    cookie: "/cookie-1.webp",
    bg: "bg-secondary-1-fill",
    hoverBg: "sm:hover:bg-secondary-1-fill",
    buttonBg: "bg-secondary-1-bg-2",
    iconColor: "text-secondary-1-bg-2",
  },
  {
    name: "Blackcurrant Bliss",
    price: "$25.00",
    reviews: 10,
    box: "/box-blackcurrant.webp",
    cookie: "/cookie-3.webp",
    bg: "bg-secondary-2-fill",
    hoverBg: "sm:hover:bg-secondary-2-fill",
    buttonBg: "bg-secondary-2-bg-2",
    iconColor: "text-secondary-2-bg-2",
  },
  {
    name: "Mango Marvel",
    price: "$25.00",
    reviews: 10,
    box: "/box-mango.webp",
    cookie: "/cookie-2.webp",
    bg: "bg-secondary-3-fill",
    hoverBg: "sm:hover:bg-secondary-3-fill",
    buttonBg: "bg-secondary-3-bg-2",
    iconColor: "text-secondary-3-bg-2",
  },
]


function ProductCard({ product }) {
  return (
    // Mobile shows the "open" state permanently — coloured card, cookie photo,
    // and Add to Cart all visible, so nothing costs a tap. From sm up the card
    // resets to grey/packaging and the same look returns on hover.
    <div
      className={`group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-[20px] transition-colors duration-300 sm:min-h-[350px] sm:w-[280px] sm:bg-neutral-gray ${product.bg} ${product.hoverBg}`}
    >
      <div className="p-6">
        <div className="relative mx-auto aspect-square w-full max-w-[150px]">
          <img
            src={product.box}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 sm:opacity-100 sm:group-hover:opacity-0"
          />
          <img
            src={product.cookie}
            alt=""
            className="absolute inset-0 h-full w-full rounded-full object-cover opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
          />
        </div>

        <div className="mt-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span
              aria-hidden
              className="text-white transition-colors duration-300 sm:text-secondary-3-text sm:group-hover:text-white"
            >
              ★★★★★
            </span>
            <span className="font-body text-[12px] font-normal text-white/80 transition-colors duration-300 sm:text-[16px] sm:text-black sm:group-hover:text-white/80">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="mt-2 font-body text-[14px] font-semibold text-white transition-colors duration-300 sm:text-[20px] sm:text-black sm:group-hover:text-white">
            {product.name}
          </p>

          <p className="mt-1 font-body text-[12px] font-normal text-white/90 transition-colors duration-300 sm:text-[16px] sm:text-black sm:group-hover:text-white/90">
            {product.price}
          </p>
        </div>
      </div>

      {/* Always open on mobile; on desktop it grows the card's height on hover */}

<div className="max-h-20 overflow-hidden transition-all duration-300 sm:max-h-0 sm:group-hover:max-h-20">
 <AddToCart buttonBg={product.buttonBg} iconColor={product.iconColor} />

      </div>
    </div>
  )
}

function ProductsCarousel() {
  const scrollRef = useRef(null)

  const scrollByCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.firstChild
    const gap = 24 // matches gap-6
    const distance = card ? card.offsetWidth + gap : 300
    el.scrollBy({ left: direction * distance, behavior: "smooth" })
  }

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-[clamp(14px,5vw,50px)] uppercase leading-[1.05] text-black sm:text-[40px] md:text-[44px]">
              Eat And Leave No
              <br />
              Crumbs Of Guilt
            </h2>
            <p className="mt-4 max-w-md font-body text-[12px] leading-[18px] text-black sm:text-body-md sm:leading-[22px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud ex
            </p>
          </div>

          {/* Arrows are desktop-only — touch users swipe the carousel directly */}
         {/* Arrows are desktop-only — touch users swipe the carousel directly */}
<div className="hidden shrink-0 items-center gap-0 sm:flex">
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
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsCarousel