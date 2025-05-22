import { motion } from 'framer-motion';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

const OurTeam = () => {
  // Animation configuration for the sections
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section id="our-team" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          {...animationProps}
          className="text-3xl md:text-5xl font-semibold text-amber-600 mb-6"
        >
          Meet Our Team
        </motion.h2>

        {/* Subheading */}
        <motion.p
          {...animationProps}
          transition={{ ...animationProps.transition, duration: 1 }}
          className="text-lg md:text-2xl text-gray-700 mb-12 mx-auto max-w-3xl"
        >
          We are a passionate group of professionals dedicated to delivering the best experience for our users.
        </motion.p>

        {/* Team Members */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
          initial="hidden"
          whileInView="visible"
        >
          {/* Team Member 1 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.2 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 hover:bg-amber-100 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-center mb-4">
              <img
                src="/sahan.jpg"
                alt="Sahan Kalhara"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-600 mb-2">Sahan Rathnayake</h3>
            <p className="text-sm text-gray-500 mb-4">CEO & Founder</p>
            <p className="text-base text-gray-600 mb-4">
              Sahan is passionate about technology and innovation. He is committed to leading our company toward excellence.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandLinkedin className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandGithub className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.4 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 hover:bg-amber-100 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-center mb-4">
              <img
                src="/vihan.jpg"
                alt="Team Member 2"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-600 mb-2">Vihan Jayasinghe</h3>
            <p className="text-sm text-gray-500 mb-4">Lead Designer</p>
            <p className="text-base text-gray-600 mb-4">
              Vihan is the creative genius behind our stunning UI/UX designs. He strives for perfection in every project.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://www.linkedin.com/in/vihan-jayasinghe01/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandLinkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/IT21314742"  target="_blank" rel="noopener noreferrer"  className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandGithub className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 hover:bg-amber-100 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-center mb-4">
              <img
                src="/kavidu.jpg"
                alt="Kavindu Perera"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-600 mb-2">Kavindu Perera</h3>
            <p className="text-sm text-gray-500 mb-4">Backend Developer</p>
            <p className="text-base text-gray-600 mb-4">
              Kavindu ensures our platform runs smoothly and efficiently with backend logic.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandLinkedin className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandGithub className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Team Member 4 */}
          <motion.div
            {...animationProps}
            transition={{ ...animationProps.transition, duration: 1.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 hover:bg-amber-100 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-center mb-4">
              <img
                src="/haridu.jpg"
                alt="Harindu Munasinghe"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-600 mb-2">Harindu Munasinghe</h3>
            <p className="text-sm text-gray-500 mb-4">VR/ 360 Developer</p>
            <p className="text-base text-gray-600 mb-4">
              Harindu develops immersive 360-degree experiences for our platform.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandLinkedin className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700">
                <IconBrandGithub className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
