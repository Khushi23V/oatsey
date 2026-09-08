import { useEffect } from "react"
import PillButton from "./PillButton"

// Scattered along the panel's floor, each with its own settle angle so the
// pile looks dropped rather than arranged.
const FALLING = [
  { src: "/11.svg", left: "-6%", size: "w-44", rot: "-14deg", delay: 100 },
  { src: "/12.svg", left: "14%", size: "w-40", rot: "9deg", delay: 240 },
  { src: "/13.svg", left: "28%", size: "w-48", rot: "-6deg", delay: 60 },
  { src: "/14.svg", left: "55%", size: "w-40", rot: "16deg", delay: 320 },
  { src: "/15.svg", left: "70%", size: "w-44", rot: "100deg", delay: 180 },
]

function MobileMenu({ open, onClose, links }) {
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
    <div className="animate-menu-in fixed inset-0 z-[100] flex flex-col overflow-hidden bg-primary-bg md:hidden">
      <div className="flex shrink-0 items-center justify-between px-6 py-5">
  <button
    type="button"
    onClick={onClose}
    aria-label="Close menu"
    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-default text-white transition-transform duration-200 active:scale-90"
  >
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="w-[16px] rotate-45" aria-hidden="true">
      <path d="M0.712746 15.7961C-0.931544 16.9611 1.28756 17.9143 6.64302 18.4157C21.2094 19.6265 32.4843 19.4014 33.3636 17.7635C34.0115 16.5817 32.4435 15.4027 29.266 14.6656C27.3653 14.2583 21.4617 14.1452 15.0005 14.3622C2.45998 14.7937 2.01329 14.8666 0.712746 15.7961Z" fill="currentColor" />
      <path d="M17.716 0.716599C16.5316 -0.913725 15.6048 1.31655 15.1671 6.6776C14.1296 21.2573 14.4887 32.5288 16.137 33.3885C17.3264 34.0224 18.4866 32.4404 19.1859 29.2544C19.5706 27.3489 19.6135 21.4445 19.3197 14.9863C18.7391 2.4518 18.6609 2.006 17.716 0.716599Z" fill="currentColor" />
    </svg>
  </button>

  <img src="/oatsey-logo.svg" alt="Oatsey" className="h-15 w-auto" />
</div>

      <nav className="relative z-10 flex flex-col px-6 pt-2">
        {links.map((link, i) => (
          <a
            key={link.label}
  href={link.href}
  data-concept
  onClick={onClose}
  className="group/link relative flex items-center border-t border-primary-fill/40 py-5 last:border-b"
>
            <span className="font-heading text-[36px] uppercase leading-none text-primary-default transition-transform duration-200 group-active/link:translate-x-2">
              {link.label}
            </span>
          </a>
        ))}
<a
       
  href="#signup"
  data-concept
  onClick={onClose}
  className="group/pill relative mt-8 flex w-fit items-center gap-4 overflow-hidden rounded-button bg-primary-default py-3 pl-7 pr-3 transition-transform duration-100 active:scale-[0.97]"
>
  <span className="relative z-10 font-heading text-[36px] uppercase leading-none text-white transition-colors duration-300 group-hover/pill:text-primary-default">
    Sign Up
  </span>

  <span className="relative flex h-12 w-12 items-center justify-center">
    <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[20]" />
    <img src="/arrow.svg" alt="" className="relative h-[45%] w-auto" />
  </span>
</a>
      </nav>

      {/* Cookies drop after the links have landed and pile along the floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72">
        {FALLING.map((c) => (
          <img
            key={c.src}
            src={c.src}
            alt=""
            className={`animate-cookie-fall absolute bottom-4 ${c.size}`}
            style={{
              left: c.left,
              animationDelay: `${500 + c.delay}ms`,
              "--settle-rot": c.rot,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileMenu