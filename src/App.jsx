import { useEffect, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/sections/Hero"
import Marquees from "./components/sections/Marquees"
import Story from "./components/sections/Story"
import GalleryScatter from "./components/sections/GalleryScatter"
import Flavors from "./components/sections/Flavors"
import ProductsCarousel from "./components/sections/ProductsCarousel"
import TrustBadges from "./components/sections/TrustBadges"
import ProcessSteps from "./components/sections/ProcessSteps"
import Reviews from "./components/sections/Reviews"
import Faq from "./components/sections/Faq"
import Footer from "./components/Footer"

function App() {
  const [footerVisible, setFooterVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Below md the header stays hidden until the user starts scrolling; from md
  // up it is visible by default. Either way it hides once the footer shows.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)

    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 50 // small buffer

      setFooterVisible(scrolledToBottom)
      setScrolled(window.scrollY > 10)
    }

    handleScroll() // check once on mount, in case the page loads already scrolled
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Everything above the footer sits in its own elevated, opaque layer.
          The footer (a normal-flow sibling below this) uses position:sticky
          + bottom-0, so once the page scrolls far enough that the footer's
          own space comes into view, it pins to the bottom of the viewport
          while this whole wrapper keeps scrolling up and over it — giving
          the "footer pops up from behind" reveal effect. */}
      <div className="relative z-10 min-h-screen bg-white text-primary-default font-body">
        <Header hidden={footerVisible || (isMobile && !scrolled)} />
        <Hero />
        <Marquees />
        <Story />
        <GalleryScatter />
        <Flavors />
        <ProductsCarousel />
        <TrustBadges />
        <ProcessSteps />
        <Reviews />
        <Faq />
      </div>

      <Footer />
    </>
  )
}

export default App