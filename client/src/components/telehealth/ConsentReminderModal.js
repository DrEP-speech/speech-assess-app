import React from 'react';

const ConsentReminderModal = ({ isOpen, onClose, session }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-2 text-red-600">⚠️ Consent Required</h2>
        <p className="mb-4 text-sm">
          The session <strong>{session?.clientName || 'N/A'}</strong> does not have a recorded HIPAA consent.
        </p>
        <p className="mb-4 text-sm">Please ensure the client or parent provides consent before starting.</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ConsentReminderModal;
