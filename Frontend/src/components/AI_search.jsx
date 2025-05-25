import { useState, useEffect } from "react";
import { MapPin, Mic } from "lucide-react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AI_search() {
  const [queryInput, setQueryInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      console.log("🎤 Final transcript:", transcript);
      runVoiceSearch(transcript);
    }
  }, [listening]);

  const runVoiceSearch = async (voiceQuery) => {
    setQueryInput(voiceQuery); // show in the input box
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        query: voiceQuery,
      });

      console.log("✅ Backend response:", response.data);

      if (response.data.results && response.data.results.length > 0) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
        alert("No matching boarding houses found.");
      }
    } catch (error) {
      console.error("Voice search failed:", error);
      alert("Search failed. Please try again.");
    }

    setLoading(false);
    resetTranscript();
  };

  const handleVoiceSearch = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleSearch = async () => {
    if (!queryInput.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        query: queryInput,
      });

      if (response.data.results && response.data.results.length > 0) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
        alert("No matching boarding houses found.");
      }
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    }
    setLoading(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support voice recognition.</span>;
  }

  return (
    <div className="">
      <div className="w-full mx-auto px-10 mb-28">
        <h1 className="text-3xl font-bold text-center mb-6">
          Search for a Boarding House
        </h1>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 w-[50%] mx-auto">
          <MapPin className="text-gray-400" />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-400"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search with location & amenities..."
          />
          <button
            className={`p-3 rounded-lg text-white cursor-pointer ${
              listening ? "bg-red-500" : "bg-[#4a4e69]"
            } hover:bg-opacity-75`}
            onClick={handleVoiceSearch}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            className="bg-[#c9ada7] p-3 rounded-lg text-white hover:bg-[#4a4e69] cursor-pointer"
            onClick={handleSearch}
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Transcript Feedback */}
        {listening && (
          <div className="text-sm text-blue-500 ml-2 mt-2">🎙️ Listening...</div>
        )}
        {transcript && !listening && (
          <div className="text-sm text-gray-600 mt-2">
            🗣️ You said: "{transcript}"
          </div>
        )}

        {/* Search Results */}
       <div className="grid grid-cols-4 gap-6 mt-10 px-10">
        
  {searchResults.map((house) => (
    <motion.div
      key={house._id}
      variants={itemVariants}
      onClick={() => handleListingSelect(house)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
    >
      <div className="h-48 overflow-hidden relative">
        {house.viewImages?.front ? (
          <img
            src={house.viewImages.front}
            alt={house.title || "Listing image"}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white font-bold text-xl">{house.title || "No title"}</h2>
          <p className="text-white/90">{house.location || "No location"}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold text-xl">
            Rs.{house.price ?? "N/A"}
            <span className="text-gray-500 text-sm font-normal">/mo</span>
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {house.roomType || "N/A"}
          </span>
        </div>

        <div className="flex justify-between text-gray-600 text-sm mb-3">
          <span className="flex items-center">
            {/* Bedroom icon and count here if needed */}
          </span>
          <span className="flex items-center">
            {/* Bathroom icon and count here if needed */}
          </span>
          <span className="flex items-center">
            {/* Area info here if needed */}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {house.description || "No description available."}
        </p>

        {house.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {house.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {house.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                +{house.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  ))}
</div>
        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-6 text-lg font-semibold text-gray-600">
            Searching...
          </div>
        )}
      </div>
    </div>
  );
}
