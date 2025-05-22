import { IconBell } from "@tabler/icons-react"; // Icon from Tabler
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-b from-amber-100/40 to-amber-300/30 backdrop-blur-lg shadow-lg p-4 rounded-lg">
      {/* Welcome Message */}
      <h2 className="text-xl font-semibold text-gray-900">Welcome, Admin!</h2>

      {/* Notification Icon */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative cursor-pointer">
        <IconBell className="w-6 h-6 text-gray-900" />
        {/* Notification Badge */}
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          3
        </span>
      </motion.div>
    </div>
  );
};

export default DashboardHeader;
