import { motion } from 'framer-motion';
import { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Room Inspection',
      message: 'Scheduled room inspection tomorrow at 10 AM',
      type: 'info',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      title: 'Payment Due',
      message: 'Your April rent payment is due in 5 days',
      type: 'warning',
      time: '3 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Maintenance Complete',
      message: 'AC maintenance in your room has been completed',
      type: 'success',
      time: '1 day ago',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'info':
      default:
        return 'bg-amber-50 text-amber-800 border-amber-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 ${notification.read ? 'opacity-75' : ''} ${getTypeStyles(notification.type)} hover:bg-amber-50 transition-colors cursor-pointer`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{notification.title}</h4>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm">{notification.message}</p>
            {!notification.read && (
              <div className="mt-2 flex justify-end">
                <button
                  className="text-xs text-amber-600 hover:text-amber-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                >
                  Mark as read
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Settings Button */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100">
        <button className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg text-gray-700 hover:bg-amber-50 transition-colors flex items-center justify-center space-x-2">
          <span>⚙️</span>
          <span>Notification Settings</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Notifications;
