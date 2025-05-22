import { motion } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the booking process?",
      answer: "The booking process is simple: Select your preferred room type, fill out the booking form, pay the security deposit, and move in on your scheduled date. Our staff will guide you through the entire process."
    },
    {
      question: "What's included in the rent?",
      answer: "Your rent includes utilities (electricity, water), WiFi, weekly cleaning service, access to all common areas and facilities, and basic maintenance. Additional services like laundry may have separate charges."
    },
    {
      question: "Is there a minimum stay requirement?",
      answer: "Yes, we require a minimum stay of 3 months. This helps us maintain a stable and comfortable environment for all residents."
    },
    {
      question: "What's the security deposit?",
      answer: "The security deposit is equal to one month's rent. It's fully refundable at the end of your stay, subject to room condition and adherence to notice period."
    },
    {
      question: "Are meals provided?",
      answer: "We don't provide meals, but you have access to a fully equipped kitchen where you can cook. There are also many restaurants and cafes nearby."
    },
    {
      question: "What's the guest policy?",
      answer: "Guests are allowed in common areas from 9 AM to 8 PM. Overnight guests are not permitted to maintain security and comfort for all residents."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border-b border-amber-100 last:border-0 pb-4 last:pb-0"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left group"
            >
              <h3 className="font-medium text-gray-900 group-hover:text-amber-600">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-amber-500 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIndex === index ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg flex items-start border border-amber-200">
        <span className="text-xl mr-3" role="img" aria-label="info">
          ℹ️
        </span>
        <p className="text-amber-800 text-sm">
          Still have questions? Feel free to contact us at support@LodgeLink.com or call us at +94 77 123 4567
        </p>
      </div>
    </motion.div>
  );
};

export default FAQ;
