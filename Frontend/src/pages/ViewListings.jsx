import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiRotateCw } from "react-icons/fi";
import Sidebar from "../components/sidebar/Sidebar";

const ViewListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPanorama, setSelectedPanorama] = useState(null);
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);
  const panoramaRef = useRef(null);
  const viewerRef = useRef(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/listings");
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (selectedPanorama && !isViewerLoaded) {
      const loadPanolens = async () => {
        try {
          // Load Three.js
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.min.js"
          );
          // Load PANOLENS
          await loadScript(
            "https://cdn.jsdelivr.net/npm/panolens@0.11.0/build/panolens.min.js"
          );
          setIsViewerLoaded(true);
        } catch (err) {
          console.error("Error loading panorama scripts:", err);
        }
      };

      loadPanolens();
    }
  }, [selectedPanorama, isViewerLoaded]);

  useEffect(() => {
    if (selectedPanorama && isViewerLoaded) {
      initializeViewer();
    }
  }, [selectedPanorama, isViewerLoaded]);

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const initializeViewer = () => {
    if (viewerRef.current) {
      viewerRef.current.dispose();
    }

    const panorama = new window.PANOLENS.ImagePanorama(selectedPanorama);
    viewerRef.current = new window.PANOLENS.Viewer({
      container: panoramaRef.current,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      controlBar: true,
      controlButtons: ["fullscreen", "zoom", "video"],
    });
    viewerRef.current.add(panorama);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`http://localhost:5000/listings/${id}`);
        setListings(listings.filter((listing) => listing._id !== id));
      } catch (err) {
        console.error("Error deleting listing:", err);
      }
    }
  };

  const handleViewPanorama = (panoramaImage) => {
    setSelectedPanorama(`http://localhost:5000/uploads/${panoramaImage}`);
  };

  const closePanorama = () => {
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }
    setSelectedPanorama(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiRotateCw className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">Error loading listings: {error}</div>
    );
  }

  return (
    <div className="p-6 md:p-10 ml-50">
      <Sidebar />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Listings</h1>
        <button
          onClick={() => navigate("/listings")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create New Listing
        </button>
      </div>

      {selectedPanorama && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full max-w-6xl max-h-screen">
            <button
              onClick={closePanorama}
              className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
            >
              &times;
            </button>
            <div ref={panoramaRef} className="w-full h-full" />
          </div>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {listings.map((listing) => (
          <motion.div
            key={listing._id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden relative">
              {listing.viewImages?.front && (
                <img
                  src={`http://localhost:5000/uploads/${listing.viewImages.front}`}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white font-bold text-xl">
                  {listing.title}
                </h2>
                <p className="text-white/90">{listing.location}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ${listing.price}/mo
                </span>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {listing.roomType}
                </span>
              </div>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {listing.Description}
              </p>

              {/* Detected Objects */}
              {listing.detectedObjects?.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Household Items:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.detectedObjects.map((obj, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Amenities:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-3 border-t">
                <button
                  onClick={() => navigate(`/edit-listing/${listing._id}`)}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <FiEdit2 className="mr-1" /> Edit
                </button>

                <div className="flex space-x-3">
                  {listing.panoramaImage && (
                    <button
                      onClick={() => handleViewPanorama(listing.panoramaImage)}
                      className="flex items-center text-purple-600 hover:text-purple-800 text-sm"
                    >
                      <FiEye className="mr-1" /> 360° View
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 flex space-x-2 overflow-x-auto">
              {Object.entries(listing.viewImages || {}).map(
                ([view, filename]) => (
                  <div
                    key={view}
                    className="flex-shrink-0 w-16 h-16 rounded overflow-hidden border border-gray-200"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${filename}`}
                      alt={`${view} view`}
                      className="w-full h-full object-cover"
                      title={view}
                    />
                  </div>
                )
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {listings.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No listings found. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewListings;
