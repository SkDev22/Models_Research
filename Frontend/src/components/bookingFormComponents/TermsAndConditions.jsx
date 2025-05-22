import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditions = ({ accepted, onChange, errors }) => {
  const terms = [
    {
      title: "Room Usage",
      content: "The room is to be used solely for residential purposes. No business activities are permitted."
    },
    {
      title: "Security Deposit",
      content: "One month's rent is required as a security deposit, refundable upon proper check-out and room inspection."
    },
    {
      title: "House Rules",
      content: "Maintain cleanliness, respect quiet hours (10:00 PM to 6:00 AM), and follow all posted house rules."
    },
    {
      title: "Visitors",
      content: "Visitors must leave by 8:00 PM. Overnight guests are not permitted without prior approval."
    },
    {
      title: "Payment Terms",
      content: "Monthly rent is due on or before the 1st of each month. Late payments will incur additional charges."
    },
    {
      title: "Notice Period",
      content: "One month's notice is required before vacating the room. Deposit may be forfeited for early termination."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Terms and Conditions</h2>
      
      {/* Terms Sections */}
      <div className="space-y-4 mb-6">
        {terms.map((term, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-amber-50 p-4 rounded-lg border border-amber-100"
          >
            <h3 className="font-semibold text-amber-900 mb-2">
              {term.title}
            </h3>
            <p className="text-amber-800 text-sm">{term.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Agreement Section */}
      <div className="border-t pt-6">
        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I have read and agree to the terms and conditions <span className="text-red-500">*</span>
          </label>
        </div>
        {errors?.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
        )}

        {/* Additional Notes */}
        <div className="mt-4 text-sm text-gray-600">
          <p>
            By accepting these terms, you agree to follow all house rules and maintain a harmonious living environment.
            Contact the house manager if you have any questions about these terms.
          </p>
        </div>
      </div>

      {/* Confirmation Message */}
      <AnimatePresence>
        {accepted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg"
          >
            <p className="flex items-center">
              <span className="mr-2">✓</span>
              Thank you for accepting our terms and conditions
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TermsAndConditions;
