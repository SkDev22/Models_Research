import { motion } from "framer-motion";

const CompanyOverview = () => {
  // Animation configurations for general fade and slide in effect
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  // Slide in animation from left or right for text and image
  const slideInProps = (direction) => ({
    initial: { opacity: 0, x: direction === "left" ? -100 : 100 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2, ease: "easeOut" },
  });

  return (
    <section id="company-overview" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          {...animationProps}
          className="text-3xl md:text-5xl font-semibold text-amber-600 mb-6"
        >
          About Our Company
        </motion.h2>

        {/* Subheading */}
        <motion.p
          {...animationProps}
          transition={{ ...animationProps.transition, duration: 1 }}
          className="text-lg md:text-2xl text-gray-700 mb-12 mx-auto max-w-3xl"
        >
          We are a company committed to providing the best boarding house experiences with advanced technology, a user-friendly interface, and unmatched customer service.
        </motion.p>

        {/* Key Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Point 1 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.2 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <h3 className="text-2xl font-semibold text-amber-600 mb-4">Expert Team</h3>
            <p className="text-lg text-gray-700">
              Our team consists of professionals with years of experience in the real estate and technology sectors.
            </p>
          </motion.div>

          {/* Point 2 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.4 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <h3 className="text-2xl font-semibold text-amber-600 mb-4">Customer Focus</h3>
            <p className="text-lg text-gray-700">
              We place our customers at the center of everything we do, ensuring a seamless booking experience.
            </p>
          </motion.div>

          {/* Point 3 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.6 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <h3 className="text-2xl font-semibold text-amber-600 mb-4">Innovative Technology</h3>
            <p className="text-lg text-gray-700">
              Our platform uses cutting-edge technology to enhance the user experience, including AI-powered recommendations and dynamic pricing.
            </p>
          </motion.div>
        </div>

        {/* First Section: Image Left, Text Right */}
        <div className="flex items-center justify-between mt-16">
          {/* Image Section */}
          <motion.div
            {...slideInProps("left")}
            className="w-1/2"
          >
            <img
              src="/cOverview.jpg"
              alt="Company Overview"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            {...slideInProps("right")}
            className="w-1/2 pl-8"
          >
            <h3 className="text-3xl font-semibold text-amber-600 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700">
              At our company, we strive to create an effortless and personalized experience for everyone. From seamless room bookings to providing transparent pricing, we ensure that our customers have a stress-free journey in finding the perfect boarding house.
            </p>
          </motion.div>
        </div>

        {/* Second Section: Image Right, Text Left */}
        <div className="flex items-center justify-between mt-16 flex-row-reverse">
          {/* Image Section */}
          <motion.div
            {...slideInProps("right")}
            className="w-1/2"
          >
            <img
              src="/cOverview.jpg"
              alt="Company Growth"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            {...slideInProps("left")}
            className="w-1/2 pr-8"
          >
            <h3 className="text-3xl font-semibold text-amber-600 mb-4">Our Growth</h3>
            <p className="text-lg text-gray-700">
              Over the years, we have expanded our services, helping thousands of customers find their perfect boarding spaces. Our continuous growth is driven by our commitment to quality, innovation, and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
