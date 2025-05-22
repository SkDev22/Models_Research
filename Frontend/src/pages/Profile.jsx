import { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

const Profile = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  
  const getTitle = () => {
    switch(currentPath) {
      case 'security':
        return 'Security Settings';
      case 'preferences':
        return 'Preferences';
      case 'documents':
        return 'Documents';
      case 'billing':
        return 'Billing Information';
      default:
        return 'Personal Information';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-100/30">
      <Sidebar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-8 lg:p-12"
      >
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white text-2xl">
                {currentPath === 'security' ? '🔒' :
                 currentPath === 'preferences' ? '⚙️' :
                 currentPath === 'documents' ? '📄' :
                 currentPath === 'billing' ? '💳' : '👤'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {getTitle()}
              </h1>
              <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          variants={contentVariants}
          className="relative bg-white rounded-2xl shadow-xl shadow-amber-100/50 backdrop-blur-xl border border-amber-100/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 via-transparent to-amber-100/10 rounded-2xl pointer-events-none"></div>
          <Outlet />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Account Status', value: 'Active', color: 'text-green-600' },
            { label: 'Last Login', value: '2 hours ago', color: 'text-amber-600' },
            { label: 'Documents', value: '5 Verified', color: 'text-blue-600' },
            { label: 'Next Payment', value: 'March 15', color: 'text-purple-600' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-lg shadow-amber-100/30 border border-amber-100/20 backdrop-blur-xl"
            >
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <p className={`text-lg font-semibold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
