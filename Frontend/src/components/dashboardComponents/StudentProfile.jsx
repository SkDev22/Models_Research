import { useState } from 'react';
import { motion } from 'framer-motion';

const StudentProfile = ({ userData }) => {
  const [activeSection, setActiveSection] = useState('personal');

  // Sample data - in a real app, this would come from your backend
  const profileData = {
    personal: {
      fullName: userData.name,
      studentId: userData.studentId,
      email: 'john.doe@university.edu',
      phone: '+1 (555) 123-4567',
      program: userData.program,
      yearOfStudy: userData.yearOfStudy,
      dateOfBirth: '1999-05-15',
      nationality: 'United States'
    },
    accommodation: {
      roomNumber: userData.roomNumber,
      buildingName: 'Block B',
      floor: '3rd Floor',
      roomType: 'Double Room',
      checkInDate: '2025-01-15',
      checkOutDate: '2025-05-15',
      mealPlan: userData.mealPlan
    },
    emergency: {
      primaryContact: {
        name: 'Jane Doe',
        relationship: 'Parent',
        phone: '+1 (555) 987-6543',
        email: 'jane.doe@email.com',
        address: '123 Main St, Anytown, USA'
      },
      secondaryContact: {
        name: 'Mike Smith',
        relationship: 'Uncle',
        phone: '+1 (555) 456-7890',
        email: 'mike.smith@email.com'
      },
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Peanuts'],
        medications: 'None'
      }
    },
    preferences: {
      dietaryRestrictions: ['Vegetarian'],
      studyHabits: 'Night owl',
      hobbies: ['Reading', 'Basketball', 'Photography'],
      languages: ['English', 'Spanish']
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'accommodation', label: 'Accommodation', icon: '🏠' },
    { id: 'emergency', label: 'Emergency Contacts', icon: '🚨' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Profile Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{profileData.personal.fullName}</h2>
            <p className="text-gray-600">{profileData.personal.studentId}</p>
            <p className="text-sm text-gray-500">{profileData.personal.program}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4 p-4 overflow-x-auto">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6">
        {/* Personal Information */}
        {activeSection === 'personal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData.personal).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600">
                    {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                  </label>
                  <p className="mt-1 text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Accommodation Details */}
        {activeSection === 'accommodation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData.accommodation).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600">
                    {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                  </label>
                  <p className="mt-1 text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Emergency Contacts */}
        {activeSection === 'emergency' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium mb-4">Primary Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(profileData.emergency.primaryContact).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-600">
                      {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                    </label>
                    <p className="mt-1 text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(profileData.emergency.medicalInfo).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-600">
                      {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                    </label>
                    <p className="mt-1 text-gray-900">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences */}
        {activeSection === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData.preferences).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600">
                    {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                  </label>
                  <p className="mt-1 text-gray-900">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Change Password
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
