const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Shop", href: "#shop" },
  { label: "Locate Us", href: "#plans" },
  { label: "Contact", href: "#contact" },
]

function Header({ hidden = false }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8 lg:px-15">
        {/* Mobile-only menu icon */}
        <button
          type="button"
          aria-label="Menu"
          className="h-[29px] w-[35px] shrink-0 md:hidden"
        >
          <img src="/menu.svg" alt="" className="h-full w-full" />
        </button>

        <a href="#home" className="shrink-0">
          <img src="/oatsey-logo.svg" alt="Oatsey" className="h-15 w-auto md:h-11 lg:h-15" />
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-15">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-body-md font-regular text-neutral-black transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          
  href="#signup"
  className="group/pill hidden shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-button bg-primary-default py-1.5 pl-5 pr-1.5 text-body-md font-heading transition-transform duration-100 active:scale-[0.97] md:flex"
>
  <span className="relative z-10 text-white transition-colors duration-300 group-hover/pill:text-primary-default">
    SIGN UP
  </span>

  <span className="relative flex h-7 w-7 items-center justify-center transition-transform duration-300 group-hover/pill:translate-x-1">
    <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[10]" />
    <img src="/arrow.svg" alt="" className="relative h-[50%] w-auto" />
  </span>
</a>

        {/* Mobile-only account icon */}
        <a
          
  href="#account"
  aria-label="Account"
  className="h-[50px] w-[50px] shrink-0 cursor-pointer transition-all duration-150 active:scale-[0.94] active:invert md:hidden"
>
  <img src="/login.svg" alt="" className="h-full w-full" />
</a>
      </div>
    </header>
  )
}

export default Header