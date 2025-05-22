import React from 'react';
import { motion } from 'framer-motion';
import { IconHome, IconUsers, IconStar, IconMapPin } from '@tabler/icons-react';

const Stats = () => {
  const stats = [
    {
      icon: <IconHome size={32} />,
      value: "100+",
      label: "Rooms Available",
    },
    {
      icon: <IconUsers size={32} />,
      value: "500+",
      label: "Happy Students",
    },
    {
      icon: <IconStar size={32} />,
      value: "4.8",
      label: "Average Rating",
    },
    {
      icon: <IconMapPin size={32} />,
      value: "5 min",
      label: "To SLIIT Campus",
    },
  ];

  return (
    <div className="relative bg-amber-500 py-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          className="w-full text-white transform rotate-180"
          viewBox="0 0 1440 50"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,50 C280,0 1160,50 1440,0 L1440,50 L0,50 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-xl text-amber-500">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-amber-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full text-gray-900"
          viewBox="0 0 1440 50"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,50 C280,0 1160,50 1440,0 L1440,50 L0,50 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Stats;
