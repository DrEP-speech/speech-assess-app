import React, { useState } from 'react';

const HIPAAConsentBlock = ({ onConsent }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="border p-3 rounded bg-gray-50">
      <p className="text-sm mb-2">
        By attending this session, I consent to the use of telehealth services in compliance with HIPAA regulations.
      </p>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => {
            setAgreed(!agreed);
            onConsent(!agreed);
          }}
        />
        <span className="text-sm">I agree to the HIPAA telehealth terms</span>
      </label>
    </div>
  );
};

export default HIPAAConsentBlock;
