import React from 'react';
import { IconStar, IconStarFilled, IconMapPin, IconBrandWhatsapp, IconMapPin2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const AddProperty = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-yellow-200 rounded-full transform -rotate-6"></div>
              <div className="relative rounded-full overflow-hidden border-8 border-white shadow-xl">
                <img
                  src="/cOverview.jpg"
                  alt="Luxury Room Interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-teal-50 text-teal-600 font-medium text-sm">
              FOR OWNERS
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Need to add Your House too?
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <IconMapPin size={20} className="text-gray-500" />
              <span className="text-gray-600">Kurunegala</span>
              <span className="mx-2">|</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((_, i) => (
                  <IconStarFilled key={i} size={20} className="text-amber-400" />
                ))}
                <IconStar size={20} className="text-amber-400" />
                <span className="ml-2 text-gray-600">4.9 (300 reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              List your property with us and reach students looking for quality accommodation near SLIIT University. 
              We offer flexible room arrangements from single rooms (LKR 8,000/month) to group rooms (LKR 4,000/month), 
              making it easy to match your property with the right tenants.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+94123456789"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 rounded-lg font-semibold hover:bg-amber-500 transition-colors"
              >
                Call us Now
              </a>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/+94123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border border-gray-200 hover:border-amber-400 transition-colors"
                >
                  <IconBrandWhatsapp size={24} className="text-green-600" />
                </a>
                <a
                  href="https://maps.google.com/?q=Kurunegala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border border-gray-200 hover:border-amber-400 transition-colors"
                >
                  <IconMapPin2 size={24} className="text-gray-600" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
