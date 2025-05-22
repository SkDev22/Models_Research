import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import RoomDetails from "../components/bookingPageComponents/RoomDetails";
import Amenities from "../components/bookingPageComponents/Amenities";
import BookingCard from "../components/bookingPageComponents/BookingCard";
import Reviews from "../components/bookingPageComponents/Reviews";
import Location from "../components/bookingPageComponents/Location";
import HouseRules from "../components/bookingPageComponents/HouseRules";
import FAQ from "../components/bookingPageComponents/FAQ";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { IconMapPinFilled } from "@tabler/icons-react";
import {
  IconWifi,
  IconParkingCircle,
  IconToolsKitchen3,
  IconBathFilled,
} from "@tabler/icons-react";

const BookingPage = () => {
  const [selectedRoom, setSelectedRoom] = useState("single");
  const [selectedImage, setSelectedImage] = useState(0);

  //

  const navigate = useNavigate();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [show360View, setShow360View] = useState(false);

  const roomPrices = {
    single: { monthly: 8000, lastMonth: 7500, nextMonth: 8500 },
    double: { monthly: 6000, lastMonth: 5500, nextMonth: 6500 },
    shared: { monthly: 4500, lastMonth: 4000, nextMonth: 5000 },
    group: { monthly: 4000, lastMonth: 3500, nextMonth: 4500 },
  };

  const selectedPrice = roomPrices[selectedRoom];

  const handleBookNow = () => {
    navigate(`/booking`);
  };

  // const handle360View = () => {
  //   setShow360View(true);
  // };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (amount) => {
    return amount ? `LKR ${amount.toLocaleString()}` : "LKR 0";
  };

  const amenityIcons = {
    wifi: <IconWifi stroke={2} className="text-[10px] mt-1" />,
    parking: <IconParkingCircle stroke={2} className="text-[10px] mt-1" />,
    kitchen: <IconToolsKitchen3 stroke={2} className="text-[10px] mt-1" />,
    bathroom: <IconBathFilled stroke={2} className="text-[10px] mt-1" />,
  };

  //

  const { id } = useParams();
  const [boarding, setBoarding] = useState(null);

  const getSingleBoarding = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/listings/${id}`);
      setBoarding(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching boarding details:", error);
    }
  };

  useEffect(() => {
    getSingleBoarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!boarding) {
    return <p>Loading...</p>;
  }

  if (!boarding.images || !Array.isArray(boarding.images)) {
    return (
      <p className="text-red-500">No images available for this listing.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">{boarding.title}</h1>
          <p className="text-gray-600 mt-2">
            Premium accommodation for students and professionals
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <motion.div
                className="relative aspect-[16/9] overflow-hidden rounded-2xl"
                layoutId="main-image"
              >
                <img
                  src={`http://localhost:5000/images/${boarding.images[selectedImage]}`}
                  alt="Main Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-4">
                {boarding.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-200"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/images/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <div className="flex justify-startr items-center gap-3 text-xl">
              <IconMapPinFilled className="text-red-700" />
              {boarding.location}
            </div>
            <div className="">
              <h1 className="text-xl font-bold mb-3">Amenities</h1>
              <p className="flex justify-start items-center gap-8">
                {boarding.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex justify-start gap-2 items-center mt-2 text-amber-500"
                  >
                    {amenityIcons[amenity] || (
                      <IconMapPinFilled
                        stroke={2}
                        className="text-[10px] mt-1"
                      />
                    )}
                    {amenity}
                  </li>
                ))}
              </p>
            </div>
            <div className="text-justify">
              <h1 className="text-2xl font-bold mb-3">Description</h1>
              {boarding.Description}
            </div>

            {/* Other Components */}
            {/* <RoomDetails
              onRoomSelect={setSelectedRoom}
              selectedRoom={selectedRoom}
            /> */}
            {/* <Amenities /> */}
            <HouseRules />
            <Reviews />
            {/* <FAQ /> */}
            {/* <Location /> */}
          </div>

          {/* Right Column - Booking Card */}
          {/* <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard selectedRoom={selectedRoom} />
            </div>
          </div> */}

          {/*  */}
          {/* Right Column - Booking Card */}
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
                    <span className="text-5xl font-bold text-amber-500">
                      {formatPrice(boarding.price)} {/* Format the price */}
                    </span>
                    <span className="text-gray-500 ml-2 text-lg">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    All inclusive price
                  </p>
                </div>

                {/* Price Trend */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="text-left">
                    <p className="text-gray-500 text-sm">Last Month</p>
                    <div className="flex items-center mt-1">
                      <p
                        className={`text-lg font-semibold ${
                          selectedPrice?.lastMonth < selectedPrice?.monthly
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatPrice(selectedPrice?.lastMonth)}{" "}
                        {/* Format the price */}
                      </p>
                      <svg
                        className={`w-4 h-4 ml-1 ${
                          selectedPrice?.lastMonth < selectedPrice?.monthly
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            selectedPrice?.lastMonth < selectedPrice?.monthly
                              ? "M5 15l7-7 7 7"
                              : "M19 9l-7 7-7-7"
                          }
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Next Month</p>
                    <div className="flex items-center justify-end mt-1">
                      <p
                        className={`text-lg font-semibold ${
                          selectedPrice?.nextMonth > selectedPrice?.monthly
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formatPrice(selectedPrice?.nextMonth)}{" "}
                        {/* Format the price */}
                      </p>
                      <svg
                        className={`w-4 h-4 ml-1 ${
                          selectedPrice?.nextMonth > selectedPrice?.monthly
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            selectedPrice?.nextMonth > selectedPrice?.monthly
                              ? "M19 9l-7 7-7-7"
                              : "M5 15l7-7 7 7"
                          }
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
                    <span>{formatPrice(selectedPrice?.monthly)}</span>{" "}
                    {/* Format the price */}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Security deposit</span>
                    <span>{formatPrice(selectedPrice?.monthly)}</span>{" "}
                    {/* Format the price */}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Utilities</span>
                    <span>Included</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>Initial payment</span>
                      <span>
                        {formatPrice(selectedPrice?.monthly * 2)}
                      </span>{" "}
                      {/* Format the price */}
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
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 mr-2 ${
                      isFavorite ? "text-red-600" : "text-gray-500"
                    }`}
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
                  {isFavorite ? "Saved" : "Save"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // onClick={handle360View}
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
                <h4 className="font-medium text-gray-900 mb-2">
                  What's included:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
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
                    Basic utilities (electricity, water)
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
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
                    WiFi access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
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
                    Weekly cleaning service
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
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
                    24/7 security
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/*  */}
        </div>
      </main>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default BookingPage;
