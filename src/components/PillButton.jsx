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
      {/* Fill grows from the circle's position outward to cover the pill */}
      <span
        className={`absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 scale-100 rounded-full transition-transform duration-500 ease-out group-hover/pill:scale-[12] ${
          inverted ? "bg-primary-default" : "bg-white"
        }`}
      />

      <span
        className={`relative font-heading text-[14px] uppercase transition-colors duration-300 sm:text-[16px] ${
          inverted
            ? "text-primary-default group-hover/pill:text-white"
            : "text-white group-hover/pill:text-primary-default"
        }`}
      >
        {children}
      </span>

      <span
        className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:translate-x-1 ${
          inverted ? "text-white" : "text-primary-default"
        }`}
      >
         <img src="/arrow2.svg" alt=""  className="h-[50%] rotate-[180deg] w-auto" />
      </span>
    </Tag>
  )
}

export default PillButton