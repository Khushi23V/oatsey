const benefits = [
  "Made With Real Oats",
  "No Artificial Sugar",
  "In 5 Unique Flavors",
  "Baked To Order",
]

function BenefitTrack() {
  return (
    <div className="flex w-max animate-marquee-left items-center gap-x-6 whitespace-nowrap py-3 sm:gap-x-12 sm:py-5">
      {[...Array(2)].map((_, setIndex) => (
        <div key={setIndex} className="flex items-center gap-x-6 sm:gap-x-12">
          {benefits.map((benefit) => (
            <span
              key={benefit}
              className="flex items-center gap-x-6 font-heading text-[13px] uppercase tracking-wide text-white sm:gap-x-12 sm:text-[18px] lg:text-[22px]"
            >
              {benefit}
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white sm:h-2 sm:w-2" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function Marquees() {
  return (
    <section className="relative h-64 overflow-hidden bg-white sm:h-72 md:h-80">
      {/* Color marquee — svg, sits behind the benefits strip. Wider band on
          narrow screens so the rotation doesn't leave gaps at the corners. */}
      <div className="absolute left-1/2 top-1/2 z-0 w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[8.46deg] overflow-hidden sm:w-[120%]">
        <div className="flex w-max animate-marquee-right items-center">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {[...Array(10)].map((_, tileIndex) => (
                <img
                  key={tileIndex}
                  src="/color marquee.svg"
                  alt=""
                  className="h-12 w-auto shrink-0 sm:h-16 lg:h-20"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits marquee — brown strip, sits on top */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[-5.65deg] overflow-hidden bg-primary-default sm:w-[120%]">
        <BenefitTrack />
      </div>
    </section>
  )
}

export default Marquees