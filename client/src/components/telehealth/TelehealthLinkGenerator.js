import React, { useState } from 'react';
import axios from 'axios';

const TelehealthLinkGenerator = ({ sessionId }) => {
  const [link, setLink] = useState('');

  const generateLink = async () => {
    try {
      const res = await axios.post(`/api/telehealth/generate-link`, { sessionId });
      setLink(res.data.link);
    } catch (err) {
      console.error('Link generation failed:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <button
        onClick={generateLink}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate Telehealth Link
      </button>

      {link && (
        <div className="mt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline text-sm"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
};

export default TelehealthLinkGenerator;
