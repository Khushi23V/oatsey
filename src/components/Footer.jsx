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
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
    >
      {children}
    </a>
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

        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between">
          {/* Logo row with flanking stickers */}
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
                className="mx-auto h-12 w-auto md:h-30"
              />

            </div>

            <img
              src="/icon.svg"
              alt=""
              className="hidden w-16 sm:block md:w-25"
            />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="font-heading text-[20px] uppercase text-white">
                Quick Links
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[16px] text-white/80 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-[20px] uppercase text-white">
                Support
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[16px] text-white/80 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-[20px] uppercase text-white">
                Join The Oatsey Club Today
              </h3>
              <input
                type="email"
                placeholder="Enter your email address here.."
                className="mt-4 w-full rounded-full border border-white/30 bg-transparent px-5 py-3 font-body text-[16px] text-white placeholder-white/60 outline-none focus:border-white"
              />

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
                    <path d="M11 10l4 2-4 2z" fill="currentColor" stroke="none" />
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
          </div>

          {/* Bottom line */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="font-body text-[14px] text-white/60">
              © 2026 oatsey. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer