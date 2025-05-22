import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookingDetails from "../components/bookingFormComponents/BookingDetails";
import PaymentDetails from "../components/bookingFormComponents/PaymentDetails";
import Navbar from "../components/navbar/Navbar";

const BookingForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomType = searchParams.get("type");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    roomType: roomType || "single",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    duration: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!roomType) {
      navigate("/booking");
    }
  }, [roomType, navigate]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.checkInDate)
        newErrors.checkInDate = "Check-in date is required";
      if (!formData.duration) newErrors.duration = "Duration is required";
    } else if (step === 2) {
      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Payment method is required";
      if (formData.paymentMethod === "card") {
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
      }
      if (!formData.termsAccepted)
        newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    try {
      // Here you would typically make an API call to submit the booking
      // For now, we'll simulate a successful submission
      navigate("/thank-you");
    } catch (error) {
      setErrors({
        submit: "Failed to submit booking. Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 1 ? "bg-amber-500" : "bg-gray-300"
                } text-white font-semibold`}
              >
                1
                <motion.div
                  initial={false}
                  animate={{ scale: currentStep === 1 ? 1.2 : 1 }}
                  className="absolute inset-0 rounded-full border-2 border-amber-500"
                />
              </div>
              <div
                className={`flex-1 h-1 ${
                  currentStep > 1 ? "bg-amber-500" : "bg-gray-300"
                }`}
              />
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 2 ? "bg-amber-500" : "bg-gray-300"
                } text-white font-semibold`}
              >
                2
                <motion.div
                  initial={false}
                  animate={{ scale: currentStep === 2 ? 1.2 : 1 }}
                  className="absolute inset-0 rounded-full border-2 border-amber-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span
              className={`text-sm font-medium ${
                currentStep >= 1 ? "text-amber-600" : "text-gray-500"
              }`}
            >
              Booking Details
            </span>
            <span
              className={`text-sm font-medium ${
                currentStep >= 2 ? "text-amber-600" : "text-gray-500"
              }`}
            >
              Payment Details
            </span>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <BookingDetails
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <PaymentDetails
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />
            )}

            {errors.submit && (
              <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Previous
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type={currentStep === 2 ? "submit" : "button"}
                onClick={currentStep === 1 ? nextStep : undefined}
                className="ml-auto px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {currentStep === 2 ? "Confirm Booking" : "Next"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;

// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import BookingDetails from "../components/bookingFormComponents/BookingDetails";
// import PaymentDetails from "../components/bookingFormComponents/PaymentDetails";
// import Navbar from "../components/navbar/Navbar";

// const BookingForm = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const roomType = searchParams.get("type");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     roomType: roomType || "single",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     checkInDate: "",
//     Nic: "",
//     paymentMethod: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     termsAccepted: false,
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (!roomType) {
//       navigate("/booking");
//     }
//   }, [roomType, navigate]);

//   const validateStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!formData.firstName) newErrors.firstName = "First name is required";
//       if (!formData.lastName) newErrors.lastName = "Last name is required";
//       if (!formData.email) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Invalid email format";
//       if (!formData.phone) newErrors.phone = "Phone number is required";
//       if (!formData.checkInDate)
//         newErrors.checkInDate = "Check-in date is required";
//       if (!formData.Nic) newErrors.Nic = "NIC is required";
//     } else if (step === 2) {
//       if (!formData.paymentMethod)
//         newErrors.paymentMethod = "Payment method is required";
//       if (formData.paymentMethod === "card") {
//         if (!formData.cardNumber)
//           newErrors.cardNumber = "Card number is required";
//         if (!formData.expiryDate)
//           newErrors.expiryDate = "Expiry date is required";
//         if (!formData.cvv) newErrors.cvv = "CVV is required";
//       }
//       if (!formData.termsAccepted)
//         newErrors.termsAccepted = "You must accept the terms and conditions";
//     }

//     return newErrors;
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: undefined,
//       }));
//     }
//   };

//   const nextStep = () => {
//     const stepErrors = validateStep(currentStep);
//     if (Object.keys(stepErrors).length > 0) {
//       console.log("Validation errors:", stepErrors); // Debugging
//       setErrors(stepErrors);
//       return;
//     }
//     setCurrentStep((prev) => Math.min(prev + 1, 2));
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const stepErrors = validateStep(currentStep);
//     if (Object.keys(stepErrors).length > 0) {
//       setErrors(stepErrors);
//       return;
//     }

//     try {
//       // Here you would typically make an API call to submit the booking
//       // For now, we'll simulate a successful submission
//       navigate("/thank-you");
//     } catch (error) {
//       setErrors({
//         submit: "Failed to submit booking. Please try again.",
//       });
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
//         <Navbar />
//       </div>

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
//         {/* Stepper */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="w-full flex items-center">
//               <div
//                 className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
//                   currentStep >= 1 ? "bg-amber-500" : "bg-gray-300"
//                 } text-white font-semibold`}
//               >
//                 1
//                 <motion.div
//                   initial={false}
//                   animate={{ scale: currentStep === 1 ? 1.2 : 1 }}
//                   className="absolute inset-0 rounded-full border-2 border-amber-500"
//                 />
//               </div>
//               <div
//                 className={`flex-1 h-1 ${
//                   currentStep > 1 ? "bg-amber-500" : "bg-gray-300"
//                 }`}
//               />
//               <div
//                 className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
//                   currentStep >= 2 ? "bg-amber-500" : "bg-gray-300"
//                 } text-white font-semibold`}
//               >
//                 2
//                 <motion.div
//                   initial={false}
//                   animate={{ scale: currentStep === 2 ? 1.2 : 1 }}
//                   className="absolute inset-0 rounded-full border-2 border-amber-500"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between mt-2">
//             <span
//               className={`text-sm font-medium ${
//                 currentStep >= 1 ? "text-amber-600" : "text-gray-500"
//               }`}
//             >
//               Booking Details
//             </span>
//             <span
//               className={`text-sm font-medium ${
//                 currentStep >= 2 ? "text-amber-600" : "text-gray-500"
//               }`}
//             >
//               Payment Details
//             </span>
//           </div>
//         </div>

//         {/* Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm p-6"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {currentStep === 1 && (
//               <BookingDetails
//                 formData={formData}
//                 onInputChange={handleInputChange}
//                 errors={errors}
//               />
//             )}

//             {currentStep === 2 && (
//               <PaymentDetails
//                 formData={formData}
//                 onInputChange={handleInputChange}
//                 errors={errors}
//               />
//             )}

//             {errors.submit && (
//               <div className="text-red-600 text-sm mt-2">{errors.submit}</div>
//             )}

//             <div className="flex justify-between pt-6">
//               {currentStep > 1 && (
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="button"
//                   onClick={prevStep}
//                   className="px-6 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
//                 >
//                   Previous
//                 </motion.button>
//               )}

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type={currentStep === 2 ? "submit" : "button"}
//                 onClick={currentStep === 1 ? nextStep : undefined}
//                 className="ml-auto px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
//               >
//                 {currentStep === 2 ? "Confirm Booking" : "Next"}
//               </motion.button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
