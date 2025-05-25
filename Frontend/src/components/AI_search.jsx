import { useState, useEffect } from "react";
import { MapPin, Mic } from "lucide-react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaSearch } from "react-icons/fa";

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
      <div className="max-w-4xl mx-auto px-6 mb-28">
        <h1 className="text-3xl font-bold text-center mb-6">
          Search for a Boarding House
        </h1>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
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
        {searchResults.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <ul>
              {searchResults.map((house, index) => (
                <li
                  key={index}
                  className="border-b py-4 flex justify-between items-center"
                >
                  <div>
                    <strong>{house.id}</strong>
                    <p>{house.location}</p>
                    <span className="text-gray-500">
                      Amenities: {house.amenities.join(", ")}
                    </span>
                  </div>
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm">
                    Score: {house.score.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
