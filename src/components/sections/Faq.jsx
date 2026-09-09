import { useEffect, useRef, useState } from "react"
import PillButton from "../PillButton"
import { TypedHeading } from "./ProcessSteps"

const faqs = [
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Two weeks in the sealed pouch, about a week once it's open. No preservatives means they don't sit around forever, which is rather the point.",
    circleBg: "bg-secondary-3-fill",
    hoverBorder: "hover:border-secondary-3-fill",
    openBg: "bg-secondary-3-bg",
  },
  {
    question: "Are these actually sugar-free?",
    answer:
      "No refined sugar, not sugar-free. We sweeten with monk fruit sweetener, so there's still natural sugar in there — just nothing processed.",
    circleBg: "bg-secondary-1-fill",
    hoverBorder: "hover:border-secondary-1-fill",
    openBg: "bg-secondary-1-bg",
  },
  {
    question: "Do you ship across India?",
    answer:
      "We currently only ship our tasty cookies to Delhi and Mumbai, but we're expanding soon!",
      circleBg: "bg-secondary-2-fill",
    hoverBorder: "hover:border-secondary-2-fill",
    openBg: "bg-secondary-2-bg",
  },
  {
    question: "What's actually in them?",
    answer:
      "Rolled oats, monk fruit sweetener, and whatever the flavour calls for. The full list is printed on every box, no fine print.",
    circleBg: "bg-primary-fill",
    hoverBorder: "hover:border-primary-fill",
    openBg: "bg-primary-bg",
  },
  {
    question: "Can I order a mixed box?",
    answer:
      "You can. Pick any combination of the five flavours at checkout, or let us choose if you'd rather be surprised.",
    circleBg: "bg-primary-default",
    hoverBorder: "hover:border-primary-default",
    openBg: "bg-primary-fill",
  },
]

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-2xl border-2 border-transparent p-5 transition-colors duration-300 ${
        isOpen ? faq.openBg : "bg-neutral-gray"
      } ${faq.hoverBorder}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-body text-[16px] font-semibold text-black">
          {faq.question}
        </p>
        {/* Plus rotates 45° into a cross rather than swapping glyphs */}
<span
  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 ${
    faq.circleBg
  } ${isOpen ? "rotate-[135deg]" : "rotate-0"}`}
>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className="h-[45%] w-[45%]"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
</span>
      </div>

      {/* grid-rows trick — animates from 0fr to 1fr, which transitions
          smoothly without needing a fixed height */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 font-body text-[16px] font-normal leading-[22px] text-primary-default">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
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
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
<TypedHeading
 lines={["Frequently", "Asked", "Questions"]}
  revealed={revealed}
  nowrap
  className="text-center font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-[48px] md:text-left"
/>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
<img
  src="/faq-image.webp"
  alt=""
  className="hidden w-full rounded-[20px] object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:block"
  style={{
    opacity: revealed ? 1 : 0,
    transform: revealed ? "scale(1)" : "scale(0.94)",
    transitionDelay: revealed ? "500ms" : "0ms",
  }}
/>

          <div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateX(0)" : "translateX(30px)",
                    transitionDelay: revealed ? `${600 + index * 100}ms` : "0ms",
                  }}
                >
                  <FaqItem
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  />
                </div>
              ))}
            </div>


            <a
              
  href="#faq"  data-concept
  className="group/pill mt-8 flex w-fit items-center gap-4 overflow-hidden rounded-button bg-primary-default py-2 pl-6 pr-2 font-heading transition-transform duration-100 active:scale-[0.97]"
>
  <span className="relative z-10 text-white transition-colors duration-300 group-hover/pill:text-primary-default">
    EXPLORE ALL
  </span>

  <span className="relative flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover/pill:translate-x-1">
    <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover/pill:scale-[12]" />
    <img src="/arrow.svg" alt="" className="relative h-[50%] w-auto" />
  </span>
</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq