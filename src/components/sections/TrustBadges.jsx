function TrustBadges() {
  return (
    <section className="py-16 md:py-0">
      <div className="relative aspect-[620/180] w-full">
        <img
          src="/curve.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />

        <img
          src="/badge (3).svg"
          alt="Shipped within 24 hours"
          className="absolute left-[13%] top-[45%] w-[15%] -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="/badge (2).svg"
          alt="100% secured payments"
          className="absolute left-[48%] top-[45%] w-[15%] -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="/badge (1).svg"
          alt="Regular quality checks"
          className="absolute left-[82%] top-[45%] w-[15%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  )
}

export default TrustBadges