import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingList = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Sample data - in a real app, this would come from your backend
  const bookings = {
    current: [
      {
        id: 1,
        roomNumber: 'B-304',
        type: 'Double Room',
        startDate: '2025-01-15',
        endDate: '2025-05-15',
        semester: 'Spring 2025',
        status: 'active',
        mealPlan: 'Standard',
        amount: 3200
      }
    ],
    past: [
      {
        id: 2,
        roomNumber: 'A-201',
        type: 'Shared Room',
        startDate: '2024-08-15',
        endDate: '2024-12-15',
        semester: 'Fall 2024',
        status: 'completed',
        mealPlan: 'Basic',
        amount: 2800
      },
      {
        id: 3,
        roomNumber: 'C-105',
        type: 'Triple Room',
        startDate: '2024-01-15',
        endDate: '2024-05-15',
        semester: 'Spring 2024',
        status: 'completed',
        mealPlan: 'Basic',
        amount: 2400
      }
    ]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4 p-4">
          {['current', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4">
        <div className="space-y-4">
          {bookings[activeTab].map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Room {booking.roomNumber}
                  </h3>
                  <p className="text-sm text-gray-600">{booking.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Start Date</p>
                  <p className="font-medium">{formatDate(booking.startDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600">End Date</p>
                  <p className="font-medium">{formatDate(booking.endDate)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Semester</p>
                  <p className="font-medium">{booking.semester}</p>
                </div>
                <div>
                  <p className="text-gray-600">Meal Plan</p>
                  <p className="font-medium">{booking.mealPlan}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">Booking Details</h2>
                  <p className="text-gray-600">Room {selectedBooking.roomNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Room Type</p>
                    <p className="font-medium">{selectedBooking.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{formatDate(selectedBooking.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-medium">{formatDate(selectedBooking.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Semester</p>
                    <p className="font-medium">{selectedBooking.semester}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Meal Plan</p>
                    <p className="font-medium">{selectedBooking.mealPlan}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-medium">${selectedBooking.amount}</p>
                  </div>
                </div>

                {selectedBooking.status === 'active' && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3">Quick Actions</h3>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Extend Stay
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Request Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingList;
