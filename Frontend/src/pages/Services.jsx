import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FeaturedRooms from "../components/homePageComponents/FeaturedRooms";
import Features from "../components/homePageComponents/Features";
import Stats from "../components/homePageComponents/Stats";
import Testimonials from "../components/homePageComponents/Testimonials";
import CalltoAction from "../components/contactComponents/CalltoAction";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Featured Rooms */}
      <FeaturedRooms />

      {/* Features */}
      <Features />

      {/* Stats */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <CalltoAction />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
