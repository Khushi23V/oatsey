function Story() {
  return (
    <section className="px-6 pt-16 pb-6 md:px-10 md:py-24">
      <p className="mx-auto max-w-4xl text-center text-[24px] font-normal leading-[34px] text-black sm:text-[28px] sm:leading-[40px] md:text-[36px] md:leading-[50px]">
        We started{"    "}
        <img
          src="/oatsey-logo.svg"
          alt="Oatsey"
          className="inline-block h-[1.35em] w-auto align-middle"
        />{"    "}
        because dessert shouldn't mean compromise. Every cookie{" "}
        <img
          src="/pill1.png"
          alt=""
          className="inline-block h-[1.15em] w-auto rounded-full align-middle object-cover"
        />{" "}
        is <span className="font-semibold text-secondary-1-text">handmade</span> in small
        batches with{" "}
        <span className="font-semibold text-secondary-3-text">100% oats</span> and{" "}
        <span className="font-semibold text-secondary-2-text">zero refined sugar</span>.
        Wholesome enough for every day,{" "}
        <img
          src="/pill2.png"
          alt=""
          className="inline-block h-[1.15em] w-auto rounded-full align-middle object-cover"
        />{" "}
        delicious enough for every craving.
      </p>
    </section>
  )
}

export default Story