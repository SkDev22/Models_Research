import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PaymentOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Sample data - in a real app, this would come from your backend
  const paymentHistory = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1200 },
    { month: 'Mar', amount: 1200 },
    { month: 'Apr', amount: 1200 },
    { month: 'May', amount: 1200 },
    { month: 'Jun', amount: 1200 },
  ];

  const upcomingPayments = [
    {
      id: 1,
      description: 'Room Rent - April',
      amount: 1200,
      dueDate: '2025-04-01',
      status: 'Pending'
    },
    {
      id: 2,
      description: 'Meal Plan - April',
      amount: 400,
      dueDate: '2025-04-01',
      status: 'Pending'
    },
    {
      id: 3,
      description: 'Room Rent - March',
      amount: 1200,
      dueDate: '2025-03-01',
      status: 'Paid'
    }
  ];

  const chartData = [
    { month: 'Jan', amount: 3700 },
    { month: 'Feb', amount: 200 },
    { month: 'Mar', amount: 3200 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const calculateTotal = (payments) => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Total Paid</h3>
          <p className="text-3xl font-bold text-green-600">
            ${calculateTotal(paymentHistory)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Current Semester</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Upcoming Due</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${calculateTotal(upcomingPayments)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Next payment: {formatDate(upcomingPayments[0]?.dueDate)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Security Deposit</h3>
          <p className="text-3xl font-bold text-gray-800">$300</p>
          <p className="text-sm text-gray-600 mt-1">Refundable</p>
        </div>
      </motion.div>

      {/* Payment Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-6">Payment History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #F3F4F6',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar
                dataKey="amount"
                fill="#F59E0B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Upcoming Payments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Upcoming Payments</h3>
          <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            Pay Now
          </button>
        </div>
        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{payment.description}</h4>
                <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${payment.amount}</p>
                <span
                  className={`text-sm ${
                    payment.status === 'Paid'
                      ? 'text-green-600'
                      : 'text-amber-600'
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Credit Card</p>
                <p className="text-sm text-gray-600">**** **** **** 4242</p>
              </div>
            </div>
          </div>
          <button className="p-4 bg-white rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors flex items-center justify-center space-x-2">
            <span className="text-xl">➕</span>
            <span className="font-medium text-gray-900">Add New Method</span>
          </button>
        </div>
      </motion.div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Payment History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{payment.type}</h4>
                  <p className="text-sm text-gray-600">{formatDate(payment.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${payment.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Paid via {payment.method}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentOverview;
