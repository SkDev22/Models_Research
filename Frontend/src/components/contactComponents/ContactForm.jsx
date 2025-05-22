import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

// Validation schema using Zod
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

const ContactForm = () => {
  // Using react-hook-form and Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Handling form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-gray-900 text-gray-300 shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-400">Name</label>
          <input
            {...register("name")}
            className="w-full p-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-gray-400">Email</label>
          <input
            {...register("email")}
            className="w-full p-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <div>
          <label className="block text-gray-400">Message</label>
          <textarea
            {...register("message")}
            className="w-full p-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your message"
            rows="4"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
