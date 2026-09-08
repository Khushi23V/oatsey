import { useState } from "react"

const quickLinks = ["Shop All", "About Us", "Subscription Plans", "FAQs"]
const supportLinks = [
  "Privacy Policy",
  "Shipping Policy",
  "Returns and Refunds",
  "Careers",
  "Contact",
]

function SocialIcon({ children, label }) {
  return (
    <a
      href="#"  data-concept
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
    >
      {children}
    </a>
  )
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-heading text-[15px] uppercase leading-[1.3] text-white sm:text-[20px]">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"  data-concept
              className="font-body text-[14px] text-white/60 transition-colors hover:text-white sm:text-[16px] sm:text-white/80"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EmailSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) {
      setError(true)
      return
    }
    setError(false)
    setSubmitted(true)
  }

  return (
    <div className="relative mt-4">
      {/* Same sweep language as the pill buttons — the fill grows out of the
          submit circle and takes over the whole field on success. */}
      <div
        className={`relative flex h-[52px] w-full items-center overflow-hidden rounded-full border transition-colors ${
          error ? "border-white/70" : "border-white/30"
        } ${submitted ? "border-white" : "focus-within:border-white"}`}
      >
        <span
          className={`absolute right-[6px] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-out ${
            submitted ? "scale-[20]" : "scale-100"
          }`}
        />

        {submitted ? (
          <span className="relative z-10 flex h-full w-full items-center px-5 font-heading text-[13px] uppercase text-primary-default sm:text-[15px]">
            You're in — check your inbox
          </span>
        ) : (
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(false)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter your email address here.."
            className="relative z-10 h-full w-full bg-transparent pl-5 pr-14 font-body text-[16px] text-white placeholder-white/50 outline-none sm:text-[16px]"
          />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted}
          aria-label="Subscribe"
          className="absolute right-[6px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full active:scale-[0.92]"
        >
          <img
            src="/arrow.svg"
            alt=""
            className={`h-[40%] w-auto transition-transform duration-500 ${
              submitted ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {error && (
        <p className="mt-2 pl-5 font-body text-[12px] text-white/70">
          Enter a valid email address
        </p>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 -mt-1 h-[calc(100vh-24px)]">
      <div className="relative isolate flex h-full flex-col overflow-hidden rounded-t-[99px] rounded-b-none bg-primary-default px-6 py-10 md:px-10 md:py-14">
        <img
          src="/footer-bg.svg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />

        {/* Mobile-only stickers — placed asymmetrically so the brown doesn't
            read as flat. Desktop keeps its symmetric pair in the logo row. */}
        <img
          src="/cookies-2.svg"
          alt=""
          className="pointer-events-none absolute left-5 top-[14%] w-25 -rotate-8 opacity-90 sm:hidden"
        />
        <img
          src="/icon.svg"
          alt=""
          className="pointer-events-none absolute right-10 top-[12%] w-25 rotate-9 opacity-90 sm:hidden"
        />

        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between">
          {/* Logo row — flanking stickers are desktop-only */}
          <div className="flex items-center justify-center gap-10 sm:gap-16">
            <img
              src="/cookies-2.svg"
              alt="cookies"
              className="hidden w-16 sm:block md:w-25"
            />

            <div className="text-center">
              <img
                src="/logo-2.svg"
                alt="Oatsey"
                className="mx-auto h-20 w-auto md:h-30"
              />
            </div>

            <img
              src="/icon.svg"
              alt=""
              className="hidden w-16 sm:block md:w-25"
            />
          </div>

          {/* Signup leads on mobile (order-first) so the primary action sits
              directly under the logo; on desktop it returns to the third
              column of the grid. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-10">
            <div className="order-first col-span-2 sm:order-none sm:col-span-1">
              <h3 className="font-heading text-[15px] uppercase leading-[1.3] text-white sm:text-[20px]">
                Join The Oatsey Club Today
              </h3>

              <EmailSignup />

              <div className="mt-5 flex items-center gap-3">
                <SocialIcon label="Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="LinkedIn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <line x1="8" y1="10" x2="8" y2="16" />
                    <circle cx="8" cy="7" r="0.6" fill="currentColor" />
                    <path d="M12 16v-3.5a2 2 0 0 1 4 0V16" />
                    <line x1="12" y1="10" x2="12" y2="16" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="YouTube">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <rect x="3" y="6" width="18" height="12" rx="4" />
                    <path
                      d="M11 10l4 2-4 2z"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </SocialIcon>
                <SocialIcon label="Call us">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path d="M6.5 3.5c1 0 2 2 2 3s-1 1.5-1 2.5 1.5 3.5 3 5 4 3 5 3 1.5-1 2.5-1 3 1 3 2-1.5 2.5-3 2.5c-4 0-11-7-11-11 0-1.5.5-3 2.5-3z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            <LinkColumn title="Quick Links" links={quickLinks} />
            <LinkColumn title="Support" links={supportLinks} />
          </div>

          {/* Bottom line */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="font-body text-[12px] text-white/50 sm:text-[14px]">
              © 2026 oatsey. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer