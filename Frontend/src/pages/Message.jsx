import Sidebar from "../components/sidebar/Sidebar";
import { motion } from "framer-motion";

const Message = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <Sidebar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-8 lg:p-12"
      >
        <h1>Message</h1>
      </motion.div>
    </div>
  );
};

export default Message;
