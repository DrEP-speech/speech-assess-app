import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

const LiveTranscript = () => {
  const [transcript, setTranscript] = useState("");
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
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript.trim());
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

  const submitTranscript = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/score-ai", { transcript });
      const aiResponse = response.data.score;
      speakText(aiResponse);
      alert("AI Score: " + aiResponse);
    } catch (error) {
      console.error("Error scoring transcript:", error);
      alert("❌ Failed to get score. Check if your server is running.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🎤 Live Speech Transcription</h2>
      <button onClick={toggleListening}>
        {isListening ? "🛑 Stop" : "🎙️ Start Listening"}
      </button>
      <button onClick={submitTranscript} style={{ marginLeft: "10px" }}>
        🧠 Submit to AI
      </button>
      <div style={{
        marginTop: "20px", border: "1px solid #ccc",
        padding: "15px", borderRadius: "8px"
      }}>
        <strong>Transcript:</strong>
        <p>{transcript || "Speak into your mic..."}</p>
      </div>
    </div>
  );
};

export default LiveTranscript;