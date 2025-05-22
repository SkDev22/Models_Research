import React from 'react';
import { motion } from 'framer-motion';
import { IconStarFilled, IconQuote } from '@tabler/icons-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Gihan Kumara",
      avatar: "https://i.pravatar.cc/150?img=11",
      role: "Computer Science Student",
      content: "The perfect balance of comfort and affordability. The location near SLIIT makes my daily commute a breeze.",
      rating: 5
    },
    {
      name: "Mandira Wanshathilake",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Engineering Student",
      content: "Great community atmosphere and study facilities. The WiFi is reliable and perfect for online classes.",
      rating: 5
    },
    {
      name: "Nandun Wijerathne",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "IT Student",
      content: "The security and support staff are excellent. I feel safe and well-taken care of here.",
      rating: 4
    }
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">What Our Residents Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from students who have made our accommodation their home away from home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-xl relative"
            >
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white">
                <IconQuote size={20} />
              </div>
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-white font-medium">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <IconStarFilled key={i} size={20} className="text-amber-500" />
                ))}
              </div>

              <p className="text-gray-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
