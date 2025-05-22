import { motion } from "framer-motion";
import { IconHome, IconUser, IconClipboard, IconCash } from "@tabler/icons-react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const sampleData = [{ value: 100 }, { value: 80 }, { value: 120 }, { value: 90 }];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {[
        { title: "Total Users", value: "1,250", color: "green", icon: <IconUser size={22} className="text-green-700" /> },
        { title: "Total Orders", value: "850", color: "purple", icon: <IconClipboard size={22} className="text-purple-700" /> },
        { title: "Revenue", value: "$25,000", color: "yellow", icon: <IconCash size={22} className="text-yellow-700" /> },
        { title: "Total Bookings", value: "420", color: "indigo", icon: <IconHome size={22} className="text-indigo-700" /> }
      ].map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative bg-${card.color}-100 p-4 rounded-lg border border-${card.color}-400 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4 w-full overflow-hidden`}
        >
          {/* Chart Background */}
          <div className="absolute inset-0 opacity-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleData}>
                <Bar dataKey="value" fill={`#${card.color}-700`} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Icon & Text */}
          <div className={`bg-${card.color}-300 p-2 rounded-full relative z-10`}>{card.icon}</div>
          <div className="relative z-10">
            <h4 className="text-gray-700 text-sm font-bold">{card.title}</h4>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Cards;
