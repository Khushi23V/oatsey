import { useEffect, useState } from "react"

const COOKIES = ["/1.svg", "/2.svg", "/3.svg", "/4.svg", "/5.svg"]

function Loader({ onDone }) {
  const [dropping, setDropping] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Wave loops, then the cookies drop out one by one, then the white fades.
    const drop = setTimeout(() => setDropping(true), 1800)
    const fade = setTimeout(() => setLeaving(true), 2500)
    const done = setTimeout(onDone, 3000)

    return () => {
      clearTimeout(drop)
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex touch-none items-center justify-center overflow-hidden bg-white transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2 md:gap-6 lg:gap-8">
        {COOKIES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`h-24 w-24 object-contain md:h-24 md:w-24 lg:h-28 lg:w-28 ${
              dropping ? "animate-cookie-drop" : "animate-cookie-wave"
            } ${i >= 3 ? "hidden md:block" : "block"}`}
            style={{ animationDelay: `${i * (dropping ? 80 : 120)}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader