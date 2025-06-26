import React, { useState } from 'react';
import axios from 'axios';

const AISOAPGenerator = ({ sessionId }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/session-ai/summary/${sessionId}`);
      setSummary(res.data.summary);
    } catch (err) {
      alert('Error generating summary.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-2 mt-4">
      <button
        onClick={generateSummary}
        disabled={loading}
        className="px-4 py-1 bg-indigo-600 text-white rounded"
      >
        {loading ? 'Generating...' : 'Generate AI SOAP Summary'}
      </button>

      {summary && (
        <div className="bg-gray-100 p-3 rounded border text-sm whitespace-pre-wrap">
          <strong className="block mb-2">AI SOAP Summary:</strong>
          {summary}
<a
  href={`/api/soap-export/pdf/${sessionId}`}
  target="_blank"
  rel="noopener noreferrer"
  className="px-4 py-1 bg-gray-700 text-white rounded inline-block mt-2"
>
  Download PDF
</a>

        </div>
      )}
    </div>
  );
};

export default AISOAPGenerator;
