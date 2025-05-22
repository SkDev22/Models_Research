import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomView360 from "./RoomView360";

const BookingCard = ({ selectedRoom }) => {
  const navigate = useNavigate();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [show360View, setShow360View] = useState(false);

  const roomPrices = {
    single: { monthly: 8000, lastMonth: 7500, nextMonth: 8500 },
    double: { monthly: 6000, lastMonth: 5500, nextMonth: 6500 },
    shared: { monthly: 4500, lastMonth: 4000, nextMonth: 5000 },
    group: { monthly: 4000, lastMonth: 3500, nextMonth: 4500 }
  };

  const selectedPrice = roomPrices[selectedRoom];

  const handleBookNow = () => {
    navigate(`/booking-form?type=${selectedRoom}`);
  };

  const handle360View = () => {
    setShow360View(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (amount) => {
    return amount ? `LKR ${amount.toLocaleString()}` : 'LKR 0';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="space-y-6">
          {/* Price Display */}
          <div className="text-center pb-4 border-b">
            <div className="mb-4">
              <div className="flex justify-center items-baseline">
                <span className="text-5xl font-bold text-amber-500">{formatPrice(selectedPrice?.monthly)}</span>
                <span className="text-gray-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">All inclusive price</p>
            </div>
            
            {/* Price Trend */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="text-left">
                <p className="text-gray-500 text-sm">Last Month</p>
                <div className="flex items-center mt-1">
                  <p className={`text-lg font-semibold ${selectedPrice?.lastMonth < selectedPrice?.monthly ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPrice(selectedPrice?.lastMonth)}
                  </p>
                  <svg
                    className={`w-4 h-4 ml-1 ${selectedPrice?.lastMonth < selectedPrice?.monthly ? 'text-green-600' : 'text-red-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={selectedPrice?.lastMonth < selectedPrice?.monthly ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Next Month</p>
                <div className="flex items-center justify-end mt-1">
                  <p className={`text-lg font-semibold ${selectedPrice?.nextMonth > selectedPrice?.monthly ? 'text-red-600' : 'text-green-600'}`}>
                    {formatPrice(selectedPrice?.nextMonth)}
                  </p>
                  <svg
                    className={`w-4 h-4 ml-1 ${selectedPrice?.nextMonth > selectedPrice?.monthly ? 'text-red-600' : 'text-green-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={selectedPrice?.nextMonth > selectedPrice?.monthly ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-baseline">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            >
              {showPriceBreakdown ? "Hide details" : "See details"}
            </motion.button>
          </div>

          <motion.div
            initial={false}
            animate={{ height: showPriceBreakdown ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Monthly rent</span>
                <span>{formatPrice(selectedPrice?.monthly)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Security deposit</span>
                <span>{formatPrice(selectedPrice?.monthly)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Utilities</span>
                <span>Included</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-medium text-gray-900">
                  <span>Initial payment</span>
                  <span>{formatPrice(selectedPrice?.monthly * 2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Includes first month's rent and security deposit
                </p>
              </div>
            </div>
          </motion.div>

          {/* Book Now Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookNow}
            className="w-full bg-amber-500 text-white py-4 px-4 rounded-lg font-medium hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-lg"
          >
            Book Now
          </motion.button>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleFavorite}
              className={`flex items-center justify-center py-3 px-4 rounded-lg font-medium border ${
                isFavorite 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg
                className={`w-5 h-5 mr-2 ${isFavorite ? 'text-red-600' : 'text-gray-500'}`}
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {isFavorite ? 'Saved' : 'Save'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handle360View}
              className="flex items-center justify-center py-3 px-4 rounded-lg font-medium border bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              360° View
            </motion.button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>No payment charged yet</p>
          </div>

          {/* Room Features */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic utilities (electricity, water)
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                WiFi access
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weekly cleaning service
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 security
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {show360View && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">360° Room View</h3>
              <button
                onClick={() => setShow360View(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <RoomView360 roomType={selectedRoom} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
