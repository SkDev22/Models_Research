import React, { useState, useRef, useEffect } from "react";
// You will need to install @react-google-maps/api: npm install @react-google-maps/api
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import Sidebar from "./sidebar/Sidebar";

const GOOGLE_MAPS_API_KEY = "AIzaSyCOOorcOanGjPkvqsrakNZRslSswhZ-7Ys";
const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "320px",
  borderRadius: "10px",
  overflow: "hidden",
};

const initialCenter = { lat: 7.8731, lng: 80.7718 }; // Sri Lanka center

function DynamicPricingApp() {
  // Form state
  const [form, setForm] = useState({
    boarding_house_name: "",
    owner_mobile: "",
    room_type: "",
    num_sharing: 1,
    university: "",
    distance_to_transport: "",
    safety_score: "",
    amenities: {
      has_wifi: false,
      has_attached_bathroom: false,
      has_ac: false,
      has_kitchen: false,
      has_laundry: false,
      has_parking: false,
      meals_provided: false,
      has_study_table: false,
      has_cupboard: false,
    },
    overall_rating: "",
    num_reviews: "",
    landlord_response_time: "",
    value_rating: "",
  });
  // Map/Location state
  const [bhLatLng, setBhLatLng] = useState(null);
  const [uniLatLng, setUniLatLng] = useState(null);
  const [distance, setDistance] = useState("");
  const [directions, setDirections] = useState(null);
  const [locationCoords, setLocationCoords] = useState("");
  const [locationAccuracy, setLocationAccuracy] = useState("");
  const [recommendedRange, setRecommendedRange] = useState(null);
  const [results, setResults] = useState(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // University options (add more as needed)
  const universities = [
    { name: "University of Colombo", lat: 6.9022, lng: 79.8612 },
    { name: "University of Peradeniya", lat: 7.2565, lng: 80.5985 },
    { name: "University of Moratuwa", lat: 6.7981, lng: 79.9006 },
    { name: "University of Kelaniya", lat: 6.9723, lng: 79.9187 },
    { name: "SLIIT Malabe", lat: 6.9147, lng: 79.9729 },
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.amenities) {
      setForm((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [name]: checked },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle university selection
  useEffect(() => {
    if (form.university) {
      const uni = universities.find((u) => u.name === form.university);
      if (uni) setUniLatLng({ lat: uni.lat, lng: uni.lng });
    }
  }, [form.university]);

  // Handle geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocationAccuracy("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setBhLatLng({ lat: latitude, lng: longitude });
        setLocationCoords(
          `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
        );
        setLocationAccuracy(`Accuracy: ±${Math.round(accuracy)} m`);
      },
      (err) => {
        alert("Unable to retrieve your location.");
        setLocationAccuracy("");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Handle map click
  const handleMapClick = (e) => {
    setBhLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setLocationCoords(
      `Lat: ${e.latLng.lat().toFixed(5)}, Lng: ${e.latLng.lng().toFixed(5)}`
    );
    setLocationAccuracy("");
  };

  // Handle marker drag
  const handleMarkerDragEnd = (e) => {
    setBhLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setLocationCoords(
      `Lat: ${e.latLng.lat().toFixed(5)}, Lng: ${e.latLng.lng().toFixed(5)}`
    );
    setLocationAccuracy("");
  };

  // Handle address autocomplete
  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setBhLatLng({ lat, lng });
        setLocationCoords(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
        setLocationAccuracy("");
      }
    }
  };

  // Calculate directions and distance
  useEffect(() => {
    if (isLoaded && uniLatLng && bhLatLng) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: bhLatLng,
          destination: uniLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const roadDistance = result.routes[0].legs[0].distance.value / 1000;
            setDistance(roadDistance.toFixed(2));
          }
        }
      );
    }
  }, [isLoaded, uniLatLng, bhLatLng]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      location: {
        university: form.university,
        distance_to_uni: parseFloat(distance) || 0,
        distance_to_transport: parseFloat(form.distance_to_transport) || 0,
        safety_score: parseInt(form.safety_score) || 5,
        is_main_road: false,
        is_residential_area: false,
      },
      amenities: form.amenities,
      reviews: {
        overall_rating: parseFloat(form.overall_rating) || 3,
        num_reviews: parseInt(form.num_reviews) || 0,
        landlord_response_time: parseFloat(form.landlord_response_time) || 1,
        value_rating: parseFloat(form.value_rating) || 3,
        maintenance_rating: 3,
        cleanliness_rating: 3,
      },
      room_type: form.room_type || "single",
      num_sharing: parseInt(form.num_sharing) || 1,
    };

    console.log("Sending payload:", payload);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error(`Server error: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
      setResults(data);
      setRecommendedRange(data.recommended_range);
    } catch (err) {
      console.error("Prediction error:", err);
      alert(`Prediction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div className="bg-gray-100 min-h-screen ml-50">
      <Sidebar />
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <a className="text-xl font-semibold" href="#">
            Dynamic Price Allocator
          </a>
        </div>
      </nav>
      <div className="container mx-auto px-4 my-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Input Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h5 className="text-xl font-medium mb-4">
                  Enter Property Details
                </h5>
                <form onSubmit={handleSubmit}>
                  {/* Boarding House Info */}
                  {/* <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">
                      Boarding House Info
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Boarding House Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="boarding_house_name"
                            value={form.boarding_house_name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Green Villa Hostel"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Mobile Number
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="owner_mobile"
                            value={form.owner_mobile}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            placeholder="e.g. 0771234567"
                          />
                          <small className="text-gray-500 text-xs">
                            Enter a valid 10-digit mobile number
                          </small>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* Room Type Selection */}
                  <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">Room Type</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Room Category
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="room_type"
                            value={form.room_type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Room Type</option>
                            <option value="single">Single Room</option>
                            <option value="shared-2">
                              Shared Room (2 Person)
                            </option>
                            <option value="shared-4">
                              Shared Room (4 Person)
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Students Sharing
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="num_sharing"
                            min="1"
                            max="4"
                            value={form.num_sharing}
                            onChange={handleChange}
                            required
                          />
                          <small className="text-gray-500 text-xs">
                            For shared rooms, enter how many students will share
                            the cost
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* University Selection */}
                  <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">University</h6>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="university"
                      value={form.university}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select University</option>
                      {universities.map((u) => (
                        <option key={u.name} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Distance to Transport & Safety */}
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Distance to Nearest Transport (km)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="distance_to_transport"
                            value={form.distance_to_transport}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        {/* <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Safety Score (1-10)
                          </label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="safety_score"
                            min="1"
                            max="10"
                            value={form.safety_score}
                            onChange={handleChange}
                            required
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* Amenities */}
                  <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">Amenities</h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {Object.keys(form.amenities).map((key) => (
                        <div key={key} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              name={key}
                              id={key}
                              checked={form.amenities[key]}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor={key}
                              className="font-medium text-gray-700"
                            >
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Reviews */}
                  {/* <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">Reviews</h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="overall_rating"
                          value={form.overall_rating}
                          onChange={handleChange}
                          placeholder="Overall Rating (1-5)"
                          min="1"
                          max="5"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="num_reviews"
                          value={form.num_reviews}
                          onChange={handleChange}
                          placeholder="Number of Reviews"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="landlord_response_time"
                          value={form.landlord_response_time}
                          onChange={handleChange}
                          placeholder="Landlord Response Time (hrs)"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="value_rating"
                          value={form.value_rating}
                          onChange={handleChange}
                          placeholder="Value Rating (1-5)"
                          min="1"
                          max="5"
                          required
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* Map & Location */}
                  <div className="mb-6">
                    <h6 className="text-lg font-medium mb-3">
                      Boarding House Location
                    </h6>
                    <div className="mb-3">
                      <Autocomplete
                        onLoad={setAutocomplete}
                        onPlaceChanged={handlePlaceChanged}
                      >
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Search your boarding house address or place..."
                        />
                      </Autocomplete>
                    </div>
                    <div className="flex flex-wrap items-center mb-3 gap-2">
                      <button
                        type="button"
                        className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onClick={handleGetLocation}
                      >
                        Use My Location as Boarding House
                      </button>
                      <span className="text-gray-500 text-sm">
                        {locationCoords}
                      </span>
                      <span className="text-amber-500 text-sm">
                        {locationAccuracy}
                      </span>
                      <span className="text-blue-500 text-sm">
                        (You can drag the red marker or click the map to
                        fine-tune your location)
                      </span>
                      {distance && (
                        <span className="text-green-600 text-sm ml-2">
                          Road Distance: {distance} km
                        </span>
                      )}
                    </div>
                    {isLoaded && (
                      <div className="rounded-lg overflow-hidden mb-3">
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={bhLatLng || uniLatLng || initialCenter}
                          zoom={bhLatLng || uniLatLng ? 14 : 7}
                          onLoad={setMap}
                          onClick={handleMapClick}
                        >
                          {uniLatLng && (
                            <Marker
                              position={uniLatLng}
                              icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                              }}
                              title="University Location"
                            />
                          )}
                          {bhLatLng && (
                            <Marker
                              position={bhLatLng}
                              draggable={true}
                              onDragEnd={handleMarkerDragEnd}
                              icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                              }}
                              title="Boarding House Location"
                            />
                          )}
                          {directions && (
                            <DirectionsRenderer directions={directions} />
                          )}
                        </GoogleMap>
                      </div>
                    )}
                    <small className="text-gray-500 text-sm">
                      Map will show both the university and your boarding house
                      location. Distance will be calculated automatically.
                    </small>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Predicting..." : "Predict Price"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Results */}
          <div className="w-full lg:w-1/3">
            <div className="mt-6 lg:mt-0">
              {recommendedRange && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg mb-4">
                  <div className="px-4 py-3">
                    <h6 className="font-medium mb-1">
                      Recommended Price Range: Rs.{" "}
                      {recommendedRange.min.toLocaleString()} - Rs.{" "}
                      {recommendedRange.max.toLocaleString()}
                    </h6>
                    <small className="text-gray-500">
                      (Based on distance and amenities)
                    </small>
                  </div>
                </div>
              )}
              {results && (
                <>
                  <h5 className="text-lg font-medium mb-3">
                    Price Predictions
                  </h5>

                  {/* Location Info */}
                  {results.location_info && (
                    <div className="bg-blue-50 rounded-lg mb-4">
                      <div className="px-4 py-3">
                        <h6 className="font-medium mb-1">
                          {results.location_info.category}
                        </h6>
                        <small className="text-gray-600">
                          {results.location_info.description}
                        </small>
                      </div>
                    </div>
                  )}

                  {/* Room Info */}
                  {results.room_info && (
                    <div className="bg-blue-50 rounded-lg mb-4">
                      <div className="px-4 py-3">
                        <h6 className="font-medium mb-1">
                          {results.room_info.description}
                        </h6>
                        <small className="text-gray-600">
                          Price shown per person. Total room price shown in
                          parentheses.
                        </small>
                      </div>
                    </div>
                  )}

                  {/* Monthly Price Cards - Vertical Layout */}
                  <div className="mb-6 space-y-4">
                    {/* April */}
                    {results.predicted_prices &&
                      results.predicted_prices.last_month && (
                        <div className="bg-white rounded-lg shadow">
                          <div className="px-4 py-3 text-center">
                            <h6 className="text-gray-500 mb-2">
                              {results.predicted_prices.last_month.month}
                            </h6>
                            <h4 className="text-xl font-semibold mb-1">
                              Rs.{" "}
                              {results.predicted_prices.last_month.price.toLocaleString()}
                            </h4>
                            <small className="text-gray-500">
                              (Total: Rs.{" "}
                              {results.predicted_prices.last_month.total_room_price.toLocaleString()}
                              )
                            </small>
                            <div className="mt-2 text-sm">
                              {results.predicted_prices.last_month.reason}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* May - Current Month */}
                    {results.predicted_prices &&
                      results.predicted_prices.current && (
                        <div className="bg-blue-600 text-white rounded-lg shadow">
                          <div className="px-4 py-3 text-center">
                            <h6 className="mb-2">
                              {results.predicted_prices.current.month}
                            </h6>
                            <h4 className="text-xl font-semibold mb-1">
                              Rs.{" "}
                              {results.predicted_prices.current.price.toLocaleString()}
                            </h4>
                            <small className="text-blue-200">
                              (Total: Rs.{" "}
                              {results.predicted_prices.current.total_room_price.toLocaleString()}
                              )
                            </small>
                            <div className="mt-2 text-sm flex justify-center items-center">
                              <span className="mr-2">
                                {results.predicted_prices.current
                                  .change_from_last >= 0
                                  ? "↑"
                                  : "↓"}{" "}
                                {Math.abs(
                                  results.predicted_prices.current
                                    .change_from_last
                                )}
                                % from last month
                              </span>
                            </div>
                            <div className="mt-1 text-sm">
                              {results.predicted_prices.current.reason}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* June - Next Month */}
                    {results.predicted_prices &&
                      results.predicted_prices.next_month && (
                        <div className="bg-white rounded-lg shadow">
                          <div className="px-4 py-3 text-center">
                            <h6 className="text-gray-500 mb-2">
                              {results.predicted_prices.next_month.month}
                            </h6>
                            <h4 className="text-xl font-semibold mb-1">
                              Rs.{" "}
                              {results.predicted_prices.next_month.price.toLocaleString()}
                            </h4>
                            <small className="text-gray-500">
                              (Total: Rs.{" "}
                              {results.predicted_prices.next_month.total_room_price.toLocaleString()}
                              )
                            </small>
                            <div className="mt-2 text-sm flex justify-center items-center">
                              <span className="mr-2">
                                {results.predicted_prices.next_month
                                  .change_from_current >= 0
                                  ? "↑"
                                  : "↓"}{" "}
                                {Math.abs(
                                  results.predicted_prices.next_month
                                    .change_from_current
                                )}
                                % from current month
                              </span>
                            </div>
                            <div className="mt-1 text-sm">
                              {results.predicted_prices.next_month.reason}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Next Year Estimate */}
                    {results.predicted_prices &&
                      results.predicted_prices.next_year_estimate && (
                        <div className="bg-white rounded-lg shadow">
                          <div className="px-4 py-3 text-center">
                            <h6 className="text-gray-500 mb-2">
                              Next Year Estimate
                            </h6>
                            <h4 className="text-xl font-semibold mb-1">
                              Rs.{" "}
                              {results.predicted_prices.next_year_estimate.toLocaleString()}
                            </h4>
                            <small className="text-gray-500">
                              (Total: Rs.{" "}
                              {results.predicted_prices.next_year_total.toLocaleString()}
                              )
                            </small>
                            <div className="mt-2 text-sm">
                              Including inflation
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Scores */}
                  <div className="mb-6 space-y-3">
                    {/* Amenity Score */}
                    {results.amenity_score && (
                      <div className="bg-blue-50 rounded-lg">
                        <div className="px-4 py-3 text-center">
                          <h6 className="font-medium mb-1">Amenity Score</h6>
                          <div className="text-2xl font-semibold">
                            {results.amenity_score}/10
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location Score */}
                    {results.location_score && (
                      <div className="bg-blue-50 rounded-lg">
                        <div className="px-4 py-3 text-center">
                          <h6 className="font-medium mb-1">Location Score</h6>
                          <div className="text-2xl font-semibold">
                            {results.location_score}/10
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Review Score */}
                    {results.review_score && (
                      <div className="bg-yellow-50 rounded-lg">
                        <div className="px-4 py-3 text-center">
                          <h6 className="font-medium mb-1">Review Score</h6>
                          <div className="text-2xl font-semibold">
                            {results.review_score}/10
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amenities List */}
                  {results.amenities_list &&
                    results.amenities_list.length > 0 && (
                      <div className="bg-white rounded-lg shadow mb-4">
                        <div className="px-4 py-2 border-b border-gray-200 font-medium">
                          Available Amenities
                        </div>
                        <div className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {results.amenities_list.map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicPricingApp;
