import React, { lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/aboutUsComponent/HeroSection";
import Feedbacks from "../components/aboutUsComponent/Feedbacks";
// import ParticlesBg from "../components/shared/ParticlesBg";

// Lazy Loading for Performance Optimization
const WhyChooseUs = lazy(() =>
  import("../components/aboutUsComponent/WhyChooseUs")
);
const OurStory = lazy(() => import("../components/aboutUsComponent/OurStory"));
const OurTeam = lazy(() => import("../components/aboutUsComponent/OurTeam"));

const AboutUs = () => {
  return (
    <div className="relative">
      <Navbar />
      {/* Elegant particles background */}

      <motion.main
        className="space-y-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />

        <Suspense fallback={<div>Loading...</div>}>
          <WhyChooseUs />
          <OurStory />
          <OurTeam />
        </Suspense>

        <Feedbacks />
      </motion.main>

      <Footer />
    </div>
  );
};

export default memo(AboutUs);
