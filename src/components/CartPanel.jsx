import { useEffect } from "react"

function CartPanel({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)

    const html = document.documentElement
    html.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      html.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[150]">
      <div
        onClick={onClose}
        className="absolute inset-0 hidden bg-primary-default/40 backdrop-blur-sm md:block"
      />

      <div className="animate-cart-in absolute inset-0 flex flex-col bg-primary-bg md:left-auto md:w-[440px] md:shadow-[-8px_0_24px_0_rgba(64,40,24,0.15)] lg:w-[500px]">
        <div className="flex shrink-0 items-center justify-between px-6 py-5">
          <p className="font-heading text-[20px] uppercase text-primary-default">
            Your Cart
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-default text-white transition-transform duration-200 active:scale-90"
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="w-[16px] rotate-45" aria-hidden="true">
              <path d="M0.712746 15.7961C-0.931544 16.9611 1.28756 17.9143 6.64302 18.4157C21.2094 19.6265 32.4843 19.4014 33.3636 17.7635C34.0115 16.5817 32.4435 15.4027 29.266 14.6656C27.3653 14.2583 21.4617 14.1452 15.0005 14.3622C2.45998 14.7937 2.01329 14.8666 0.712746 15.7961Z" fill="currentColor" />
              <path d="M17.716 0.716599C16.5316 -0.913725 15.6048 1.31655 15.1671 6.6776C14.1296 21.2573 14.4887 32.5288 16.137 33.3885C17.3264 34.0224 18.4866 32.4404 19.1859 29.2544C19.5706 27.3489 19.6135 21.4445 19.3197 14.9863C18.7391 2.4518 18.6609 2.006 17.716 0.716599Z" fill="currentColor" />
            </svg>
          </button>
        </div>

     <div className="flex min-h-0 flex-1 items-center justify-center px-8 py-4">
  <div className="relative h-full w-full max-w-[300px]">
    <img
      src="/cart-box.svg"
      alt=""
      className="animate-box-pop h-full w-full object-contain"
    />
  </div>
</div>

        <div className="shrink-0 px-6 pb-8 text-center">
  <p className="font-heading text-[22px] uppercase leading-[1.2] text-primary-default sm:text-[26px]">
            Nothing in here
            <br />
            but cobwebs
          </p>

          <p className="mt-2 font-semibold text-[14px] leading-[20px] text-primary-default/70">
            Your cart's feeling a little empty.
          </p>

          <a
            href="#shop"
            data-concept
            onClick={onClose}
            className="group/pill mt-6 inline-flex items-center gap-3 overflow-hidden rounded-button bg-primary-default py-2.5 pl-6 pr-2.5 transition-transform duration-100 active:scale-[0.97]"
          >
            <span className="relative z-10 font-heading text-[16px] uppercase text-white transition-colors duration-300 group-hover/pill:text-primary-default">
              Start Shopping
            </span>
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[20]" />
              <img src="/arrow.svg" alt="" className="relative h-[45%] w-auto" />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CartPanel