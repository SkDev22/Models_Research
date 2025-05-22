import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { motion } from "framer-motion";
import axios from "axios";
import {
  IconWifi,
  IconParkingCircle,
  IconToolsKitchen3,
  IconBathFilled,
  IconDirections,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const amenityIcons = {
  wifi: <IconWifi stroke={2} className="text-[10px] mt-1" />,
  parking: <IconParkingCircle stroke={2} className="text-[10px] mt-1" />,
  kitchen: <IconToolsKitchen3 stroke={2} className="text-[10px] mt-1" />,
  bathroom: <IconBathFilled stroke={2} className="text-[10px] mt-1" />,
};

const MyListings = () => {
  const [listings, setListings] = useState({});

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
    <div>
      <Sidebar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 ml-50 p-8 lg:p-12"
      >
        <h1 className="text-3xl font-bold ">MyListings</h1>
        <div className="flex flex-wrap justify-baseline gap-5">
          {Array.isArray(listings) &&
            listings.map((listing) => (
              <Link to={`/booking-page/${listing._id}`}>
                <div
                  key={listing._id} // Use listing._id instead of listing.id (MongoDB uses _id)
                  className="w-[300px] h-[320px] p-4 rounded-lg shadow-md shadow-slate-500 mt-16"
                >
                  <div>
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000/images/${listing.images[0]}`}
                        alt="Listing Image"
                        className="rounded-xl w-full h-[150px] object-cover"
                      />
                    ) : (
                      <p className="text-gray-500">No image available</p>
                    )}
                  </div>

                  {/* Render title and price */}
                  <div className="">
                    <h1 className="text-xl font-bold mt-2">{listing.title}</h1>
                  </div>

                  {/* Render location */}
                  <div className="flex justify-between items-center mt-3">
                    <h1 className="flex justify-start gap-2 items-center mt-2">
                      <IconDirections stroke={2} className="text-red-700" />
                      {listing.location}
                    </h1>
                    <h1 className=" text-right">
                      <span className="text-red-700 font-semibold">
                        Rs.{listing.price}
                      </span>{" "}
                      month
                    </h1>
                  </div>
                  <ul>
                    <p className="flex justify-baseline items-center gap-3 flex-wrap">
                      {listing.amenities.map((amenity, index) => (
                        <li
                          key={index}
                          className="flex justify-start gap-2 items-center mt-2"
                        >
                          {amenityIcons[amenity] || (
                            <IconPointFilled
                              stroke={2}
                              className="text-[10px] mt-1"
                            />
                          )}
                          {amenity}
                        </li>
                      ))}
                    </p>
                  </ul>
                </div>
              </Link>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyListings;
