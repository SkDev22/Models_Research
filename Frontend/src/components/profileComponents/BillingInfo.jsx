import { motion } from 'framer-motion';
import { useState } from 'react';

const BillingInfo = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      last4: '4242',
      expiry: '12/25',
      name: 'John Doe',
      isDefault: true,
      brand: 'Visa'
    },
    {
      id: 2,
      type: 'credit',
      last4: '8888',
      expiry: '09/24',
      name: 'John Doe',
      isDefault: false,
      brand: 'Mastercard'
    }
  ]);

  const [transactions] = useState([
    {
      id: 1,
      date: '2024-03-01',
      amount: 250000.00,
      description: 'Spring Semester Tuition',
      status: 'completed',
      paymentMethod: '**** 4242'
    },
    {
      id: 2,
      date: '2024-02-15',
      amount: 90000.00,
      description: 'Housing Deposit',
      status: 'completed',
      paymentMethod: '**** 8888'
    },
    {
      id: 3,
      date: '2024-02-01',
      amount: 25000.00,
      description: 'Lab Fees',
      status: 'pending',
      paymentMethod: '**** 4242'
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAddCard(false);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const renderPaymentMethodCard = (method) => (
    <motion.div
      key={method.id}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-xl border border-amber-100/50 backdrop-blur-sm overflow-hidden group"
    >
      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            <span className="text-2xl">{getCardIcon(method.brand)}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{method.brand}</h4>
              {method.isDefault && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              **** {method.last4} • Expires {method.expiry}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl">⋮</span>
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );

  const renderTransactionRow = (transaction) => (
    <motion.div
      key={transaction.id}
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-xl border border-amber-100/50 backdrop-blur-sm overflow-hidden group"
    >
      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            <span className="text-2xl">🧾</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{transaction.description}</h4>
            <p className="text-sm text-gray-600">
              {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`text-lg font-medium ${
            transaction.status === 'completed' ? 'text-green-600' : 'text-amber-600'
          }`}>
            {formatAmount(transaction.amount)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              transaction.status === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {transaction.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
      {/* Payment Methods Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white text-2xl">💳</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Payment Methods</h3>
              <p className="text-gray-600 text-sm">Manage your payment methods</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddCard(!showAddCard)}
            className={`px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
              showAddCard
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-gray-200/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50'
            }`}
          >
            {showAddCard ? 'Cancel' : 'Add Payment Method'}
          </motion.button>
        </div>

        {showAddCard && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 p-6 rounded-2xl border border-amber-100/50 backdrop-blur-sm space-y-4 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="123"
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
                Add Card
              </motion.button>
            </div>
          </motion.form>
        )}

        <div className="space-y-4">
          {paymentMethods.map(renderPaymentMethodCard)}
        </div>
      </motion.div>

      {/* Transactions Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <span className="text-white text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Transaction History</h3>
            <p className="text-gray-600 text-sm">View your recent transactions</p>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map(renderTransactionRow)}
        </div>

        {transactions.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-2xl border border-amber-100/50"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100/50">
              <span className="text-3xl">📭</span>
            </div>
            <h4 className="text-gray-800 font-medium mb-2">No transactions yet</h4>
            <p className="text-gray-600 text-sm">
              Your transaction history will appear here
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BillingInfo;
