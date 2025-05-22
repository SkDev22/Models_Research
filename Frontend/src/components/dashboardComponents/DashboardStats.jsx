import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardStats = ({ userData }) => {
  // Sample data - in a real app, this would come from your backend
  const stats = {
    semesterProgress: 65,
    mealPlanUsage: 45,
    roomStatus: 'Occupied',
    daysLeft: 75,
    upcomingPayment: {
      amount: 1200,
      dueDate: '2025-04-15'
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Semester Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Semester Progress</h3>
        <div className="w-32 h-32 mx-auto mb-4">
          <CircularProgressbar
            value={stats.semesterProgress}
            text={`${stats.semesterProgress}%`}
            styles={buildStyles({
              textColor: '#f59e0b',
              pathColor: '#f59e0b',
              trailColor: '#fde68a'
            })}
          />
        </div>
        <p className="text-center text-gray-600">
          {stats.daysLeft} days remaining
        </p>
      </motion.div>

      {/* Room Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Room Status</h3>
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🏠</span>
            </div>
            <p className="font-medium text-gray-900">{userData.roomNumber}</p>
            <p className="text-sm text-gray-600">{stats.roomStatus}</p>
          </div>
        </div>
      </motion.div>

      {/* Meal Plan Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Meal Plan Usage</h3>
        <div className="w-32 h-32 mx-auto mb-4">
          <CircularProgressbar
            value={stats.mealPlanUsage}
            text={`${stats.mealPlanUsage}%`}
            styles={buildStyles({
              textColor: '#f59e0b',
              pathColor: '#f59e0b',
              trailColor: '#fde68a'
            })}
          />
        </div>
        <p className="text-center text-gray-600">
          {userData.mealPlan} Plan
        </p>
      </motion.div>

      {/* Secondary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg shadow-sm md:col-span-2 lg:col-span-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray-600">Next Payment</p>
            <p className="text-2xl font-semibold text-amber-600">
              ${stats.upcomingPayment.amount}
            </p>
            <p className="text-sm text-gray-500">Due {stats.upcomingPayment.dueDate}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Payment Status</p>
            <p className="text-xl font-semibold text-green-600">
              {userData.paymentStatus}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Academic Year</p>
            <p className="text-xl font-semibold text-gray-800">
              {userData.yearOfStudy}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
