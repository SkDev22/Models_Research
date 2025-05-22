// import { motion } from "framer-motion";

// const PaymentDetails = ({ formData, onInputChange, errors }) => {
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     onInputChange(name, type === 'checkbox' ? checked : value);
//   };

//   const calculateTotal = () => {
//     const basePrice = {
//       single: 8000,
//       double: 6000,
//       shared: 4500,
//       group: 4000
//     }[formData.roomType] || 0;

//     const duration = parseInt(formData.duration) || 1;
//     const discount = duration >= 12 ? 0.15 : duration >= 6 ? 0.10 : duration >= 3 ? 0.05 : 0;

//     const monthlyPrice = basePrice * (1 - discount);
//     const totalPrice = monthlyPrice * duration;
//     const deposit = basePrice;

//     return {
//       monthly: monthlyPrice,
//       total: totalPrice,
//       deposit: deposit,
//       discount: discount * 100
//     };
//   };

//   const pricing = calculateTotal();

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Details</h2>
//         <p className="text-gray-600 mb-6">
//           Please review your booking details and complete the payment information.
//         </p>
//       </div>

//       {/* Price Summary */}
//       <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//         <h3 className="text-lg font-medium text-gray-900">Price Summary</h3>
//         <div className="space-y-2">
//           <div className="flex justify-between text-gray-600">
//             <span>Monthly Rent:</span>
//             <span>LKR {pricing.monthly.toLocaleString()}</span>
//           </div>
//           {pricing.discount > 0 && (
//             <div className="flex justify-between text-green-600">
//               <span>Long-term Discount:</span>
//               <span>{pricing.discount}% off</span>
//             </div>
//           )}
//           <div className="flex justify-between text-gray-600">
//             <span>Duration:</span>
//             <span>{formData.duration} months</span>
//           </div>
//           <div className="flex justify-between text-gray-600">
//             <span>Security Deposit:</span>
//             <span>LKR {pricing.deposit.toLocaleString()}</span>
//           </div>
//           <div className="pt-2 border-t">
//             <div className="flex justify-between font-medium text-lg">
//               <span>Total Amount:</span>
//               <span>LKR {(pricing.total + pricing.deposit).toLocaleString()}</span>
//             </div>
//             <p className="text-sm text-gray-500 mt-1">
//               Includes first {formData.duration} months' rent and security deposit
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
//         <div className="space-y-4">
//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="card"
//               name="paymentMethod"
//               value="card"
//               checked={formData.paymentMethod === 'card'}
//               onChange={handleChange}
//               className="h-4 w-4 text-amber-500 focus:ring-amber-500"
//             />
//             <label htmlFor="card" className="ml-3">
//               <span className="block text-sm font-medium text-gray-900">Credit/Debit Card</span>
//             </label>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="bank"
//               name="paymentMethod"
//               value="bank"
//               checked={formData.paymentMethod === 'bank'}
//               onChange={handleChange}
//               className="h-4 w-4 text-amber-500 focus:ring-amber-500"
//             />
//             <label htmlFor="bank" className="ml-3">
//               <span className="block text-sm font-medium text-gray-900">Bank Transfer</span>
//             </label>
//           </div>
//         </div>
//         {errors.paymentMethod && (
//           <p className="text-red-600 text-sm">{errors.paymentMethod}</p>
//         )}
//       </div>

//       {/* Card Details */}
//       {formData.paymentMethod === 'card' && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="space-y-4"
//         >
//           <div>
//             <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
//               Card Number
//             </label>
//             <input
//               type="text"
//               id="cardNumber"
//               name="cardNumber"
//               value={formData.cardNumber}
//               onChange={handleChange}
//               placeholder="1234 5678 9012 3456"
//               className={`mt-1 block w-full rounded-md shadow-sm ${
//                 errors.cardNumber ? 'border-red-300' : 'border-gray-300'
//               } focus:border-amber-500 focus:ring-amber-500`}
//             />
//             {errors.cardNumber && (
//               <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
//                 Expiry Date
//               </label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 placeholder="MM/YY"
//                 className={`mt-1 block w-full rounded-md shadow-sm ${
//                   errors.expiryDate ? 'border-red-300' : 'border-gray-300'
//                 } focus:border-amber-500 focus:ring-amber-500`}
//               />
//               {errors.expiryDate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
//                 CVV
//               </label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={formData.cvv}
//                 onChange={handleChange}
//                 placeholder="123"
//                 className={`mt-1 block w-full rounded-md shadow-sm ${
//                   errors.cvv ? 'border-red-300' : 'border-gray-300'
//                 } focus:border-amber-500 focus:ring-amber-500`}
//               />
//               {errors.cvv && (
//                 <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Bank Transfer Details */}
//       {formData.paymentMethod === 'bank' && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="bg-amber-50 border border-amber-200 rounded-lg p-4"
//         >
//           <h4 className="font-medium text-amber-900 mb-2">Bank Transfer Information</h4>
//           <div className="space-y-2 text-sm text-amber-800">
//             <p>Please transfer the total amount to:</p>
//             <div className="bg-white rounded p-3 space-y-1">
//               <p><strong>Bank:</strong> ComfortStay Bank</p>
//               <p><strong>Account Name:</strong> ComfortStay Boarding House</p>
//               <p><strong>Account Number:</strong> 1234-5678-9012-3456</p>
//               <p><strong>Branch:</strong> Main Branch</p>
//               <p><strong>Reference:</strong> Your full name</p>
//             </div>
//             <p className="mt-2">
//               Please note: Your booking will be confirmed once we receive the payment.
//               Send the payment receipt to support@comfortstay.com
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {/* Terms and Conditions */}
//       <div className="pt-6">
//         <div className="flex items-start">
//           <div className="flex items-center h-5">
//             <input
//               type="checkbox"
//               id="termsAccepted"
//               name="termsAccepted"
//               checked={formData.termsAccepted}
//               onChange={handleChange}
//               className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
//             />
//           </div>
//           <div className="ml-3">
//             <label htmlFor="termsAccepted" className="text-sm text-gray-700">
//               I agree to the{" "}
//               <a href="#" className="text-amber-600 hover:text-amber-500">
//                 Terms and Conditions
//               </a>{" "}
//               and{" "}
//               <a href="#" className="text-amber-600 hover:text-amber-500">
//                 Privacy Policy
//               </a>
//             </label>
//             {errors.termsAccepted && (
//               <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;

