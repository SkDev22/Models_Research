import React from 'react'
import { motion } from "framer-motion";
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ContactForm from '../components/contactComponents/ContactForm'
import ContactDetails from '../components/contactComponents/ContactDetails'
import FAQSection from '../components/contactComponents/FaqSection'
import CalltoAction from '../components/contactComponents/CalltoAction'

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-gray-900 to-gray-800"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/cOverview.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-amber-500 mix-blend-multiply opacity-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
            >
              Have questions about our accommodations? We're here to help you find your perfect stay.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full text-gray-900"
            viewBox="0 0 1440 100"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C280,100 1160,0 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form Section - Spans 2 columns */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Details Section - Spans 1 column */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <ContactDetails />
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <FAQSection />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16"
      >
        <CalltoAction />
      </motion.div>

      <Footer />
    </div>
  )
}

export default ContactUs