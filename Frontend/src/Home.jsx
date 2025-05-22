import React from 'react'
import Navbar from './components/navbar/Navbar'
import HeroSection from './components/homePageComponents/HeroSection'
import FeaturedRooms from './components/homePageComponents/FeaturedRooms'
import Features from './components/homePageComponents/Features'
import Stats from './components/homePageComponents/Stats'
import Testimonials from './components/homePageComponents/Testimonials'
import AddProperty from './components/homePageComponents/AddProperty'
import CalltoAction from './components/contactComponents/CalltoAction'
import Footer from './components/footer/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Rooms */}
        <section className="bg-gray-50">
          <FeaturedRooms />
        </section>

        {/* Features */}
        <section>
          <Features />
        </section>

        {/* Stats */}
        <section className="bg-gray-50">
          <Stats />
        </section>

        {/* Add Property */}
        <section>
          <AddProperty />
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50">
          <Testimonials />
        </section>

        {/* Call to Action */}
        <section>
          <CalltoAction />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home