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
import ConceptModal from "./components/ConceptModal"

function App() {
  const [loading, setLoading] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleLoaderDone = () => {
    setLoading(false)
  }


  useEffect(() => {
    const html = document.documentElement

    if (loading) {
      html.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } else {
      html.style.overflow = ""
      document.body.style.overflow = ""
    }

    return () => {
      html.style.overflow = ""
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

  const [conceptOpen, setConceptOpen] = useState(false)

// Any element carrying data-concept opens the modal. Delegated so adding a
// new dead button is a one-attribute change, not a prop chain.
useEffect(() => {
  const onClick = (e) => {
    if (e.target.closest("[data-concept]")) {
      e.preventDefault()
      setConceptOpen(true)
    }
  }
  document.addEventListener("click", onClick)
  return () => document.removeEventListener("click", onClick)
}, [])

  return (
    <>
      {loading && <Loader onDone={handleLoaderDone} />}

      {/* Everything above the footer sits in its own elevated, opaque layer.
          The footer (a normal-flow sibling below this) uses position:sticky
          + bottom-0, so once the page scrolls far enough that the footer's
          own space comes into view, it pins to the bottom of the viewport
          while this whole wrapper keeps scrolling up and over it — giving
          the "footer pops up from behind" reveal effect. */}
      <div className="relative z-10 min-h-screen bg-white text-primary-default font-body">
        <Header
  hidden={footerVisible || (isMobile && !scrolled)}
  scrolled={scrolled}
/>
        <Hero ready={!loading} />
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
<ConceptModal open={conceptOpen} onClose={() => setConceptOpen(false)} />
      <Footer />
    </>
  )
}

export default App