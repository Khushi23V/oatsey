import { useState } from "react"
import PillButton from "../PillButton"

const faqs = [
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    circleBg: "bg-secondary-3-fill",
    hoverBorder: "hover:border-secondary-3-fill",
    openBg: "bg-secondary-3-bg",
  },
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    circleBg: "bg-secondary-1-fill",
    hoverBorder: "hover:border-secondary-1-fill",
    openBg: "bg-secondary-1-bg",
  },
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    circleBg: "bg-secondary-2-fill",
    hoverBorder: "hover:border-secondary-2-fill",
    openBg: "bg-secondary-2-bg",
  },
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
    circleBg: "bg-primary-fill",
    hoverBorder: "hover:border-primary-fill",
    openBg: "bg-primary-bg",
  },
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Finally a cookie that doesn't taste like guilt. The chocolate oat one disappeared from my desk in a day — coworkers kept asking where I got them.",
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
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[18px] leading-none text-white ${faq.circleBg}`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {isOpen && (
        <p className="mt-4 font-body text-[16px] font-normal leading-[22px] text-primary-default">
          {faq.answer}
        </p>
      )}
    </div>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-heading text-[32px] uppercase leading-[1.1] text-black sm:text-[40px] md:text-[48px]">
          Frequently Asked
          <br />
          Questions
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <img
            src="/faq-image.webp"
            alt=""
            className="w-full rounded-[20px] object-cover"
          />

          <div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>

            <a
              
  href="#faq"
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