import { motion } from 'framer-motion';
import { useState } from 'react';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      allowMessages: true
    },
    regional: {
      language: 'English',
      timezone: 'America/Los_Angeles',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleToggle = (section, setting) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting]
      }
    }));
  };

  const handleSelect = (section, setting, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value
      }
    }));
  };

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

  const renderSection = (title, icon, description, children) => (
    <motion.div variants={itemVariants} className="mb-12">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
          <span className="text-white text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 p-6 rounded-2xl border border-amber-100/50 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );

  const renderToggle = (section, setting, label) => (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between py-3"
    >
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => handleToggle(section, setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          preferences[section][setting]
            ? 'bg-gradient-to-r from-amber-500 to-amber-600'
            : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
            preferences[section][setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </motion.div>
  );

  const renderSelect = (section, setting, label, options) => (
    <motion.div variants={itemVariants} className="py-3">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={preferences[section][setting]}
          onChange={(e) => handleSelect(section, setting, e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-white appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      {renderSection('Notifications', '🔔', 'Manage how you receive updates', (
        <div className="space-y-2">
          {renderToggle('notifications', 'email', 'Email Notifications')}
          {renderToggle('notifications', 'push', 'Push Notifications')}
          {renderToggle('notifications', 'sms', 'SMS Notifications')}
          {renderToggle('notifications', 'newsletter', 'Weekly Newsletter')}
        </div>
      ))}

      {renderSection('Appearance', '🎨', 'Customize your viewing experience', (
        <div className="space-y-4">
          {renderSelect('appearance', 'theme', 'Theme', [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ])}
          {renderSelect('appearance', 'fontSize', 'Font Size', [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ])}
          {renderToggle('appearance', 'reducedMotion', 'Reduced Motion')}
          {renderToggle('appearance', 'highContrast', 'High Contrast')}
        </div>
      ))}

      {renderSection('Privacy', '🔒', 'Control your privacy settings', (
        <div className="space-y-4">
          {renderSelect('privacy', 'profileVisibility', 'Profile Visibility', [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'friends', label: 'Friends Only' }
          ])}
          {renderToggle('privacy', 'showActivity', 'Show Activity Status')}
          {renderToggle('privacy', 'allowMessages', 'Allow Direct Messages')}
        </div>
      ))}

      {renderSection('Regional', '🌍', 'Set your regional preferences', (
        <div className="space-y-4">
          {renderSelect('regional', 'language', 'Language', [
            { value: 'English', label: 'English' },
            { value: 'Spanish', label: 'Spanish' },
            { value: 'French', label: 'French' }
          ])}
          {renderSelect('regional', 'timezone', 'Time Zone', [
            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'Europe/London', label: 'London (GMT)' }
          ])}
          {renderSelect('regional', 'dateFormat', 'Date Format', [
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
          ])}
        </div>
      ))}
    </motion.div>
  );
};

export default Preferences;
