import { useEffect, useState } from "react"
import PillButton from "./PillButton"

// Both layers are positioned against these, so they only need changing here.
const ENVELOPE_H = 260 // pocket height
const CARD_RISE = 50 // where the card comes to rest, measured from the floor

function ConceptModal({ open, onClose }) {
  const [unsealed, setUnsealed] = useState(false)
  const [risen, setRisen] = useState(false)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!open) {
      setUnsealed(false)
      setRisen(false)
      setSettled(false)
      return
    }

    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)

    const html = document.documentElement
    html.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    // A beat of sealed envelope, then the card lifts out, then it drops
    // back and tilts onto the envelope's face.
    const seal = setTimeout(() => setUnsealed(true), 350)
    const front = setTimeout(() => setRisen(true), 1050)
    const rest = setTimeout(() => setSettled(true), 1750)

    return () => {
      document.removeEventListener("keydown", onKey)
      clearTimeout(seal)
      clearTimeout(front)
      clearTimeout(rest)
      html.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[200] flex items-center justify-center px-6 transition-all duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-primary-default/50 backdrop-blur-sm" />

      {/* Wrapper is sized to envelope + rise, so nothing overflows it.
          Everything inside is absolute against this fixed box. */}
      <div
  onClick={(e) => e.stopPropagation()}
  className={`relative w-full max-w-[430px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
    open ? "scale-100 rotate-0" : "scale-75 rotate-[-8deg]"
  }`}
style={{
  height: ENVELOPE_H + CARD_RISE + 70,
  marginTop: CARD_RISE / 2,
}}
>
        {/* Back panel */}
        <div
          className="absolute bottom-0 left-0 w-full rounded-[16px] bg-primary-fill shadow-[10px_10px_0_0_#C6A272]"
          style={{ height: ENVELOPE_H }}
        />

        {/* Card. Lifts past its resting place upright, then drops back and
            tilts — the easing switches to springy for that second beat, which
            is what makes it read as landing rather than continuing. */}
<div
  className={`absolute bottom-0 left-0 w-full rounded-[16px] bg-white px-8 pb-9 pt-8 text-center shadow-lg sm:px-11 ${
    risen ? "z-30" : "z-10"
  } ${
    settled
      ? "transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      : "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
  }`}
  style={{
    transform: settled
      ? `translateY(-${CARD_RISE}px) rotate(-3deg)`
      : unsealed
        ? `translateY(-${CARD_RISE + 70}px) rotate(0deg)`
        : "translateY(-24px) rotate(0deg)",
    transitionDelay: unsealed && !settled ? "450ms" : "0ms",
  }}
>
  <button
    type="button"
    onClick={onClose}
    aria-label="Close"
    className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary-default text-white transition-transform duration-200 hover:rotate-90 active:scale-90"
  >
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="w-[14px] rotate-45" aria-hidden="true">
      <path d="M0.712746 15.7961C-0.931544 16.9611 1.28756 17.9143 6.64302 18.4157C21.2094 19.6265 32.4843 19.4014 33.3636 17.7635C34.0115 16.5817 32.4435 15.4027 29.266 14.6656C27.3653 14.2583 21.4617 14.1452 15.0005 14.3622C2.45998 14.7937 2.01329 14.8666 0.712746 15.7961Z" fill="currentColor" />
      <path d="M17.716 0.716599C16.5316 -0.913725 15.6048 1.31655 15.1671 6.6776C14.1296 21.2573 14.4887 32.5288 16.137 33.3885C17.3264 34.0224 18.4866 32.4404 19.1859 29.2544C19.5706 27.3489 19.6135 21.4445 19.3197 14.9863C18.7391 2.4518 18.6609 2.006 17.716 0.716599Z" fill="currentColor" />
    </svg>
  </button>

  {/* Two hearts, second smaller and counter-rotated so they read as a
      hand-placed pair rather than a duplicated asset */}
  <div className="flex items-end justify-center gap-0">
    <img
      src="/heart.svg"
      alt=""
      className="animate-seal-pulse w-20 -rotate-0 sm:w-24"
    />
    <img
      src="/heart.svg"
      alt=""
      className="w-12 rotate-60 sm:w-14"
    />
  </div>

  <h2 className="mt-5 font-heading text-[24px] uppercase leading-[1.15] text-primary-default sm:text-[28px]">
    This is just
    <br />
    a concept
  </h2>

<p className="mx-auto mt-3 max-w-[300px] font-body text-[13px] font-semibold leading-[20px] text-primary-default sm:text-[14px]">
  Hi! oatsey is a fictional brand concept built by Khushi Verma. If you like what you see, check out the case study, or keep scrolling!
</p>



  <div className="mt-5 flex justify-center">
    <PillButton href="https://www.behance.net/gallery/255487757/oatsey-Cookie-Brand-Identity-UIUX-Case-Study">
      Read The Case Study
    </PillButton>
  </div>
</div>

        {/* Front panel — V-notch top, so the card emerges from a pocket */}
        <div
          className="absolute bottom-0 left-0 z-20 w-full rounded-[16px] bg-primary-bg"
          style={{
            height: ENVELOPE_H,
            clipPath: "polygon(0 0, 50% 42%, 100% 0, 100% 100%, 0 100%)",
          }}
        />

      </div>
    </div>
  )
}

export default ConceptModal