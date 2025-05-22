import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Listings = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [viewImages, setViewImages] = useState({
    front: null,
    back: null,
    right: null,
    left: null,
    up: null,
    down: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available amenities
  const availableAmenities = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "parking", label: "Parking" },
    { id: "kitchen", label: "Kitchen" },
    { id: "ac", label: "A/C" },
  ];

  // Handle amenity selection
  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  // Handle view image upload
  const handleViewImageUpload = (view, event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setViewImages(prev => ({
      ...prev,
      [view]: file
    }));
  };

  // Format detection results for display
  const formatDetectionResults = (detectedObjects) => {
    if (!detectedObjects) return "No objects detected";
    
    const detectedItems = Object.values(detectedObjects).filter(item => typeof item === 'string');
    const uniqueItems = [...new Set(detectedItems)];
    return uniqueItems.join(", ") || "No objects detected";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Description", description);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("phoneNumber", phoneNumber);
    formData.append("roomType", roomType);
    
    amenities.forEach((amenity) => formData.append("amenities", amenity));
    
    // Append each view image
    Object.entries(viewImages).forEach(([view, file]) => {
      if (file) {
        formData.append(`viewImages[${view}]`, file);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/listings/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: 'Listing Created Successfully!',
        text: `Your listing has been created. Detected objects: ${formatDetectionResults(response.data.data.detectedObjects)}`,
        icon: 'success',
        confirmButtonText: 'View Listings'
      }).then(() => {
        navigate("/view-listings");
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      Swal.fire({
        title: 'Error',
        text: 'Error creating listing. Please try again.',
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Sidebar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-8 lg:p-12"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Create a New Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number (10 digits)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-4">
              {availableAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={amenity.id}
                    value={amenity.id}
                    checked={amenities.includes(amenity.id)}
                    onChange={handleAmenityChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={amenity.id} className="ml-2 text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Room Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Group Room">Group Room</option>
            </select>
          </div>

          {/* View Images */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              View Images (All 6 required for 360° view)
            </label>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['front', 'back', 'right', 'left', 'up', 'down'].map((view) => (
                <div key={view}>
                  <label className="block text-gray-600 mb-1 capitalize">
                    {view} View
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleViewImageUpload(view, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    accept="image/*"
                    required
                  />
                  {viewImages[view] && (
                    <p className="text-sm text-green-600 mt-1">
                      {viewImages[view].name} selected
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg transition duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Create Listing'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Listings;