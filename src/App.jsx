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

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 50 // small buffer

      setFooterVisible(scrolledToBottom)
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
      <div className="relative z-10 min-h-screen bg-white text-black font-body">
        <Header hidden={footerVisible} />
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