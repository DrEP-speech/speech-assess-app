// src/components/RealTimePronunciation.js
import React, { useEffect, useRef, useState } from "react";

const RealTimePronunciation = () => {
  const [words, setWords] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let spokenWords = [];
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i][0].transcript.trim();
        spokenWords = result.split(" ").map((word) => ({
          text: word,
          timestamp: Date.now(),
        }));
      }
      setWords(spokenWords);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🗣️ Real-Time Pronunciation Feedback</h2>
      <button onClick={toggleListening}>
        {isListening ? "🛑 Stop Listening" : "🎙️ Start Listening"}
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "2px dashed #888",
          borderRadius: "10px",
          background: "#f9f9f9",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {words.length === 0 ? (
          <p>Speak a sentence to see real-time word capture...</p>
        ) : (
          <div>
            <p><strong>Words:</strong></p>
            <ul>
              {words.map((word, index) => (
                <li key={index} style={{ fontSize: "1.2em", marginBottom: "6px" }}>
                  ✅ {word.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimePronunciation;
