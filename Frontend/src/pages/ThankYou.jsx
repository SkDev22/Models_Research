import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('booking');
  const [showConfetti, setShowConfetti] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3B82F6",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.3,
          opacity: 1,
          speed: 3
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  const bookingDetails = {
    bookingId: "BH" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    academicYear: "2025-2026",
    semester: "Fall Semester",
    roomType: "Shared Room (2 Students)",
    mealPlan: "Basic (Breakfast Only)",
    monthlyRent: "$300",
    mealPlanCost: "$100"
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5
          }}
          className="text-center max-w-4xl w-full"
        >
          {/* Celebration Animation */}
          <div className="flex justify-center space-x-4 mb-6">
            {["📚", "🎓", "🏠"].map((emoji, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: index * 0.3
                }}
                className="text-6xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Welcome to Your New Home!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Your accommodation request has been successfully submitted. Get ready for an amazing academic year!
          </motion.p>

          {/* Interactive Tabs */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              {['booking', 'timeline', 'contact'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabVariants}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'booking' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-semibold">Application ID:</span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="font-mono bg-white px-3 py-1 rounded border border-blue-200"
                      >
                        {bookingDetails.bookingId}
                      </motion.span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Academic Year</p>
                        <p className="font-semibold">{bookingDetails.academicYear}</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-gray-600">Semester</p>
                        <p className="font-semibold">{bookingDetails.semester}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span>Room Assignment</span>
                      <span className="font-semibold">{bookingDetails.roomType}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span>Meal Plan</span>
                      <span className="font-semibold">{bookingDetails.mealPlan}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly Rent</p>
                        <p className="font-semibold">{bookingDetails.monthlyRent}</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <p className="text-sm text-gray-600">Meal Plan Cost</p>
                        <p className="font-semibold">{bookingDetails.mealPlanCost}/month</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-6">
                    {[
                      { icon: "📧", title: "Application Received", time: "Just now", status: "complete" },
                      { icon: "📝", title: "Document Verification", time: "Within 48 hours", status: "pending" },
                      { icon: "💳", title: "Payment Instructions", time: "After verification", status: "pending" },
                      { icon: "🔑", title: "Room Assignment", time: "2 weeks before semester", status: "pending" },
                      { icon: "📦", title: "Move-in Day", time: "Start of semester", status: "pending" }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'complete' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.time}</p>
                        </div>
                        {step.status === 'complete' && (
                          <span className="text-green-500">✓</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-blue-50 rounded-lg"
                    >
                      <h3 className="font-semibold mb-2">Housing Office</h3>
                      <p className="text-gray-600">📞 +1 (234) 567-8900</p>
                      <p className="text-gray-600">📧 housing@university.edu</p>
                      <p className="text-gray-600">🏢 Student Center, Room 200</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-green-50 rounded-lg"
                    >
                      <h3 className="font-semibold mb-2">Resident Advisor</h3>
                      <p className="text-gray-600">Will be assigned upon move-in</p>
                      <p className="text-gray-600">Available 24/7 for assistance</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-yellow-50 rounded-lg"
                    >
                      <h3 className="font-semibold mb-2">Important Links</h3>
                      <div className="space-y-2">
                        <p className="text-blue-600 cursor-pointer hover:underline">📋 Housing Policies</p>
                        <p className="text-blue-600 cursor-pointer hover:underline">📅 Academic Calendar</p>
                        <p className="text-blue-600 cursor-pointer hover:underline">🏫 Campus Map</p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
              className="bg-white border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">📄</span> Save Application
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">🏠</span> Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
