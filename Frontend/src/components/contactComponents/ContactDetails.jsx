import { motion } from "framer-motion";
import { 
  IconMapPin, 
  IconPhone, 
  IconMail, 
  IconClock, 
  IconBrandWhatsapp, 
  IconBrandTelegram 
} from "@tabler/icons-react";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const hoverEffect = {
  hover: {
    y: -5,
    boxShadow: "0px 10px 20px rgba(255, 193, 7, 0.2)",
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
};

const ContactDetails = () => {
  const contactItems = [
    { icon: <IconMapPin size={26} />, title: "Address", detail: "123 Main Street, City, Country" },
    { icon: <IconPhone size={26} />, title: "Phone", detail: "+123 456 7890" },
    { icon: <IconMail size={26} />, title: "Email", detail: "contact@company.com" },
    { icon: <IconClock size={26} />, title: "Working Hours", detail: "Mon - Fri: 9 AM - 6 PM" },
    { 
      icon: <IconBrandWhatsapp size={26} />, 
      title: "WhatsApp", 
      detail: "+123 456 7890", 
      link: "https://wa.me/1234567890"
    },
    { 
      icon: <IconBrandTelegram size={26} />, 
      title: "Telegram", 
      detail: "@companysupport", 
      link: "https://t.me/companysupport"
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-gray-900 text-gray-300 shadow-lg rounded-lg border border-gray-700"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* About Us Section */}
      <motion.div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-white mb-3">About Us</h2>
        <p className="text-gray-400 text-md leading-relaxed">
          At <span className="text-amber-500 font-medium">LodgeLink</span>, we specialize in providing top-notch accommodations with a seamless booking experience. 
          Our mission is to make finding the perfect stay effortless, whether you're traveling for business or leisure.
        </p>
      </motion.div>

      {/* Contact Information */}
      <h2 className="text-2xl font-semibold text-center mb-6 text-white">
        Contact Information
      </h2>

      <div className="space-y-6">
        {contactItems.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 bg-gray-800"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            // whileHover="hover"
            // variants={{ ...itemVariants, ...hoverEffect }}
          >
            <div className="text-amber-500">{item.icon}</div>
            <div>
              <h3 className="font-medium text-lg text-white">{item.title}</h3>
              {item.link ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  {item.detail}
                </a>
              ) : (
                <p className="text-gray-400">{item.detail}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactDetails;
