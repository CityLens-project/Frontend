import Navbar from '../Components/Landing/Navbar'
import Hero from '../Components/Landing/Hero'
import Features from '../Components/Landing/Features'
import Banner from '../Components/Landing/Banner'
import LandingFooter from '../Components/Landing/LandingFooter'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Banner />
      </main>
      <LandingFooter />
    </>
  )
}