import { motion } from "framer-motion";

const PaymentDetails = ({ formData, onInputChange, errors }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onInputChange(name, type === "checkbox" ? checked : value);
  };

  const calculateTotal = () => {
    const basePrice =
      {
        single: 8000,
        double: 6000,
        shared: 4500,
        group: 4000,
      }[formData.roomType] || 0;

    const duration = parseInt(formData.duration) || 1;
    const discount =
      duration >= 12 ? 0.15 : duration >= 6 ? 0.1 : duration >= 3 ? 0.05 : 0;

    const monthlyPrice = basePrice * (1 - discount);
    const totalPrice = monthlyPrice * duration;
    const deposit = basePrice;

    return {
      monthly: monthlyPrice,
      total: totalPrice,
      deposit: deposit,
      discount: discount * 100,
    };
  };

  const pricing = calculateTotal();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Details
        </h2>
        <p className="text-gray-600">
          Please review your booking details and complete the payment
          information.
        </p>
      </div>

      {/* Price Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-900">Price Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Monthly Rent:</span>
            <span className="font-medium">
              LKR {pricing.monthly.toLocaleString()}
            </span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Long-term Discount:</span>
              <span className="font-medium">{pricing.discount}% off</span>
            </div>
          )}
          <div className="flex justify-between text-gray-700">
            <span>Duration:</span>
            <span className="font-medium">{formData.duration} months</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Security Deposit:</span>
            <span className="font-medium">
              LKR {pricing.deposit.toLocaleString()}
            </span>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Amount:</span>
              <span>
                LKR {(pricing.total + pricing.deposit).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Includes first {formData.duration} months' rent and security
              deposit
            </p>
          </div>
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleChange}
              className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300"
            />
            <label htmlFor="card" className="flex-1">
              <span className="block text-sm font-medium text-gray-900">
                Credit/Debit Card
              </span>
              <span className="block text-sm text-gray-500">
                Pay securely with your card
              </span>
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="bank"
              checked={formData.paymentMethod === "bank"}
              onChange={handleChange}
              className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300"
            />
            <label htmlFor="bank" className="flex-1">
              <span className="block text-sm font-medium text-gray-900">
                Bank Transfer
              </span>
              <span className="block text-sm text-gray-500">
                Transfer funds directly to our account
              </span>
            </label>
          </div>
        </div>
        {errors.paymentMethod && (
          <p className="text-red-600 text-sm mt-2">{errors.paymentMethod}</p>
        )}
      </motion.div>

      {/* Card Details */}
      {formData.paymentMethod === "card" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900">Card Details</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={`mt-1 block w-full rounded-md border ${
                  errors.cardNumber ? "border-red-300" : "border-gray-300"
                } focus:border-amber-500 focus:ring-amber-500 shadow-sm`}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.expiryDate ? "border-red-300" : "border-gray-300"
                  } focus:border-amber-500 focus:ring-amber-500 shadow-sm`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.cvv ? "border-red-300" : "border-gray-300"
                  } focus:border-amber-500 focus:ring-amber-500 shadow-sm`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bank Transfer Details */}
      {formData.paymentMethod === "bank" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900">Bank Transfer</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">
              Bank Transfer Information
            </h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p>Please transfer the total amount to:</p>
              <div className="bg-white rounded p-3 space-y-1">
                <p>
                  <strong>Bank:</strong> ComfortStay Bank
                </p>
                <p>
                  <strong>Account Name:</strong> ComfortStay Boarding House
                </p>
                <p>
                  <strong>Account Number:</strong> 1234-5678-9012-3456
                </p>
                <p>
                  <strong>Branch:</strong> Main Branch
                </p>
                <p>
                  <strong>Reference:</strong> Your full name
                </p>
              </div>
              <p className="mt-2">
                Please note: Your booking will be confirmed once we receive the
                payment. Send the payment receipt to support@comfortstay.com
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Terms and Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="termsAccepted" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-amber-600 hover:text-amber-500">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-amber-600 hover:text-amber-500">
                Privacy Policy
              </a>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-600">
                {errors.termsAccepted}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentDetails;
