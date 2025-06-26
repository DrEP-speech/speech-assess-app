
import React, { useState } from "react";
import axios from "axios";

const SpeechUploadFeedback = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [aiScore, setAiScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("audio", file);

      const transcriptionResponse = await axios.post("/api/transcribe", formData);
      const transcribedText = transcriptionResponse.data.transcript;
      setTranscript(transcribedText);

      const aiResponse = await axios.post("/api/score-ai", { transcript: transcribedText });
      setAiScore(aiResponse.data.score);
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during upload or scoring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>📤 Upload Speech File for Feedback</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>🚀 Submit for Feedback</button>

      {loading && <p>⏳ Processing... please wait.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {transcript && (
        <div style={{ marginTop: "20px", textAlign: "left", background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
          <h4>📝 Transcript:</h4>
          <p>{transcript}</p>
        </div>
      )}

      {aiScore && (
        <div style={{ marginTop: "20px", background: "#e6ffe6", padding: "15px", borderRadius: "8px" }}>
          <h4>🤖 AI Feedback:</h4>
          <p>{aiScore}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechUploadFeedback;
