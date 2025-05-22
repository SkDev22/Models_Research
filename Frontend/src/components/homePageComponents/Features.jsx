import React from 'react';
import { motion } from 'framer-motion';
import { 
  IconWifi, 
  IconShieldCheck, 
  IconClock24, 
  IconMapPin,
  IconBuildingCommunity,
  IconDeviceLaptop 
} from '@tabler/icons-react';

const Features = () => {
  const features = [
    {
      icon: <IconWifi size={32} />,
      title: "High-Speed WiFi",
      description: "Stay connected with fast and reliable internet access throughout the premises."
    },
    {
      icon: <IconShieldCheck size={32} />,
      title: "24/7 Security",
      description: "Feel safe with round-the-clock security and CCTV surveillance."
    },
    {
      icon: <IconClock24 size={32} />,
      title: "Support Services",
      description: "Access maintenance and support services whenever you need them."
    },
    {
      icon: <IconMapPin size={32} />,
      title: "Prime Location",
      description: "Just minutes away from SLIIT and local amenities in Malabe."
    },
    {
      icon: <IconBuildingCommunity size={32} />,
      title: "Community Areas",
      description: "Enjoy shared spaces for studying, relaxing, and socializing."
    },
    {
      icon: <IconDeviceLaptop size={32} />,
      title: "Study Facilities",
      description: "Dedicated study areas with proper lighting and furniture."
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience comfortable student living with our comprehensive amenities and services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
