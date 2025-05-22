import { motion } from 'framer-motion';
import { useState } from 'react';

const SecuritySettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    setShowChangePassword(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      {/* Change Password Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Password Settings</h3>
              <p className="text-gray-600 text-sm">Update your password</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowChangePassword(!showChangePassword)}
            className={`px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
              showChangePassword
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-gray-200/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50'
            }`}
          >
            {showChangePassword ? 'Cancel' : 'Change Password'}
          </motion.button>
        </div>

        {showChangePassword && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handlePasswordSubmit}
            className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 p-6 rounded-2xl border border-amber-100/50 backdrop-blur-sm space-y-4"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl shadow-lg shadow-amber-200/50 transition-all duration-300"
              >
                Update Password
              </motion.button>
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* Two-Factor Authentication Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Two-Factor Authentication</h3>
              <p className="text-gray-600 text-sm">Add an extra layer of security</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTwoFactor(!showTwoFactor)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                twoFactorEnabled
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-200/50'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50'
              }`}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </motion.button>
          </div>
        </div>

        {showTwoFactor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 p-6 rounded-2xl border border-amber-100/50 backdrop-blur-sm space-y-4"
          >
            {/* Two-factor setup content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-6xl">📱</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Scan QR Code</h4>
                  <p className="text-sm text-gray-600">
                    Use an authenticator app to scan this QR code
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    setShowTwoFactor(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl shadow-lg shadow-amber-200/50 transition-all duration-300"
                >
                  Verify & Enable
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SecuritySettings;
