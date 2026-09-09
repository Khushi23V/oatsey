import { useEffect, useState } from "react"
import PillButton from "../PillButton"

const mobileCookies = [
  // left, entering below the heading
  { src: "/cookie-home2.svg", left: "-17%", top: "44%", width: "48%", spin: 0.12 },
  // bottom left, partly off-screen
  { src: "/cookie-home.svg", left: "-30%", top: "72%", width: "74%", spin: -0.09  },
  // bottom anchor — oversized so it clips both side edges
  { src: "/cookie-home3.svg", left: "85%", top: "43%", width: "105%", centered: true, spin: 0.06 },
]

const HEALTHY_WORDS = ["healthy", "guilt-free", "tasty"]

const WOBBLE_COLORS = [
  "var(--color-primary-fill)",
  "var(--color-secondary-1-text)",
  "var(--color-secondary-2-text)",
  "var(--color-secondary-3-text)",
]

// The slot is rotated -90deg by the healthy-pop keyframe, so the clip window
// and the sliding stack live INSIDE that rotation — moving the stack along
// its local Y axis reads as bottom-to-top against the rotated text.
function HealthySlot({ ready, sizeClass }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HEALTHY_WORDS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={`absolute left-1/2 top-1/2 whitespace-nowrap font-heading tracking-wide text-primary-fill opacity-0 ${sizeClass} ${
        ready ? "animate-healthy-pop" : ""
      }`}
    >
      {/* 1. Increased from h-[1em] to h-[1.25em] and adjusted translateY calculation */}
      <span className="block h-[1.25em] cursor-pointer overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-120">
        <span
          className="block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateY(-${index * 1.25}em)` }}
        >
          {HEALTHY_WORDS.map((word) => (
            <span key={word} className="flex h-[1.25em] items-center justify-center">
              {word}
            </span>
          ))}
        </span>
      </span>
    </span>
  )
}

function WobbleText({ text }) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="letter-wobble inline-block cursor-pointer transition-colors duration-200"
      style={{ "--hover-color": WOBBLE_COLORS[i % WOBBLE_COLORS.length] }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}
function MobileHero({ ready }) {
  const [scrollY, setScrollY] = useState(0)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The entrance pop and the scroll rotation both write to `transform`, so
  // they can't run at once. The pop for the third cookie finishes at ~860ms
  // (260ms delay + 600ms duration); after that the rotation takes over.
  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => setEntered(true), 900)
    return () => clearTimeout(id)
  }, [ready])

  return (
    <div className="md:hidden">
      <div className="relative h-screen w-full">
        {/* Cookies stagger in once the loader hands over. opacity-0 holds them
            hidden until then; the centred one needs its own keyframe so the
            translate isn't lost to the scale transform. */}
       {mobileCookies.map((c, i) => {
  const spinning = entered

  return (
    <img
  key={c.src}
  src={c.src}
      alt=""
      className={`absolute max-w-none ${spinning ? "" : "opacity-0"} ${
        spinning
          ? ""
          : ready
            ? c.centered
              ? "animate-cookie-pop-centered"
              : "animate-cookie-pop"
            : c.centered
              ? "-translate-x-1/2"
              : ""
      }`}
      style={{
        left: c.left,
        top: c.top,
        width: c.width,
        animationDelay: `${i * 130}ms`,
        ...(spinning && {
          opacity: 1,
          transform: `${c.centered ? "translateX(-50%) " : ""}rotate(${
            scrollY * c.spin
          }deg)`,
        }),
      }}
    />
  )
})}

        {/* Heading — the slot is inline in the gap, sized in em so it tracks
            the heading and stays centred between SAY and COOKIES. The spacer
            opens on load, then the word drops into the space it made. */}
        <h1 className="absolute left-[49.9%] top-[18%] z-10 w-[84.3%] -translate-x-1/2 text-center text-[clamp(28px,9vw,36px)] font-normal leading-[1.389] tracking-tight text-primary-default">
          DID SOMEONE
          <br />
          SAY
          <span
            className={`relative inline-block align-middle ${
              ready ? "animate-gap-open" : "w-0"
            }`}
          >
            <HealthySlot ready={ready} sizeClass="text-[0.30em]" />
          </span>
          COOKIES?
        </h1>

       <p className="absolute left-[48.6%] top-[34%] z-10 w-[71.9%] -translate-x-1/2 text-center font-body text-[12px] font-normal leading-[16px] text-neutral-black">
          Cookies made from oats, not shortcuts. No refined flour, no refined
          sugar, just small batches.
        </p>
<a href="#shop" data-concept className="group/pill absolute left-[31.3%] top-[41%] z-10 inline-flex h-[38px] items-center gap-3 overflow-hidden rounded-button bg-primary-default pl-[18px] pr-[7px] font-heading text-[12px] transition-transform duration-100 active:scale-[0.97]"
        >
          <span className="relative z-10 text-white transition-colors duration-300 group-hover/pill:text-primary-default">
            SHOP NOW
          </span>

          <span className="relative flex aspect-square h-[24px] items-center justify-center text-[10px] transition-transform duration-300 group-hover/pill:translate-x-1">
            <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[10]" />
            <img src="/arrow.svg" alt="" className="relative h-[50%] w-auto" />
          </span>
        </a>
      </div>

      {/* Room for the lower part of the bottom cookie */}
      <div className="h-[30vw]" />
    </div>
  )
}

