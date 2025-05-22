import { motion } from "framer-motion";

const HouseRules = () => {
  const rules = [
    {
      category: "General Rules",
      items: [
        { icon: "⏰", rule: "Entry gates close at 10:30 PM" },
        { icon: "🚭", rule: "No smoking inside the premises" },
        { icon: "🍺", rule: "No alcohol consumption allowed" },
        { icon: "👥", rule: "Visitors allowed only in common areas (9 AM - 8 PM)" }
      ]
    },
    {
      category: "Safety & Security",
      items: [
        { icon: "🔑", rule: "Always carry your access card" },
        { icon: "🚪", rule: "Don't share access codes with others" },
        { icon: "⚡", rule: "Switch off appliances when not in use" },
        { icon: "🆔", rule: "Report any suspicious activity" }
      ]
    },
    {
      category: "Maintenance & Cleanliness",
      items: [
        { icon: "🧹", rule: "Keep your room clean and tidy" },
        { icon: "🗑️", rule: "Dispose waste in designated bins" },
        { icon: "🚰", rule: "Report maintenance issues promptly" },
        { icon: "👕", rule: "Use laundry facilities as per schedule" }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">House Rules</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rules.map((section) => (
          <motion.div
            key={section.category}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-xl p-5"
          >
            <h3 className="font-medium text-gray-900 mb-4">{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-xl mr-3" role="img" aria-label="rule icon">
                    {item.icon}
                  </span>
                  <p className="text-gray-700 text-sm">{item.rule}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <p className="text-amber-700 text-sm">
          These rules are designed to ensure a comfortable and safe living environment for all residents.
          Repeated violations may result in disciplinary action.
        </p>
      </div>
    </motion.div>
  );
};

export default HouseRules;
