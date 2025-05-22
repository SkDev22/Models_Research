import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center"
          >
            <svg
              className="h-10 w-10 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Booking Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for choosing ComfortStay. Your booking has been successfully processed.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              What's Next?
            </h3>
            <ul className="space-y-3 text-sm text-amber-800">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                Check your email for booking confirmation details
              </li>
              <li className="flex items-start">
                <span className="mr-2">📝</span>
                Review your booking details and payment information
              </li>
              <li className="flex items-start">
                <span className="mr-2">📅</span>
                Mark your check-in date: We're excited to welcome you!
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-amber-800">
              If you have any questions or need to modify your booking, please contact our support team:
            </p>
            <div className="mt-2 text-sm text-amber-800">
              <p>📞 +94 1234567890</p>
              <p>✉️ support@comfortstay.com</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYouPage;
