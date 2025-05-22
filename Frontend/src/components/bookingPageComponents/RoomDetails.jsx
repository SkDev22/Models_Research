import { motion } from "framer-motion";

const RoomDetails = ({ onRoomSelect, selectedRoom }) => {
  const rooms = [
    {
      id: "single",
      name: "Single Room",
      price: "LKR 8,000",
      description: "Private room for one person with personal study space",
      features: [
        "Single bed with premium mattress",
        "Personal study desk and chair",
        "Built-in wardrobe",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Attached bathroom (shared between 2 rooms)"
      ]
    },
    {
      id: "double",
      name: "Double Room",
      price: "LKR 6,000",
      description: "Comfortable shared room for two with optimized space",
      features: [
        "Two single beds with premium mattresses",
        "Two study desks and chairs",
        "Built-in wardrobes",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Attached bathroom (shared between 2 rooms)"
      ]
    },
    {
      id: "shared",
      name: "Shared Room",
      price: "LKR 4,500",
      description: "Economic option for three with community living",
      features: [
        "Three single beds with comfortable mattresses",
        "Shared study area",
        "Individual lockers",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Shared bathroom facilities"
      ]
    },
    {
      id: "group",
      name: "Group Room",
      price: "LKR 4,000",
      description: "Spacious room for four or more with community spirit",
      features: [
        "Multiple single beds with comfortable mattresses",
        "Shared study area",
        "Individual lockers",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Shared bathroom facilities"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Room Types</h2>

      <div className="space-y-6">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-xl cursor-pointer transition-all ${
              selectedRoom === room.id
                ? "bg-amber-50 border-2 border-amber-500"
                : "bg-gray-50 border border-gray-200 hover:border-amber-200"
            }`}
            onClick={() => onRoomSelect(room.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <p className="text-gray-600 mt-1">{room.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-amber-600">{room.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {room.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">All rooms include:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          <li className="flex items-center">
            <span className="mr-2">🔑</span>
            24/7 secure access
          </li>
          <li className="flex items-center">
            <span className="mr-2">🧹</span>
            Weekly cleaning service
          </li>
          <li className="flex items-center">
            <span className="mr-2">💡</span>
            Utilities included
          </li>
          <li className="flex items-center">
            <span className="mr-2">🛋️</span>
            Fully furnished
          </li>
          <li className="flex items-center">
            <span className="mr-2">👥</span>
            Community events
          </li>
          <li className="flex items-center">
            <span className="mr-2">📶</span>
            High-speed internet
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default RoomDetails;
