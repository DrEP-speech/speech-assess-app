import React, { useState } from 'react';

const HIPAASignatureBlock = ({ onSign }) => {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState('');

  const handleSign = () => {
    if (name.trim()) {
      setSigned(true);
      onSign(name);
    }
  };
onSign(name); // Call your prop
logAuditAction({
  sessionId,
  action: `Signed HIPAA consent by ${name}`,
  user: name
});


  return (
    <div className="mt-6 bg-white shadow p-4 rounded">
      <h3 className="font-semibold mb-2">✍️ HIPAA Consent</h3>
      {signed ? (
        <p className="text-green-600 font-bold">✅ Signed by {name}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Patient or Guardian Name"
            className="border p-2 rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleSign}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sign Consent
          </button>
        </>
      )}
    </div>
  );
};

export default HIPAASignatureBlock;
