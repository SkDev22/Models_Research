import { motion } from 'framer-motion';
import { useState } from 'react';

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1999-05-15',
    address: '123 Campus Drive',
    city: 'University City',
    state: 'CA',
    zipCode: '12345',
    program: 'Computer Science',
    yearOfStudy: '2nd Year',
    studentId: 'STU2024001'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsEditing(false);
  };

  const inputFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true, icon: '👤' },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true, icon: '👤' },
    { name: 'email', label: 'Email', type: 'email', required: true, icon: '📧' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true, icon: '📱' },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: '🎂' },
    { name: 'address', label: 'Address', type: 'text', required: true, icon: '🏠' },
    { name: 'city', label: 'City', type: 'text', required: true, icon: '🌆' },
    { name: 'state', label: 'State', type: 'text', required: true, icon: '📍' },
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true, icon: '📮' },
    { name: 'program', label: 'Program', type: 'text', required: true, icon: '📚' },
    { name: 'yearOfStudy', label: 'Year of Study', type: 'text', required: true, icon: '📅' },
    { name: 'studentId', label: 'Student ID', type: 'text', disabled: true, icon: '🆔' }
  ];

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
            <span className="text-white text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-600">{formData.program} • {formData.yearOfStudy}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
            isEditing
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-gray-200/50'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50'
          }`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </motion.button>
      </div>

      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <motion.div
              key={field.name}
              variants={inputVariants}
              className="relative group"
            >
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-amber-600"
              >
                <span className="flex items-center space-x-2">
                  <span>{field.icon}</span>
                  <span>{field.label}</span>
                </span>
              </label>
              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={field.disabled}
                    required={field.required}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                      ${field.disabled
                        ? 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                      } focus:outline-none`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent"
                >
                  <p className="text-gray-800">{formData[field.name]}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl shadow-lg shadow-amber-200/50 transition-all duration-300"
            >
              Save Changes
            </motion.button>
          </motion.div>
        )}
      </motion.form>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 pt-8 border-t border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Account Created', value: 'January 15, 2024', icon: '📅' },
            { label: 'Last Profile Update', value: 'March 1, 2024', icon: '🔄' },
            { label: 'Profile Status', value: 'Verified', icon: '✅' }
          ].map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100/30 p-4 rounded-xl border border-amber-100/50 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-gray-600 text-sm">{info.label}</p>
                  <p className="font-medium text-gray-900">{info.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfo;
