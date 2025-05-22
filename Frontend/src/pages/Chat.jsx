import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const Chat = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize voice recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>❌ Voice recognition is not supported in this browser.</p>;
  }

  // Function to handle search
  const handleSearch = async () => {
    if (!transcript.trim()) return; // Prevent empty search

    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/search", {
        params: { query: transcript },
      });

      setSearchResults(response.data); // Store search results
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>🎤 Voice Search Chatbot</h2>

      <div className="voice-controls">
        <button onClick={SpeechRecognition.startListening}>
          🎙 Start Speaking
        </button>
        <button onClick={SpeechRecognition.stopListening}>⏹ Stop</button>
        <button onClick={resetTranscript}>🔄 Reset</button>
      </div>

      <p>
        <strong>🗣 You said:</strong> {transcript}
      </p>

      <button onClick={handleSearch} disabled={loading || !transcript.trim()}>
        {loading ? "🔍 Searching..." : "🔍 Search Boarding Houses"}
      </button>

      {searchResults.length > 0 && (
        <div className="results">
          <h3>🔍 Search Results</h3>
          <ul>
            {searchResults.map((house, index) => (
              <li key={index}>
                <strong>{house.boarding_house_id}</strong> - {house.location}{" "}
                <br />
                <span>Amenities: {house.amenities}</span> <br />
                <span>Score: {house.score.toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chat;
