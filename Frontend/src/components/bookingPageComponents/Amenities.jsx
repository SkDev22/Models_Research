import { motion } from "framer-motion";

const Amenities = () => {
  const amenities = [
    {
      category: "Safety & Security",
      items: [
        { icon: "🔒", name: "24/7 Security" },
        { icon: "📹", name: "CCTV Surveillance" },
        { icon: "🚪", name: "Biometric Access" },
        { icon: "🔑", name: "Individual Lockers" }
      ]
    },
    {
      category: "Common Areas",
      items: [
        { icon: "📚", name: "Study Room" },
        { icon: "🛋️", name: "Common Lounge" },
        { icon: "🍽️", name: "Dining Area" },
        { icon: "🏃", name: "Recreation Room" }
      ]
    },
    {
      category: "Services",
      items: [
        { icon: "🧹", name: "Weekly Cleaning" },
        { icon: "👕", name: "Laundry Room" },
        { icon: "🥘", name: "Kitchen Access" },
        { icon: "🚲", name: "Bicycle Parking" }
      ]
    },
    {
      category: "Utilities",
      items: [
        { icon: "💡", name: "Electricity" },
        { icon: "🚰", name: "Water Supply" },
        { icon: "📶", name: "High-speed WiFi" },
        { icon: "❄️", name: "Air Conditioning" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Amenities & Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {amenities.map((category) => (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-xl mr-3" role="img" aria-label={item.name}>
                    {item.icon}
                  </span>
                  <span className="text-gray-700">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <h4 className="font-medium text-blue-900 mb-2">Additional Benefits</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
          <li className="flex items-center">
            <span className="mr-2">✨</span>
            Regular maintenance
          </li>
          <li className="flex items-center">
            <span className="mr-2">🎉</span>
            Community events
          </li>
          <li className="flex items-center">
            <span className="mr-2">🏥</span>
            First-aid facilities
          </li>
          <li className="flex items-center">
            <span className="mr-2">📞</span>
            24/7 support
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Amenities;
