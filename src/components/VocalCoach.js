import React, { useState } from 'react';
import { analyzeAccent } from '../api/api'; // Reusing accent-like API

const VocalCoach = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return;

    const formData = new FormData();
    formData.append('audioData', audioFile);

    try {
      setLoading(true);
      const { data } = await analyzeAccent(formData); // uses same structure
      setResult(data);
    } catch (err) {
      console.error('Vocal coaching failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">🎤 Vocal Coach</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Voice'}
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h3 className="font-semibold">Coaching Feedback:</h3>
          <ul className="list-disc list-inside">
            <li><strong>Clarity:</strong> {result.clarity}</li>
            <li><strong>Tone:</strong> {result.tone}</li>
            <li><strong>Pacing:</strong> {result.pacing}</li>
            {result.tips && (
              <>
                <strong>Tips:</strong>
                <ul className="ml-4 list-disc">
                  {result.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VocalCoach;
