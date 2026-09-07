/* One SVG per cookie — circle + cookie already composed. Positions and sizes
   are % of the 402x875 frame, so the whole group scales with the viewport. */
const mobileCookies = [
  // top right
  { src: "/cookie-home.svg", left: "42.3%", top: "-1%", width: "60.7%" },
  // left
  { src: "/cookie-home2.svg", left: "-1.6%", top: "11.5%", width: "35.1%" },
  // bottom — oversized so its widest band clips both side edges inside the
  // viewport; the rest continues below the fold.
  { src: "/cookie-home3.svg", left: "50%", top: "58%", width: "165%", centered: true },
]

function MobileHero() {
  return (
    <div className="md:hidden">
      <div className="relative h-screen w-full">
        {mobileCookies.map((c) => (
          <img
            key={c.src}
            src={c.src}
            alt=""
            className={`absolute max-w-none ${c.centered ? "-translate-x-1/2" : ""}`}
            style={{ left: c.left, top: c.top, width: c.width }}
          />
        ))}

        {/* Heading — "healthy" is inline in the gap, sized in em so it tracks
            the heading and stays centred between SAY and COOKIES. */}
        <h1 className="absolute left-[49.9%] top-[38.3%] z-10 w-[84.3%] -translate-x-1/2 text-center text-[clamp(28px,9vw,36px)] font-normal leading-[1.389] tracking-tight text-primary-default">
          DID SOMEONE
          <br />
          SAY
          <span className="relative inline-block w-[0.6em] align-middle">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-heading text-[0.28em] leading-none text-primary-fill">
              healthy
            </span>
          </span>
          COOKIES?
        </h1>

        <p className="absolute left-[48.6%] top-[51.1%] z-10 w-[71.9%] -translate-x-1/2 text-center font-body text-[12px] font-normal leading-[16px] text-neutral-black">
          Cookies made from oats, not shortcuts. No refined flour, no refined
          sugar, just small batches.
        </p>

        <a
          href="#shop"
          className="absolute left-[31.3%] top-[57.4%] z-10 inline-flex h-[38px] items-center gap-3 rounded-button bg-primary-default pl-[18px] pr-[7px] font-heading text-[12px] text-white transition-opacity hover:opacity-90"
        >
          SHOP NOW
          <span className="flex aspect-square h-[24px] items-center justify-center rounded-full bg-white text-[10px] text-primary-default">
            <img src="/arrow.svg" alt="" className="h-[50%] w-auto" />
          </span>
        </a>
      </div>

      {/* Room for the lower part of the bottom cookie */}
      <div className="h-[80vw]" />
    </div>
  )
}

function DesktopHero() {
  return (
    <div className="hidden md:block">
      <div className="relative mx-auto w-full max-w-5xl lg:max-w-[1040px]">
        {/* @container: everything inside sizes in cqw (% of the CARD's width)
            using the Figma ratios, so the whole composition scales with the
            card instead of the viewport. */}
        <div className="@container relative aspect-[1040/420] rounded-tl-[316.5px] rounded-tr-[316.5px] rounded-bl-[316.5px] rounded-br-[45px] bg-white shadow-[0px_4px_20px_0px_#c6a272]">
          <img
            src="/cookie-1.png"
            alt=""
            className="absolute left-[-11.7%] top-[8.4%] z-10 w-[35.7%] rotate-[21deg]"
          />
          <img
            src="/cookie.png"
            alt=""
            className="absolute left-[78.4%] top-[8.4%] z-10 w-[30.8%] rotate-[21deg]"
          />
          <img
            src="/cookie-2.png"
            alt=""
            className="absolute left-[55.8%] top-[58.1%] z-35 w-[28.2%] rotate-[21deg]"
          />

          {/* 89 / 1040 = 8.56cqw */}
          <h1 className="absolute left-[48.7%] top-[14.5%] z-0 -translate-x-1/2 whitespace-nowrap text-center text-[8.56cqw] font-normal leading-[1.337] tracking-tight text-primary-default">
            DID SOMEONE
            <br />
            SAY
            <span className="relative inline-block w-[0.6em] align-middle">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-heading text-[0.225em] leading-none text-primary-fill">
                healthy
              </span>
            </span>
            COOKIES?
          </h1>

          {/* 16 / 1040 = 1.54cqw, floored so it stays legible */}
          <p className="absolute left-[9.3%] top-[67.3%] z-0 w-[52.4%] font-body text-[max(13px,1.54cqw)] font-normal leading-[1.375] text-neutral-black">
            Cookies made from oats, not shortcuts. No refined flour, no refined
            sugar, just small batches. Baked with love and meant for everyday
            cravings.
          </p>

          {/* 20 / 1040 = 1.92cqw */}
          <a
            href="#shop"
            className="absolute left-[75.1%] top-[78.2%] z-30 inline-flex h-[14.7%] items-center gap-[1.54cqw] whitespace-nowrap rounded-button bg-primary-default pl-[1.92%] pr-[0.77%] font-heading text-[max(13px,1.92cqw)] text-white transition-opacity hover:opacity-90"
          >
            SHOP NOW
            <span className="flex aspect-square h-[78%] items-center justify-center rounded-full bg-white text-[max(10px,1.4cqw)] text-primary-default">
              <img src="/arrow.svg" alt="" className="h-[50%] w-auto" />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative md:flex md:flex-col md:px-10 md:pt-[110px] md:pb-[70px]"
    >
      <MobileHero />
      <DesktopHero />
    </section>
  )
}

export default Hero