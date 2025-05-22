import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '../components/dashboardComponents/DashboardStats';
import BookingList from '../components/dashboardComponents/BookingList';
import RoomAvailability from '../components/dashboardComponents/RoomAvailability';
import PaymentOverview from '../components/dashboardComponents/PaymentOverview';
import Notifications from '../components/dashboardComponents/Notifications';
import StudentProfile from '../components/dashboardComponents/StudentProfile';
import Sidebar from '../components/sidebar/Sidebar';

const BookingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample user data - in a real app, this would come from your backend
  const userData = {
    name: "John Doe",
    studentId: "STU2024001",
    program: "Computer Science",
    yearOfStudy: "2nd Year",
    roomNumber: "B-304",
    mealPlan: "Standard",
    paymentStatus: "Up to date"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '📝' },
    { id: 'rooms', label: 'Room Status', icon: '🏠' },
    { id: 'payments', label: 'Payments', icon: '💰' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-6 overflow-y-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Housing Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userData.name}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex overflow-x-auto p-2 space-x-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'hover:bg-amber-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DashboardStats userData={userData} />
              </motion.div>
            )}

            {/* Bookings List */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BookingList />
              </motion.div>
            )}

            {/* Room Status */}
            {activeTab === 'rooms' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <RoomAvailability />
              </motion.div>
            )}

            {/* Payments Overview */}
            {activeTab === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PaymentOverview />
              </motion.div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentProfile userData={userData} />
              </motion.div>
            )}
          </div>

          {/* Right Column - Always visible */}
          <div className="space-y-6">
            {/* Notifications */}
            <Notifications />

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: 'Report Maintenance Issue', icon: '🔧' },
                  { label: 'Request Room Change', icon: '🔄' },
                  { label: 'Update Meal Plan', icon: '🍽️' },
                  { label: 'Contact Housing Office', icon: '📞' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center p-3 text-left rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <span className="text-xl mr-3">{action.icon}</span>
                    <span className="text-gray-700">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingDashboard;
