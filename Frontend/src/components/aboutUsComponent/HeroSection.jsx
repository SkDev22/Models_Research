import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";

const HeroSection = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/aboutHero.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white px-3"
          >
            <h1 className="text-2xl md:text-5xl font-bold mb-4">
              Discover Your Perfect Boarding House
            </h1>
            <p className="text-md md:text-1xl mb-8">
              Join us in exploring the world's most beautiful destinations.
            </p>
            <motion.a
              href="#about"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 
                         hover:shadow-lg hover:brightness-110 active:scale-95 active:shadow-sm 
                         text-lg md:text-xl tracking-wide leading-tight font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
