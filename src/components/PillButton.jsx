function PillButton({
  children,
  href,
  onClick,
  inverted = false,
  className = "",
  ...props
}) {
  const Tag = href ? "a" : "button"

  return (
    <Tag
      href={href}
      onClick={onClick}
      type={href ? undefined : "button"}
      className={`group/pill relative inline-flex shrink-0 items-center gap-4 overflow-hidden rounded-button py-2 pl-6 pr-2 transition-transform duration-100 active:scale-[0.97] ${
        inverted ? "bg-white" : "bg-primary-default"
      } ${className}`}
      {...props}
    >
      <span
        className={`relative z-10 font-heading text-[14px] uppercase transition-colors duration-300 sm:text-[16px] ${
          inverted
            ? "text-primary-default group-hover/pill:text-white"
            : "text-white group-hover/pill:text-primary-default"
        }`}
      >
        {children}
      </span>

      {/* The sweep lives inside the circle at inset-0, so it can never
          detach from the arrow however wide the pill gets. */}
      <span
        className={`relative flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover/pill:translate-x-1 ${
          inverted
            ? "text-white group-hover/pill:text-primary-default"
            : "text-primary-default group-hover/pill:text-white"
        }`}
      >
        <span
          className={`absolute inset-0 rounded-full transition-transform duration-500 ease-out group-hover/pill:scale-[20] ${
            inverted ? "bg-primary-default" : "bg-white"
          }`}
        />
     <img
  src={inverted ? "/arrow2.svg" : "/arrow.svg"}
  alt=""
  className={`relative h-[50%] w-auto ${inverted ? "rotate-180" : ""}`}
/>
      </span>
    </Tag>
  )
}

export default PillButton