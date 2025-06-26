import React, { useState } from 'react';
import axios from 'axios';

const ConsentSignatureBlock = ({ sessionId }) => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitConsent = async () => {
    try {
      await axios.post('/api/telehealth/consent', { sessionId, name });
      setSubmitted(true);
    } catch (err) {
      console.error('Consent submission failed:', err);
    }
  };

  if (submitted) {
    return <p className="text-green-700 text-sm">✅ Consent recorded for {name}</p>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm">
      <label className="block text-sm text-gray-700 mb-1">Patient/Parent Signature:</label>
      <input
        type="text"
        className="border p-2 rounded w-full text-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type full name"
      />
      <button
        onClick={submitConsent}
        className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
      >
        Submit Consent
      </button>
    </div>
  );
};

export default ConsentSignatureBlock;
