import { useState } from "react"
import MobileMenu from "./MobileMenu"


const navLinks = [
  { label: "Home", href: "#home", cookie: "/1.svg", color: "var(--color-primary-fill)" },
  { label: "About Us", href: "#about", cookie: "/2.svg", color: "var(--color-secondary-1-text)" },
  { label: "Shop", href: "#shop", cookie: "/3.svg", color: "var(--color-secondary-2-text)" },
  { label: "Locate Us", href: "#plans", cookie: "/4.svg", color: "var(--color-secondary-3-text)" },
  { label: "Contact", href: "#contact", cookie: "/5.svg", color: "var(--color-primary-fill)" },
]


function Header({ hidden = false, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled ? "shadow-[0_4px_16px_0_rgba(64,40,24,0.08)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8 lg:px-15">
        {/* Mobile-only menu icon */}
        <button
  type="button"
  onClick={() => setMenuOpen(true)}
  aria-label="Menu"
  className="h-[29px] w-[35px] shrink-0 md:hidden"
>
  <img src="/menu.svg" alt="" className="h-full w-full" />
</button>
        <a href="#home"  className="shrink-0">
          <img
            src="/oatsey-logo.svg"
            alt="Oatsey"
            className="h-15 w-auto md:h-11 lg:h-15"
          />
        </a>

        {/* Nav and cart travel together on the right, so justify-between
            leaves the logo alone on the left. */}
        <div className="hidden items-center gap-8 md:flex lg:gap-15">
          <nav className="flex items-center gap-6 lg:gap-15">
            {navLinks.map((link) => (
              <a
               

  key={link.label}
  href={link.href}  data-concept
  style={{ "--hover-color": link.color }}
  className="group/nav relative whitespace-nowrap uppercase font-heading text-body-md text-primary-default"
>

  {/* Letters wobble in sequence and take the link's colour, so the whole
      label reacts to one hover rather than each letter individually. */}
  {link.label.split("").map((char, i) => (
    <span
      key={i}
      className="nav-letter inline-block transition-colors duration-200 group-hover/nav:text-[var(--hover-color)]"
      style={{ animationDelay: `${i * 40}ms` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</a>
            ))}
          </nav>

          {/* Cart — same sweep language as the pill buttons: the fill grows
              from the circle and the icon flips to brown as it lands. */}
          <a
            href="#cart" data-concept
  aria-label="Cart"
  className="group/cart relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.94] active:shadow-[2px_2px_0_0_#C6A272]"
>
            <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/cart:scale-100" />
            <img
              src="/cart.svg"
              alt=""
              className="relative h-[45%] w-auto transition-transform duration-300 group-hover/cart:scale-110"
            />
          </a>
        </div>

       {/* Mobile cart — same treatment as the desktop one */}
<a
  href="#cart"
  data-concept
  aria-label="Cart"
  className="group/cart relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-default shadow-[4px_4px_0_0_#C6A272] transition-all duration-100 active:scale-[0.94] active:shadow-[2px_2px_0_0_#C6A272] md:hidden"
>
  <span className="absolute inset-0 scale-0 rounded-full bg-primary-fill transition-transform duration-500 ease-out group-hover/cart:scale-100" />
  <img src="/cart.svg" alt="" className="relative h-[45%] w-auto" />
</a>
      </div>
      
    </header>
    <MobileMenu
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      links={navLinks}
    />
  </>
  )
}

export default Header