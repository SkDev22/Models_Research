import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiRotateCw } from "react-icons/fi";

const EditListing = () => {
  const { id } = useParams();
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
  const [listing, setListing] = useState(null);
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
  const [existingImages, setExistingImages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Available amenities
  const availableAmenities = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "parking", label: "Parking" },
    { id: "kitchen", label: "Kitchen" },
    { id: "ac", label: "A/C" },
  ];

  // Fetch listing data on component mount
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/listings/${id}`);
        setListing(response.data);
        setTitle(response.data.title);
        setDescription(response.data.Description);
        setLocation(response.data.location);
        setPrice(response.data.price);
        setPhoneNumber(response.data.phoneNumber)
        setRoomType(response.data.roomType);
        setAmenities(response.data.amenities);
        setExistingImages(response.data.viewImages || {});
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listing:", err);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load listing data',
          icon: 'error'
        }).then(() => {
          navigate('/view-listings');
        });
      }
    };

    fetchListing();
  }, [id, navigate]);

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
    return detectedObjects.join(", ") || "No objects detected";
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
    
    // Append each view image if it's a new file
    Object.entries(viewImages).forEach(([view, file]) => {
      if (file) {
        formData.append(`viewImages[${view}]`, file);
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/listings/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: 'Listing Updated Successfully!',
        text: `Your listing has been updated.`,
        icon: 'success',
        confirmButtonText: 'View Listings'
      }).then(() => {
        navigate("/view-listings");
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      Swal.fire({
        title: 'Error',
        text: 'Error updating listing. Please try again.',
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiRotateCw className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

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
          Edit Listing
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
              View Images (Upload new images to replace existing ones)
            </label>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['front', 'back', 'right', 'left', 'up', 'down'].map((view) => (
                <div key={view}>
                  <label className="block text-gray-600 mb-1 capitalize">
                    {view} View
                  </label>
                  {existingImages[view] ? (
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Current image:</p>
                      <img 
                        src={`http://localhost:5000/uploads/${existingImages[view]}`} 
                        alt={`${view} view`}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mb-2">No image uploaded</p>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleViewImageUpload(view, e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    accept="image/*"
                  />
                  {viewImages[view] && (
                    <p className="text-sm text-green-600 mt-1">
                      {viewImages[view].name} selected (will replace current image)
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detected Objects */}
          {listing.detectedObjects?.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Detected Objects:</h3>
              <div className="flex flex-wrap gap-2">
                {listing.detectedObjects.map((obj, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {obj}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: Updating images will re-run object detection
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/view-listings')}
              className="py-3 px-6 rounded-lg transition duration-300 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-3 px-6 rounded-lg transition duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Listing'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditListing;