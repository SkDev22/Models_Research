import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconDirections } from "@tabler/icons-react";
import { IconPointFilled } from "@tabler/icons-react";
import {
  IconMapPin,
  IconUsers,
  IconCalendar,
  IconPlayerPlay,
} from "@tabler/icons-react";

import {
  IconWifi,
  IconParkingCircle,
  IconToolsKitchen3,
  IconBathFilled,
} from "@tabler/icons-react";

import AI_search from "../AI_search";
import UserListingsView from "../../pages/UserListingsView";

const amenityIcons = {
  wifi: <IconWifi stroke={2} className="text-[10px] mt-1" />,
  parking: <IconParkingCircle stroke={2} className="text-[10px] mt-1" />,
  kitchen: <IconToolsKitchen3 stroke={2} className="text-[10px] mt-1" />,
  bathroom: <IconBathFilled stroke={2} className="text-[10px] mt-1" />,
};

const HeroSection = () => {
  // const navigate = useNavigate();
  const [listings, setListings] = useState({});
  // const [searchParams, setSearchParams] = useState({
  //   location: "",
  //   beds: "",
  //   date: "",
  // });

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   navigate("/booking-page", { state: { searchParams } });
  // };

  useEffect(() => {
    axios
      .get("http://localhost:5000/listings/")
      .then((res) => {
        // Check if res.data is an array before setting it to state
        if (Array.isArray(res.data)) {
          setListings(res.data);
          console.log("Data fetched successfully:", res.data);
        } else {
          console.error("Expected an array but got:", res.data);
          setListings([]); // Set to an empty array if data is invalid
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setListings([]); // Set to an empty array in case of an error
      });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          // src="/cOverview.jpg"
          src="/image8.jpg"
          alt="Room Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Content */}
      <div className="relative w-full mx-auto px-4 pt-25 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            We Find The Best Room For You
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find comfortable and affordable student accommodation near SLIIT
            University. Choose from our selection of well-equipped rooms
            starting from LKR 4,000/month.
          </p>

          {/* Video Button */}
          {/* <button className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 text-gray-900 hover:bg-gray-50 transition shadow-md">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
              <IconPlayerPlay size={20} className="text-gray-900 ml-0.5" />
            </div>
            <span className="font-medium">Watch Video</span>
          </button> */}
        </motion.div>

        {/* Search */}
        <AI_search />

        {/* Listings */}
        <UserListingsView />
      </div>
    </div>
  );
};

export default HeroSection;
