import { useRef } from "react"

const products = [
  {
    name: "OG Chocolate Chip",
    price: "$25.00",
    reviews: 10,
    box: "/box-chocolate.png",
    cookie: "/cookie.png",
    hoverBg: "hover:bg-primary-fill",
    buttonBg: "bg-primary-default",
  },
  {
    name: "Tasty Tiramisu",
    price: "$25.00",
    reviews: 10,
    box: "/box-tiramisu.png",
    cookie: "/cookie-4.png",
    hoverBg: "hover:bg-primary-default",
    buttonBg: "bg-primary-bg-2",
  },
  {
    name: "Strawberry Cheesecake",
    price: "$25.00",
    reviews: 10,
    box: "/box-strawberry.png",
    cookie: "/cookie-1.png",
    hoverBg: "hover:bg-secondary-1-fill",
    buttonBg: "bg-secondary-1-bg-2",
  },
  {
    name: "Blackcurrant Bliss",
    price: "$25.00",
    reviews: 10,
    box: "/box-blackcurrant.png",
    cookie: "/cookie-3.png",
    hoverBg: "hover:bg-secondary-2-fill",
    buttonBg: "bg-secondary-2-bg-2",
  },
  {
    name: "Mango Marvel",
    price: "$25.00",
    reviews: 10,
    box: "/box-mango.png",
    cookie: "/cookie-2.png",
    hoverBg: "hover:bg-secondary-3-fill",
    buttonBg: "bg-secondary-3-bg-2",
  },
]

function ProductCard({ product }) {
  return (
    <div
      className={`group relative w-[260px] min-h-[380px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-neutral-gray transition-colors duration-300 sm:w-[280px] sm:min-h-[350px] ${product.hoverBg}`}
    >
      <div className="p-6">
        {/* Product image — box packaging by default, cookie photo on hover */}
        <div className="relative mx-auto aspect-square w-full max-w-[150px]">
          <img
            src={product.box}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={product.cookie}
            alt=""
            className="absolute inset-0 h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="mt-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span
              aria-hidden
              className="text-secondary-3-text transition-colors duration-300 group-hover:text-white"
            >
              ★★★★★
            </span>
            <span className="font-body text-[16px] font-normal text-primary-default/70 transition-colors duration-300 group-hover:text-white/80">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="mt-2 font-body text-[20px] font-semibold text-primary-default transition-colors duration-300 group-hover:text-white">
            {product.name}
          </p>

          <p className="mt-1 font-body text-[16px] font-normal text-primary-default/80 transition-colors duration-300 group-hover:text-white/90">
            {product.price}
          </p>
        </div>
      </div>

      {/* Add to cart — grows the card's height on hover instead of overlapping content */}
      <div
        className={`max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-20 ${product.buttonBg}`}
      >
        <div className="py-3 text-center">
          <span className="font-heading text-[20px] text-white">ADD TO CART</span>
        </div>
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
            <h2 className="font-heading text-[32px] uppercase leading-[1.05] text-black sm:text-[40px] md:text-[44px]">
              Eat And Leave No
              <br />
              Crumbs Of Guilt
            </h2>
            <p className="mt-4 max-w-md text-body-md leading-[22px] text-primary-default/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud ex
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous products"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-default text-white transition-opacity hover:opacity-90"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next products"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-default text-white transition-opacity hover:opacity-90"
            >
              ›
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