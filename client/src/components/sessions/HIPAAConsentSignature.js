import React, { useState } from 'react';
import axios from 'axios';

const HIPAAConsentSignature = ({ sessionId, signed, onSign }) => {
  const [isSigned, setIsSigned] = useState(signed || false);
  const [saving, setSaving] = useState(false);

  const handleConsentToggle = async () => {
    setSaving(true);
    try {
      const response = await axios.put(`/api/schedule/consent/${sessionId}`, {
        hipaaConsentSigned: !isSigned,
      });
      setIsSigned(response.data.hipaaConsentSigned);
      onSign({ hipaaConsentSigned: response.data.hipaaConsentSigned });
    } catch (error) {
      console.error('Consent update failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 border rounded">
      <span className="font-medium text-gray-700">
        HIPAA Consent: {isSigned ? '✔ Signed' : '✖ Not Signed'}
      </span>
      <button
        onClick={handleConsentToggle}
        disabled={saving}
        className={`px-4 py-2 rounded text-white ${
          isSigned ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isSigned ? 'Revoke Consent' : 'Sign Consent'}
      </button>
    </div>
  );
};

export default HIPAAConsentSignature;
