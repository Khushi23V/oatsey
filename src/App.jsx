import { useEffect, useState } from "react"
import Loader from "./components/Loader"
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
import Newsletter from "./components/sections/Newsletter"
import Footer from "./components/Footer"

function App() {
  // Always set loading to true on initial render
  const [loading, setLoading] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleLoaderDone = () => {
    // Removed the sessionStorage logic here
    setLoading(false)
  }

  // Lock the page while the loader is up so it can't be scrolled behind
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

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
      {loading && <Loader onDone={handleLoaderDone} />}

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
        <Newsletter />
      </div>

      <Footer />
    </>
  )
}

export default App