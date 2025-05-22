import { motion } from "framer-motion";
import { IconMail, IconPhoneCall, IconMessageCircle } from "@tabler/icons-react";

const CalltoAction = () => {
  return (
    <div className="relative w-full px-6 sm:px-12 lg:px-24 py-16 bg-gray-900 text-white text-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

      {/* Floating Glow Effect */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500 opacity-15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-amber-400 opacity-10 rounded-full blur-2xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Find Your Perfect Stay? 🏠
        </motion.h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Our team is available 24/7 to help you find the ideal accommodation that suits your needs.
        </p>

        {/* Contact Options */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="mailto:support@lodgelink.com"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconMail size={22} />
            Email Us
          </motion.a>

          <motion.a
            href="tel:+94123456789"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconPhoneCall size={22} />
            Call Us
          </motion.a>

          <motion.a
            href="https://wa.me/94123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconMessageCircle size={22} />
            WhatsApp
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default CalltoAction;
