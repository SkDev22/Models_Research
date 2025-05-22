import { motion } from "framer-motion";

const Location = () => {
  const nearbyPlaces = [
    {
      category: "Transportation",
      items: [
        "Kaduwela Bus Stop - 2 min walk",
        "Train Station - 10 min walk",
        "Kollupitiya - 45 min Bus ride"
      ]
    },
    {
      category: "Education",
      items: [
        "SLIIT University - 5 min walk",
        "Kaduwela Public Library - 10 min walk",
        "Malambe Town - 10 min walk"
      ]
    },
    {
      category: "Amenities",
      items: [
        "Food City Supermarket - 3 min walk",
        "Awanya Hotel - 2 min walk",
        "SLIIT Gym - 5 min walk"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>

      {/* Map Container */}
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden border-2 border-amber-100">
        <iframe
          title="location map"
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Address Section */}
      <div className="mb-8 p-4 bg-amber-50 rounded-lg">
        <h3 className="text-lg font-medium text-amber-800 mb-2">Address</h3>
        <p className="text-amber-700">
          123 Jaya Mawatha,<br />
          Pittugala,<br />
          Kaduwela,<br />
          Sri Lanka.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Get Directions
        </motion.button>
      </div>

      {/* Nearby Places */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Nearby Places</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nearbyPlaces.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-amber-50 rounded-lg p-4"
            >
              <h4 className="text-amber-800 font-medium mb-3">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-amber-700 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg">
        <h3 className="text-lg font-medium text-amber-800 mb-2">Need Help?</h3>
        <p className="text-amber-700 mb-4">
          Our support team is available 24/7 to assist you with directions or any other queries.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Contact Support
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Location;
