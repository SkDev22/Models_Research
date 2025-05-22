import { motion } from "framer-motion";

const BookingDetails = ({ formData, onInputChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  // const roomTypes = [
  //   {
  //     id: "single",
  //     name: "Single Room",
  //     price: "LKR 8,000",
  //     description: "Private room for one person",
  //     amenities: [
  //       "Individual privacy",
  //       "Single bed",
  //       "Study desk",
  //       "Personal wardrobe",
  //       "Air conditioning",
  //       "WiFi access",
  //       "Attached bathroom",
  //     ],
  //     features: [
  //       "24/7 security",
  //       "Weekly cleaning",
  //       "Basic utilities included",
  //       "Quiet environment",
  //     ],
  //   },
  //   {
  //     id: "double",
  //     name: "Double Room",
  //     price: "LKR 6,000",
  //     description: "Shared room for two people",
  //     amenities: [
  //       "Balanced cost and privacy",
  //       "Two single beds",
  //       "Shared study area",
  //       "Individual wardrobes",
  //       "Air conditioning",
  //       "WiFi access",
  //       "Shared bathroom",
  //     ],
  //     features: [
  //       "24/7 security",
  //       "Weekly cleaning",
  //       "Basic utilities included",
  //       "Social atmosphere",
  //     ],
  //   },
  //   {
  //     id: "shared",
  //     name: "Shared Room",
  //     price: "LKR 4,500",
  //     description: "Shared room for three people",
  //     amenities: [
  //       "Economical option",
  //       "Three single beds",
  //       "Shared study space",
  //       "Individual lockers",
  //       "Air conditioning",
  //       "WiFi access",
  //       "Shared bathroom",
  //     ],
  //     features: [
  //       "24/7 security",
  //       "Weekly cleaning",
  //       "Basic utilities included",
  //       "Community living",
  //     ],
  //   },
  //   {
  //     id: "group",
  //     name: "Group Room",
  //     price: "LKR 4,000",
  //     description: "Large room for four or more",
  //     amenities: [
  //       "Most economical option",
  //       "Multiple bunk beds",
  //       "Common study area",
  //       "Individual lockers",
  //       "Air conditioning",
  //       "WiFi access",
  //       "Shared bathroom",
  //     ],
  //     features: [
  //       "24/7 security",
  //       "Weekly cleaning",
  //       "Basic utilities included",
  //       "Social environment",
  //     ],
  //   },
  // ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>

      {/* Room Type Selection */}
      <div className="space-y-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.firstName ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.lastName ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.email ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="checkInDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-in Date
            </label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.checkInDate ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            />
            {errors.checkInDate && (
              <p className="mt-1 text-sm text-red-600">{errors.checkInDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.duration ? "border-red-300" : "border-gray-300"
              } focus:border-amber-500 focus:ring-amber-500`}
            >
              <option value="">Select duration</option>
              <option value="1">1 month</option>
              <option value="3">3 months (5% discount)</option>
              <option value="6">6 months (10% discount)</option>
              <option value="12">12 months (15% discount)</option>
            </select>
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-medium text-amber-900 mb-2">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start">
              <span className="mr-2">📝</span>
              All rooms include basic utilities (electricity, water) and WiFi
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔑</span>
              Security deposit equal to one month's rent is required
            </li>
            <li className="flex items-start">
              <span className="mr-2">🧹</span>
              Weekly cleaning service included
            </li>
            <li className="flex items-start">
              <span className="mr-2">👥</span>
              24/7 security and support available
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingDetails;
