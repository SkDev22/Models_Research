import { useState } from "react";
import { motion } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const faqs = [
  {
    question: "How can I book a stay?",
    answer: "You can book directly through our website by selecting your preferred location, date, and payment method.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, PayPal, and bank transfers. More payment options are coming soon!",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel within 24 hours for a full refund. After that, cancellation fees may apply.",
  },
  {
    question: "Do you offer discounts for long-term stays?",
    answer: "Yes, we provide special discounts for stays longer than 30 days. Contact us for more details!",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full px-6 sm:px-12 lg:px-24 py-16 bg-gray-900 text-gray-300 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

      {/* Floating Light Effect */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500 opacity-20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-amber-400 opacity-15 rounded-full blur-2xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      ></motion.div>

      {/* FAQ Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold text-white text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer relative z-10"
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">{faq.question}</h3>
                {openIndex === index ? (
                  <IconMinus size={24} className="text-amber-500" />
                ) : (
                  <IconPlus size={24} className="text-amber-500" />
                )}
              </div>

              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-gray-400 mt-3">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
