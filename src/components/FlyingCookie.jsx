import { useEffect, useRef } from "react"

function FlyingCookie() {
  const ref = useRef(null)

  useEffect(() => {
  const el = ref.current
  if (!el) return

  let raf = null
  let lastSource = null

  const update = () => {
    raf = null

    const source = document.querySelector("[data-cookie-source]")
    const target = document.getElementById("flying-cookie-target")
    if (!source || !target) return

    // Clear the previous source if it changed under us
    if (lastSource && lastSource !== source) lastSource.style.opacity = ""
    lastSource = source

      const s = source.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      const scrollY = window.scrollY

      const from = { x: s.left + s.width / 2, y: s.top + s.height / 2 + scrollY, size: s.width }
      const to = { x: t.left + t.width / 2, y: t.top + t.height / 2 + scrollY, size: t.width }

      const endScroll = to.y - window.innerHeight * 0.62
      const raw = scrollY / Math.max(endScroll, 1)
      const p = Math.min(1, Math.max(0, raw))

      // Ease the ends so it accelerates away and decelerates into place,
      // rather than starting and stopping abruptly.
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2

      const cx = Math.min(from.x, to.x) - Math.abs(to.x - from.x) * 0.45
      const cy = (from.y + to.y) / 2

      const inv = 1 - eased
      const x = inv * inv * from.x + 2 * inv * eased * cx + eased * eased * to.x
      const docY = inv * inv * from.y + 2 * inv * eased * cy + eased * eased * to.y
      const size = from.size + (to.size - from.size) * eased

      el.style.width = `${size}px`
      el.style.transform = `translate3d(${x}px, ${docY - scrollY}px, 0) translate(-50%, -50%) rotate(${eased * 380}deg)`
      el.style.opacity = p > 0.004 && p < 0.996 ? "1" : "0"

      source.style.opacity = p > 0.004 ? "0" : ""
      target.style.opacity = p < 0.996 ? "0" : ""
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (lastSource) lastSource.style.opacity = ""
      const target = document.getElementById("flying-cookie-target")
      if (target) target.style.opacity = ""
    }
  }, [])

  return (
    <img
      ref={ref}
      src="/cookie.webp"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full opacity-0"
    />
  )
}

export default FlyingCookie