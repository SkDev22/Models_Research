import React from "react";
import { motion } from "framer-motion";
import {
  IconBed,
  IconUsers,
  IconWifi,
  IconClock,
  IconShieldCheck,
  IconVacuumCleaner,
} from "@tabler/icons-react";

const FeaturedRooms = () => {
  const rooms = [
    {
      type: "Single Room",
      price: "LKR 8,000",
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        { icon: <IconUsers size={20} />, text: "1 Person" },
        { icon: <IconWifi size={20} />, text: "WiFi Access" },
        { icon: <IconShieldCheck size={20} />, text: "Individual Privacy" },
        { icon: <IconVacuumCleaner size={20} />, text: "Weekly Cleaning" },
      ],
      description:
        "Perfect for students who value privacy and individual space.",
    },
    {
      type: "Double Room",
      price: "LKR 6,000",
      image:
        "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        { icon: <IconUsers size={20} />, text: "2 People" },
        { icon: <IconWifi size={20} />, text: "WiFi Access" },
        { icon: <IconShieldCheck size={20} />, text: "Balanced Privacy" },
        { icon: <IconVacuumCleaner size={20} />, text: "Weekly Cleaning" },
      ],
      description: "Ideal balance between cost and comfort with a roommate.",
    },
    {
      type: "Shared Room",
      price: "LKR 4,500",
      image:
        "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        { icon: <IconUsers size={20} />, text: "3 People" },
        { icon: <IconWifi size={20} />, text: "WiFi Access" },
        { icon: <IconShieldCheck size={20} />, text: "24/7 Security" },
        { icon: <IconVacuumCleaner size={20} />, text: "Weekly Cleaning" },
      ],
      description: "Economical option with a vibrant community atmosphere.",
    },
    {
      type: "Group Room",
      price: "LKR 4,000",
      image:
        "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        { icon: <IconUsers size={20} />, text: "4+ People" },
        { icon: <IconWifi size={20} />, text: "WiFi Access" },
        { icon: <IconShieldCheck size={20} />, text: "Most Economical" },
        { icon: <IconVacuumCleaner size={20} />, text: "Weekly Cleaning" },
      ],
      description: "Most economical option perfect for group living.",
    },
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Available Room Types
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our selection of comfortable and well-equipped rooms.
            All rooms include basic utilities, WiFi, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.type}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition group"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                <img
                  src={room.image}
                  alt={room.type}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-white font-semibold text-xl">
                    {room.type}
                  </p>
                  <p className="text-amber-500 font-medium">
                    {room.price}/month
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-4 h-12">{room.description}</p>
                <div className="space-y-3">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-400">
                      <span className="text-amber-500 mr-2">
                        {feature.icon}
                      </span>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  <p> Basic utilities included</p>
                  <p> Security deposit: One month's rent</p>
                  <p> 5% discount on 3-month advance</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRooms;
