import { useEffect, useId, useRef, useState } from "react"

function ProcessCardShape({ fillColor, bgColor, className }) {
  const uid = useId()
  const filterId = `process-shadow-${uid}`
  const clipId = `process-clip-${uid}`

  return (
    <svg
      viewBox="0 0 472 509"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter={`url(#${filterId})`}>
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="4"
            y="46.9194"
            width="425"
            height="491"
            rx="20"
            transform="rotate(-6.49836 4 46.9194)"
            fill={fillColor}
          />
          <path
            d="M487.939 286.196C490.141 374.002 458.093 385.569 380.2 371.931C347.702 366.241 261.007 353.619 229.463 349.061C221.776 347.95 214.363 345.153 208.835 339.697C194.005 325.06 169.443 290.849 206.551 248.793C256.254 192.464 341.139 72.9909 416.653 95.5299C477.835 113.791 486.312 221.296 487.939 286.196Z"
            fill={bgColor}
          />
          <path
            d="M-55.4326 454.194C21.5324 455.213 50.4533 445.936 137.523 394.263C225.141 327.193 145.96 250.57 63.409 259.973C-10.3433 274.662 -73.2536 308.313 -122.032 362.316C-157.918 402.047 -143.083 428.035 -132.735 438.997C-128.603 443.375 -122.868 445.575 -116.95 446.682C-103.002 449.29 -75.5592 453.927 -55.4326 454.194Z"
            fill={bgColor}
          />
          <path
            d="M-22.4083 93.5183C19.2721 7.42544 137.918 3.63159 239.632 -8.13127C267.411 -11.3439 305.212 -10.3936 322.489 -9.71124C328.645 -9.46809 334.826 -8.10889 339.541 -4.1421C352.041 6.37596 370.27 33.9417 317.397 86.7737C246.779 157.339 154.731 252.831 60.5219 236.139C-15.8081 222.616 -57.6296 166.27 -22.4083 93.5183Z"
            fill={bgColor}
          />
          <path
            d="M116.294 585.997C191.684 644.866 299.831 595.922 396.299 561.6C422.645 552.226 456.148 534.695 471.351 526.459C476.769 523.525 481.716 519.578 484.196 513.938C490.774 498.984 494.969 466.203 424.211 442.12C329.704 409.954 204.967 364.872 127.788 421.418C65.2568 467.232 52.5871 536.25 116.294 585.997Z"
            fill={bgColor}
          />
        </g>
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="471.544"
          height="508.219"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <clipPath id={clipId}>
          <path
            d="M6.2635 66.7909C5.0134 55.8162 12.8968 45.906 23.8715 44.6559L396.039 2.26357C407.014 1.01348 416.924 8.89685 418.174 19.8716L465.281 433.429C466.531 444.403 458.648 454.313 447.673 455.564L75.5054 497.956C64.5307 499.206 54.6205 491.323 53.3704 480.348L6.2635 66.7909Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const steps = [
  {
    number: "01",
    heading: "No Machines, Just Muscle",
    body: "Every batch starts with real rolled oats, hand-mixed in small batches — not a factory line in sight.",
    fill: "var(--color-secondary-3-fill)",
    bg2: "var(--color-secondary-3-bg-2)",
    numberColor: "text-secondary-3-text",
    shapeRotate: "rotate-[13.29deg]",
    textRotate: "rotate-[6.79deg]",
    photo: "/img1.webp"
  },
  {
    number: "02",
    heading: "Baked The Day You Order",
    body: "Nothing sits in a warehouse. Your cookies go into the oven only after your order comes in.",
    fill: "var(--color-secondary-1-fill)",
    bg2: "var(--color-secondary-1-bg-2)",
    numberColor: "text-secondary-1-text",
    shapeRotate: "rotate-[0.08deg]",
    textRotate: "rotate-[-6.42deg]",
    photo: "/img2.webp"
  },
  {
    number: "03",
    heading: "Packed & Shipped Same Day",
    body: "Cooled, packed, and shipped within 24 hours — so what reaches you tastes like it just left the tray.",
    fill: "var(--color-secondary-2-fill)",
    bg2: "var(--color-secondary-2-bg-2)",
    numberColor: "text-secondary-2-text",
    shapeRotate: "rotate-[13.0deg]",
    textRotate: "rotate-[6.5deg]",
    photo: "/img3.webp"
  },
]

function ProcessCard({ step, className = "" }) {
  return (
    <div className={`relative aspect-[414.57/456.23] shrink-0 ${className}`}>
      <ProcessCardShape
        fillColor={step.fill}
        bgColor={step.bg2}
        className={`h-full w-full drop-shadow-lg ${step.shapeRotate}`}
      />

      <div
        className={`absolute inset-0 flex flex-col p-8 pt-10 pb-12 sm:p-14 sm:pt-16 sm:pb-20 ${step.textRotate}`}
      >
        <span className="inline-flex w-fit items-center rounded-xl bg-white px-3 py-1.5">
          <span
            className={`font-heading text-[18px] sm:text-[24px] ${step.numberColor}`}
          >
            {step.number}
          </span>
        </span>

        <h3 className="mt-3 font-heading text-[18px] uppercase leading-[1.2] text-white sm:mt-5 sm:text-[24px]">
          {step.heading}
        </h3>

        <p className="mt-auto font-medium text-[13px] leading-[18px] text-white sm:text-[16px] sm:leading-[22px]">
          {step.body}
        </p>
      </div>
    </div>
  )
}

// Desktop only. Flips to a process photo on hover. The back matches the
// card's silhouette with rounded corners plus the same rotation, rather
// than re-deriving the SVG's exact clip path.
function FlipCard({ step, className = "" }) {
  return (
    <div className={`group/flip [perspective:1200px] ${className}`}>
      <div className="relative aspect-[414.57/456.23] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <ProcessCard step={step} className="h-full w-full" />
        </div>

        {/* Pre-rotated 180 so it reads correctly once the flip lands */}
        <div
  className={`absolute inset-[6%] overflow-hidden rounded-[20px] shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] ${step.shapeRotate}`}
>
  <img src={step.photo} alt="" className="h-full w-full object-cover" />
</div>
      </div>
    </div>
  )
}

export function TypedHeading({ lines, revealed, className = "" }) {
  return (
    <h2 className={className}>
      {lines.map((line, li) => (
        <span
          key={line}
          className={`block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: `${li * 140}ms` }}
        >
          {line}
        </span>
      ))}
    </h2>
  )
}


function ProcessSteps() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
     { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Mobile */}
<section className="px-6 pt-16 pb-0 sm:hidden">
  <div className="relative">
    {/* Heading pins under the header and holds through the stack. Its
        track ends 80vh early — one wrapper's worth — so it releases at
        the same moment the last card does. */}
    <div className="absolute inset-x-0 top-0 h-[calc(100%-80vh)]">
<TypedHeading
  lines={["The Soul Of", "Our Kitchen"]}
  revealed={revealed}
  className="sticky top-32 z-40 text-center font-heading text-[32px] uppercase leading-[1.1] text-black"
/>
    </div>

    {/* pt reserves the flow space the now-absolute heading vacated */}
    <div className="-mb-[20vh] pt-[150px]">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="sticky top-[262px] h-[80vh]"
          style={{ zIndex: index + 1 }}
        >
          <ProcessCard step={step} className="mx-auto w-[300px]" />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Desktop — unchanged */}
<section className="hidden px-6 py-16 sm:block md:px-10 md:py-24">
  <TypedHeading
    lines={["The Soul Of", "Our Kitchen"]}
    revealed={revealed}
    className="text-center font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-[48px]"
  />

  {/* Cards deal out from a centre pile. `group` on the row lets a hovered
      card push its neighbours aside so the overlapped text is readable. */}
  <div className="group/row mt-16 flex justify-center">
    {steps.map((step, index) => (
 <div
  key={step.number}
 className={`transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
    index === 0 ? "z-10" : index === 1 ? "z-30" : "z-20"
  } ${index === 0 ? "" : "-ml-16"} hover:z-40`}
  style={{
    opacity: revealed ? 1 : 0,
    transform: revealed
      ? undefined
      : `translateX(${index === 0 ? "60%" : index === 2 ? "-60%" : "0"}) scale(0.85)`,
    transitionDelay: revealed ? `${500 + index * 140}ms` : "0ms",
  }}
>
  {/* Lift and spread get their own wrapper so they run at hover speed,
      independent of the slow entrance transition above. */}
  <div
    className={`transition-transform duration-300 ease-out hover:-translate-y-6 hover:scale-105 ${
      index === 0
        ? "hover:-translate-x-8"
        : index === 2
          ? "hover:translate-x-8"
          : ""
    }`}
  >
    <FlipCard step={step} className="w-[320px] md:w-[400px] lg:w-[440px]" />
  </div>
</div>

    ))}
  </div>
</section>
  </div>
  )
}

export default ProcessSteps