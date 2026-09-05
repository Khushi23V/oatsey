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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-15">
        <a href="#home" className="shrink-0">
          <img src="/oatsey-logo.svg" alt="Oatsey" className="h-8 w-auto md:h-15" />
        </a>

        <nav className="hidden items-center gap-15 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-body-md font-regular text-neutral-black transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#signup"
          className="flex items-center gap-3 rounded-button bg-primary-default py-1.5 pl-5 pr-1.5 text-body-md font-heading text-white transition-opacity hover:opacity-90"
        >
          SIGN UP
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white" />
        </a>
      </div>
    </header>
  )
}

export default Header