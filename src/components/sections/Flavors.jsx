const flavors = [
  {
    name: "OG Chocolate Chip",
    icon: "/chocolate.svg",
    hoverColor: "group-hover:text-primary-fill",
  },
  {
    name: "Tasty Tiramisu",
    icon: "/tiramisu.svg",
    hoverColor: "group-hover:text-primary-default",
  },
  {
    name: "Strawberry Cheesecake",
    icon: "/strawberry.svg",
    hoverColor: "group-hover:text-secondary-1-text",
  },
  {
    name: "Blackcurrant Bliss",
    icon: "/blackcurrant.svg",
    hoverColor: "group-hover:text-secondary-2-text",
  },
  {
    name: "Mango Marvel",
    icon: "/mango.svg",
    hoverColor: "group-hover:text-secondary-3-text",
  },
]

function ColorBar() {
  return (
    <div className="h-8 w-full overflow-hidden sm:h-10 lg:h-12">
      <div className="flex w-max items-center">
        {[...Array(12)].map((_, tileIndex) => (
          <img
            key={tileIndex}
            src="/color marquee.svg"
            alt=""
            className="h-8 w-auto shrink-0 sm:h-10 lg:h-12"
          />
        ))}
      </div>
    </div>
  )
}

function Flavors() {
  return (
    <section className="bg-white py-12 md:py-20">
      <ColorBar />

      <div className="flex flex-col items-center gap-[6px] px-4 py-10 sm:py-16 md:py-20">
        {flavors.map((flavor, index) => {
          const iconOnLeft = index % 2 === 0

          return (
            <div
              key={flavor.name}
              className="group relative inline-flex cursor-pointer items-center justify-center text-[clamp(14px,5vw,50px)]"
            >
              {iconOnLeft && (
                <img
                  src={flavor.icon}
                  alt=""
                  className="absolute right-full mr-[0.3em] h-[2em] w-[2em] -translate-x-[60vw] scale-75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                />
              )}

              <span
                className={`whitespace-nowrap font-heading uppercase leading-tight text-black transition-colors duration-300 ${flavor.hoverColor}`}
              >
                {flavor.name}
              </span>

              {!iconOnLeft && (
                <img
                  src={flavor.icon}
                  alt=""
                  className="absolute left-full ml-[0.3em] h-[2em] w-[2em] translate-x-[60vw] scale-75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                />
              )}
            </div>
          )
        })}
      </div>

      <ColorBar />
    </section>
  )
}

export default Flavors