function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col justify-center px-6 pt-[92px] pb-16 md:px-10 md:pb-24"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="relative  rounded-tl-[316.5px] rounded-tr-[316.5px] rounded-bl-[316.5px] rounded-br-[45px] bg-white px-8 py-14 shadow-[0px_4px_26px_0px_rgba(198,162,114,0.5)] md:px-14 md:py-16 lg:px-20 lg:py-20">
          {/* Cookie images — overlapping the card edges */}
          <img
            src="/cookie-1.png"
            alt=""
            className="absolute left-2 top-[35%] z-10 w-24 -translate-y-1/2 -rotate-6 sm:w-32 md:w-36 lg:w-45"
          />
          <img
            src="/cookie.png"
            alt=""
            className="absolute top-2 right-[7%] z-10 w-24 rotate-6 sm:w-28 md:w-32 lg:w-36"
          />
          <img
            src="/cookie-2.png"
            alt=""
            className="absolute bottom-[3%] right-[20%] z-10 w-28 -rotate-3 sm:w-36 md:w-40 lg:w-48"
          />

          {/* Heading */}
          <div className="relative z-0 mx-auto max-w-3xl">
           <h1 className="text-center text-[42px] font-normal leading-[0.95] tracking-tight text-primary-default sm:text-[56px] md:text-[68px] lg:text-[80px]">
            DID SOMEONE SAY{" "}
            <span className="relative inline-block w-[0.5em] align-middle">
              <span className="absolute -top-2 left-1/3 -translate-x-1/2 -rotate-90 whitespace-nowrap text-[15px] font-regular tracking-wide text-primary-fill md:text-[15px]">
                healthy
              </span>
            </span>
            COOKIES?
          </h1>

          {/* Tagline */}
          <p className="relative z-0 mt-6 max-w-lg text-body-md leading-[22px] tracking-[0%] text-neutral-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud ex
          </p>
          </div>

          {/* Shop now button */}
          <a
            href="#shop"
            className="relative z-30 mt-10 inline-flex items-center gap-4 rounded-button bg-primary-default py-2 pl-6 pr-2 text-body-md font-heading text-white transition-opacity hover:opacity-90 md:absolute md:bottom-10 md:right-12 md:mt-0"
          >
            SHOP NOW
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-default">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero