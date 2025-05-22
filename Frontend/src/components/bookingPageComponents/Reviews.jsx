import { motion } from "framer-motion";
import { useState } from "react";

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const reviews = [
    {
      id: 1,
      name: "Gihan Kumara",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      roomType: "single",
      date: "February 2025",
      comment: "The single room exceeded my expectations. Perfect for focused studying and the community is great!",
      highlights: ["Clean environment", "Helpful staff", "Great location"]
    },
    {
      id: 2,
      name: "Mandira wanshathilake",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      roomType: "double",
      date: "January 2025",
      comment: "Found a great roommate and the facilities are well-maintained. The study room is a huge plus!",
      highlights: ["Good roommates", "Study facilities", "Modern amenities"]
    },
    {
      id: 3,
      name: "Nandun Wijerathne",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      roomType: "shared",
      date: "March 2025",
      comment: "Affordable and comfortable. The shared room is spacious and the community events are fun.",
      highlights: ["Affordable", "Community events", "Spacious rooms"]
    },
    {
      id: 4,
      name: "Gimpani Wijerathne",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      roomType: "group",
      date: "January 2025",
      comment: "The group room is perfect for making friends. Love the common areas and activities.",
      highlights: ["Friendly atmosphere", "Social events", "Value for money"]
    }
  ];

  const filters = [
    { id: "all", label: "All Reviews" },
    { id: "single", label: "Single Room" },
    { id: "double", label: "Double Room" },
    { id: "shared", label: "Shared Room" },
    { id: "group", label: "Group Room" }
  ];

  const filteredReviews = selectedFilter === "all" 
    ? reviews 
    : reviews.filter(review => review.roomType === selectedFilter);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resident Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center mb-8">
        <div className="text-4xl font-bold text-amber-500 mr-4">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < Math.round(averageRating)
                    ? "text-amber-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">Based on {reviews.length} reviews</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter.id
                ? "bg-amber-500 text-white"
                : "bg-amber-50 text-amber-600 hover:bg-amber-100"
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating ? "text-amber-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full mb-4"
            />
            <p className="text-gray-600">{review.comment}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {review.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Write a Review
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Reviews;
