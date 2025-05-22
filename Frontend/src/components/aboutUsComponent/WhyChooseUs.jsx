import { motion } from 'framer-motion';
import { IconRobot, IconCurrencyDollar, IconCalendar, IconHeadphones, IconLeaf, IconCreditCard, IconUsers, IconShield, IconGlobe, IconClock, IconStar, IconTool } from '@tabler/icons-react';

const WhyChooseUs = () => {
  // Animation configuration for the cards
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section id="why-choose-us" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          {...animationProps}
          className="text-3xl md:text-5xl font-semibold text-amber-600 mb-6"
        >
          Why Choose Us?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          {...animationProps}
          transition={{ ...animationProps.transition, duration: 1 }}
          className="text-lg md:text-2xl text-gray-700 mb-12 mx-auto max-w-3xl"
        >
          Discover the benefits that make our platform stand out in the market.
        </motion.p>

        {/* Key Benefits */}

        {/* New Section: Smaller, Glassy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* New Glassy Card 1 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.4 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconRobot className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">AI-powered Recommendations</h3>
            <p className="text-sm text-gray-700">
            Our AI technology helps users find the perfect boarding house based on their preferences and past choices.
            </p>
          </motion.div>

          {/* New Glassy Card 2 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.6 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconCurrencyDollar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Transparent Pricing</h3>
            <p className="text-sm text-gray-700">
            We offer clear, upfront pricing with no hidden fees so that you can plan your budget without any surprises.
            </p>
          </motion.div>

          {/* New Glassy Card 3 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.8 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconCalendar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Seamless Booking Experience</h3>
            <p className="text-sm text-gray-700">
              Our easy-to-navigate platform makes booking your ideal boarding house a breeze, saving you time and effort.
            </p>
          </motion.div>

          {/* New Glassy Card 4 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.0 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconHeadphones className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">24/7 Customer Support</h3>
            <p className="text-sm text-gray-700">
            Our dedicated customer support team is available 24/7 to assist you with any queries or concerns.
            </p>
          </motion.div>

          {/* New Glassy Card 5 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.2 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconLeaf className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Eco-friendly Practices</h3>
            <p className="text-sm text-gray-700">
            We are committed to sustainability and eco-friendly initiatives, including green building certifications and reducing our carbon footprint.
            </p>
          </motion.div>

          {/* New Glassy Card 6 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.4 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconUsers className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Easy Payment Options</h3>
            <p className="text-sm text-gray-700">
            Choose from a variety of secure and easy payment options, including credit card, PayPal, and bank transfer.
            </p>
          </motion.div>
        

          {/* New Glassy Card 7 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.4 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconUsers className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Trusted by Thousands</h3>
            <p className="text-sm text-gray-700">
              Our platform is trusted by thousands of users who rely on us for their accommodation needs.
            </p>
          </motion.div>

          {/* New Glassy Card 8 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.6 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconShield className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Secure & Safe</h3>
            <p className="text-sm text-gray-700">
              We prioritize your safety with secure transactions and personal data protection.
            </p>
          </motion.div>

          {/* New Glassy Card 9 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 2.8 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconGlobe className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Global Reach</h3>
            <p className="text-sm text-gray-700">
              Our platform connects users globally, providing access to boarding houses worldwide.
            </p>
          </motion.div>

          {/* New Glassy Card 10 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.0 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconClock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Quick & Efficient</h3>
            <p className="text-sm text-gray-700">
              Book a boarding house within minutes and enjoy a hassle-free experience.
            </p>
          </motion.div>

          {/* New Glassy Card 11 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.2 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconStar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Top Ratings</h3>
            <p className="text-sm text-gray-700">
              We pride ourselves on consistently receiving high ratings from our users for excellent service.
            </p>
          </motion.div>

          {/* New Glassy Card 12 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 3.4 }}
            className="bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-95 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center mb-4">
              <IconTool className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-600 mb-4">Customizable Options</h3>
            <p className="text-sm text-gray-700">
              Our platform offers customizable filters to match your exact needs for a boarding house.
            </p>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default WhyChooseUs;
