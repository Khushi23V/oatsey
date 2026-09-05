const benefits = [
  "Made With Real Oats",
  "No Artificial Sugar",
  "In 5 Unique Flavors",
  "Baked To Order",
]

function BenefitTrack() {
  return (
    <div className="flex w-max animate-marquee-left items-center gap-x-12 whitespace-nowrap py-5">
      {[...Array(2)].map((_, setIndex) => (
        <div key={setIndex} className="flex items-center gap-x-12">
          {benefits.map((benefit) => (
            <span
              key={benefit}
              className="flex items-center gap-x-12 font-heading text-[15px] uppercase tracking-wide text-white sm:text-[18px]"
            >
              {benefit}
              <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
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
      {/* Color marquee — svg, sits behind the benefits strip */}
      <div className="absolute left-1/2 top-1/2 z-0 w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[8.46deg] overflow-hidden">
        <div className="flex w-max animate-marquee-right items-center">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {[...Array(6)].map((_, tileIndex) => (
                <img
                  key={tileIndex}
                  src="/color marquee.svg"
                  alt=""
                  className="h-16 w-auto shrink-0 sm:h-20"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits marquee — brown strip, sits on top */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-5.65deg] overflow-hidden bg-primary-default ">
        <BenefitTrack />
      </div>
    </section>
  )
}

export default Marquees