function DesktopHero({ ready }) {
  const [entered, setEntered] = useState(false)

  // The last cookie's pop ends at ~860ms (260ms delay + 600ms duration).
  // Handing over to the hover transition after that keeps the two
  // transform-writers from fighting.
  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => setEntered(true), 900)
    return () => clearTimeout(id)
  }, [ready])

const cookieClass = entered
  ? "rotate-[21deg]"
  : ready
    ? "animate-cookie-pop-21 opacity-0"
    : "rotate-[21deg] opacity-0"

  return (
    <div className="hidden md:block">
      <div className="relative mx-auto w-full max-w-5xl lg:max-w-[1040px]">
        {/* @container: everything inside sizes in cqw (% of the CARD's width)
            using the Figma ratios, so the whole composition scales with the
            card instead of the viewport. */}
        <div className="@container relative aspect-[1040/420] rounded-tl-[316.5px] rounded-tr-[316.5px] rounded-bl-[316.5px] rounded-br-[45px] bg-white shadow-[0px_4px_20px_0px_#c6a272]">
          {/* The 21deg rotation lives in the keyframe, then in the hover rule —
              never as a class once either is active, since both own transform. */}
          <img
            src="/cookie-1.webp"
            alt=""
            className={`absolute left-[-11.7%] top-[8.4%] z-10 w-[35.7%] ${cookieClass}`}
            style={{ animationDelay: "0ms" }}
          />
         <img
  data-cookie-source
  src="/cookie.webp"
  alt=""
  className={`absolute left-[78.4%] top-[8.4%] z-10 w-[30.8%] ${cookieClass}`}
  style={{ animationDelay: "130ms" }}
/>
          <img
            src="/cookie-2.webp"
            alt=""
            className={`absolute left-[55.8%] top-[58.1%] z-35 w-[28.2%] ${cookieClass}`}
            style={{ animationDelay: "260ms" }}
          />

          {/* 89 / 1040 = 8.56cqw. Letters wobble and take a palette colour on
              hover — safe here because the line is whitespace-nowrap. */}
          <h1 className="absolute left-[48.7%] top-[14.5%] z-20 -translate-x-1/2 whitespace-nowrap text-center text-[8.56cqw] font-normal leading-[1.337] tracking-tight text-primary-default">
            <WobbleText text="DID SOMEONE" />
            <br />
            <WobbleText text="SAY" />
            <span
              className={`relative inline-block align-middle ${
                ready ? "animate-gap-open" : "w-0"
              }`}
            >
              <HealthySlot ready={ready} sizeClass="text-[0.225em]" />
            </span>
            <WobbleText text="COOKIES?" />
          </h1>

          {/* 16 / 1040 = 1.54cqw, floored so it stays legible */}
          <p className="absolute left-[11.3%] top-[74.3%] z-0 w-[50.4%] font-body text-[max(13px,1.44cqw)] font-normal leading-[1.375] text-neutral-black">
            Cookies made from oats, not shortcuts. No refined flour, no refined
            sugar, just small batches. Baked with love and meant for everyday
            cravings.
          </p>

          {/* 20 / 1040 = 1.92cqw */}
          <a
            href="#shop" data-concept
            className="group/pill absolute left-[75.1%] top-[78.2%] z-30 inline-flex h-[14.7%] items-center gap-[1.54cqw] overflow-hidden whitespace-nowrap rounded-button bg-primary-default pl-[1.92%] pr-[0.77%] font-heading text-[max(13px,1.92cqw)] transition-transform duration-100 active:scale-[0.97]"
          >
            <span className="relative z-10 text-white transition-colors duration-300 group-hover/pill:text-primary-default">
              SHOP NOW
            </span>

            {/* The sweep lives inside the circle and fills it exactly, so it's
                centred by definition — no percentage-unit mismatch to reconcile. */}
            <span className="relative flex aspect-square h-[78%] items-center justify-center transition-transform duration-300 group-hover/pill:translate-x-1">
              <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[12]" />
              <img src="/arrow.svg" alt="" className="relative h-[50%] w-auto" />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

function Hero({ ready }) {
  return (
    <section
      id="home"
      className="relative md:flex md:flex-col md:px-10 md:pt-[110px] md:pb-[70px]"
    >
      <MobileHero ready={ready} />
      <DesktopHero ready={ready} />
    </section>
  )
}

export default Hero