import { useEffect, useState } from "react"

const COOKIES = ["/1.svg", "/2.svg", "/3.svg", "/4.svg", "/5.svg"]

function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Let the bounce run for ~2.5s before triggering the fade-out
    const hold = setTimeout(() => setLeaving(true), 2000)
    const done = setTimeout(onDone, 2500)

    return () => {
      clearTimeout(hold)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
        {COOKIES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            /*
             * Sizes:
             * - Mobile: 64px (h-16 w-16)
             * - Desktop: 96px (md:h-24 md:w-24) to 112px (lg:h-28 lg:w-28)
             *
             * Visibility:
             * - Items 0-2 (first 3) are always visible ("block")
             * - Items 3-4 are hidden on mobile and only show from md up ("hidden md:block")
             */
            className={`animate-bounce object-contain h-16 w-16 md:h-24 md:w-24 lg:h-28 lg:w-28 ${
              i >= 3 ? "hidden md:block" : "block"
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader