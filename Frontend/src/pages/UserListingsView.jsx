import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiArrowLeft,
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiLayers,
  FiEye,
  FiSearch,
  FiCalendar,
} from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Navigate } from "react-router-dom";
// import Sidebar from "../components/sidebar/Sidebar";

const UserListingsView = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isPanoramaOpen, setIsPanoramaOpen] = useState(false);
  const panoramaRef = useRef(null);
  const viewerRef = useRef(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [datePostedFilter, setDatePostedFilter] = useState("anytime");
  const [showFilters, setShowFilters] = useState(false);

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
        setFilteredListings(response.data);
        setLoading(false);

        // Calculate max price for price range slider
        const maxListingPrice = Math.max(
          ...response.data.map((listing) => parseFloat(listing.price) || 0),
          10000
        );
        setPriceRange([0, maxListingPrice]);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const filtered = listings.filter((listing) => {
      // Search query filter (title and description)
      const matchesSearch =
        searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (listing.Description &&
          listing.Description.toLowerCase().includes(
            searchQuery.toLowerCase()
          ));

      // Location filter
      const matchesLocation =
        locationFilter === "" ||
        listing.location.toLowerCase().includes(locationFilter.toLowerCase());

      // Room type filter
      const matchesRoomType =
        roomTypeFilter === "" || listing.roomType === roomTypeFilter;

      // Price range filter
      const listingPrice = parseFloat(listing.price) || 0;
      const matchesPrice =
        listingPrice >= priceRange[0] && listingPrice <= priceRange[1];

      // Date posted filter
      const listingDate = new Date(listing.createdAt);
      const currentDate = new Date();
      const daysDifference = Math.floor(
        (currentDate - listingDate) / (1000 * 60 * 60 * 24)
      );

      let matchesDate = true;
      if (datePostedFilter === "today") {
        matchesDate = daysDifference <= 1;
      } else if (datePostedFilter === "thisweek") {
        matchesDate = daysDifference <= 7;
      } else if (datePostedFilter === "thismonth") {
        matchesDate = daysDifference <= 30;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesRoomType &&
        matchesPrice &&
        matchesDate
      );
    });

    setFilteredListings(filtered);
  }, [
    listings,
    searchQuery,
    locationFilter,
    roomTypeFilter,
    priceRange,
    datePostedFilter,
  ]);

  // Get unique room types for filter dropdown
  const roomTypes = [
    ...new Set(listings.map((listing) => listing.roomType)),
  ].filter(Boolean);
  // Get unique locations for filter dropdown
  const locations = [
    ...new Set(listings.map((listing) => listing.location)),
  ].filter(Boolean);

  const handlePriceRangeChange = (e, index) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setRoomTypeFilter("");
    const maxListingPrice = Math.max(
      ...listings.map((listing) => parseFloat(listing.price) || 0),
      10000
    );
    setPriceRange([0, maxListingPrice]);
    setDatePostedFilter("anytime");
  };

  const handleListingSelect = (listing) => {
    setSelectedListing(listing);
    setActiveImage(0);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedListing(null);
  };

  const handleNextImage = () => {
    const images = Object.values(selectedListing.viewImages || {});
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    const images = Object.values(selectedListing.viewImages || {});
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleViewPanorama = () => {
    if (!selectedListing.panoramaImage) return;
    setIsPanoramaOpen(true);
  };

  const closePanorama = () => {
    setIsPanoramaOpen(false);
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPanoramaOpen && selectedListing?.panoramaImage) {
      const loadPanolens = async () => {
        try {
          // Load Three.js if not already loaded
          if (!window.THREE) {
            await loadScript(
              "https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.min.js"
            );
          }
          // Load PANOLENS if not already loaded
          if (!window.PANOLENS) {
            await loadScript(
              "https://cdn.jsdelivr.net/npm/panolens@0.11.0/build/panolens.min.js"
            );
          }

          const panorama = new window.PANOLENS.ImagePanorama(
            `http://localhost:5000/uploads/${selectedListing.panoramaImage}`
          );

          viewerRef.current = new window.PANOLENS.Viewer({
            container: panoramaRef.current,
            autoRotate: true,
            autoRotateSpeed: 0.3,
            controlBar: true,
          });

          viewerRef.current.add(panorama);
        } catch (err) {
          console.error("Error loading panorama:", err);
        }
      };

      loadPanolens();
    }
  }, [isPanoramaOpen, selectedListing]);

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">Error loading listings: {error}</div>
    );
  }

  // Detailed view for a single listing
  if (selectedListing) {
    const images = Object.values(selectedListing.viewImages || {});
    const imageKeys = Object.keys(selectedListing.viewImages || {});

    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Back button */}
        <button
          onClick={handleBackToList}
          className="fixed top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FiArrowLeft className="text-gray-700" size={20} />
        </button>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Image gallery */}
          <div className="relative bg-gray-200 rounded-xl shadow-inner overflow-hidden mb-8 border border-gray-300">
            {images.length > 0 ? (
              <>
                <img
                  src={`http://localhost:5000/uploads/${images[activeImage]}`}
                  alt={`${imageKeys[activeImage]} view`}
                  className="w-full max-h-[500px] object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
                {selectedListing.panoramaImage && (
                  <button
                    onClick={handleViewPanorama}
                    className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
                  >
                    <FiEye className="mr-2" /> 360° View
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>

          {/* Thumbnail gallery */}
          {images.length > 1 && (
            <div className="flex space-x-2 mb-8 overflow-x-auto py-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                    activeImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={`http://localhost:5000/uploads/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Property details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedListing.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FiMapPin className="mr-2" />
                  <span>{selectedListing.location}</span>
                </div>

                <p className="text-gray-700 mb-6">
                  {selectedListing.Description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* <div className="flex items-center">
                    <FaBed className="text-blue-500 mr-2" size={20} />
                    <div>
                      <p className="text-gray-500 text-sm">Bedrooms</p>
                      <p className="font-semibold">{selectedListing.bedrooms || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-blue-500 mr-2" size={20} />
                    <div>
                      <p className="text-gray-500 text-sm">Bathrooms</p>
                      <p className="font-semibold">{selectedListing.bathrooms || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-blue-500 mr-2" size={20} />
                    <div>
                      <p className="text-gray-500 text-sm">Area</p>
                      <p className="font-semibold">{selectedListing.area ? `${selectedListing.area} sqft` : 'N/A'}</p>
                    </div>
                  </div> */}
                  <div className="flex items-center">
                    <FiHome className="text-blue-500 mr-2" size={20} />
                    <div>
                      <p className="text-gray-500 text-sm">Type</p>
                      <p className="font-semibold">
                        {selectedListing.roomType || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {selectedListing.amenities?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Amenities
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedListing.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Objects */}
                {selectedListing.detectedObjects?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Included Items
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedListing.detectedObjects.map((item, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price and contact */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    <span className="inline mr-1">Rs.</span>
                    {selectedListing.price}
                    <span className="text-lg font-normal text-gray-600">
                      /month
                    </span>
                  </h3>
                  {selectedListing.available && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  )}
                </div>

                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiPhone className="mr-3 text-blue-500" />
                    <span className="font-medium">
                      {selectedListing.phoneNumber}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Call or message the landlord directly
                  </p>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-4">
                  Contact Landlord
                </button>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiLayers className="mr-3 text-blue-500" />
                    <span>
                      Posted:{" "}
                      {new Date(selectedListing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiHome className="mr-3 text-blue-500" />
                    <span>
                      Property ID: {selectedListing._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 360° Panorama Viewer Modal */}
        <AnimatePresence>
          {isPanoramaOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            >
              <button
                onClick={closePanorama}
                className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
              >
                <MdClose size={24} />
              </button>
              <div ref={panoramaRef} className="w-full h-full max-w-6xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Grid view of all listings
  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* <Sidebar /> */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Properties
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 w-full bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-[#22223b] text-white rounded-lg hover:bg-[#22223b] transition"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={roomTypeFilter}
                    onChange={(e) => setRoomTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {roomTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={Math.max(priceRange[1], 10000)}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Date Posted Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Posted
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={datePostedFilter}
                    onChange={(e) => setDatePostedFilter(e.target.value)}
                  >
                    <option value="anytime">Anytime</option>
                    <option value="today">Today</option>
                    <option value="thisweek">This Week</option>
                    <option value="thismonth">This Month</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              No properties match your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredListings.map((listing) => (
              <motion.div
                key={listing._id}
                variants={itemVariants}
                onClick={() => handleListingSelect(listing)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  {listing.viewImages?.front ? (
                    <img
                      src={`http://localhost:5000/uploads/${listing.viewImages.front}`}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h2 className="text-white font-bold text-xl">
                      {listing.title}
                    </h2>
                    <p className="text-white/90">{listing.location}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-600 font-bold text-xl">
                      Rs.{listing.price}
                      <span className="text-gray-500 text-sm font-normal">
                        /mo
                      </span>
                    </span>
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {listing.roomType}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600 text-sm mb-3">
                    <span className="flex items-center">
                      <FaBed className="mr-1" /> {listing.bedrooms || "N/A"}{" "}
                      beds
                    </span>
                    <span className="flex items-center">
                      <FaBath className="mr-1" /> {listing.bathrooms || "N/A"}{" "}
                      baths
                    </span>
                    <span className="flex items-center">
                      <FaRulerCombined className="mr-1" />{" "}
                      {listing.area ? `${listing.area} sqft` : "N/A"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {listing.Description}
                  </p>

                  {listing.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {listing.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          +{listing.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserListingsView;
