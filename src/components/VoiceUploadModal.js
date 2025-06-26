import React from 'react';

const VoiceUploadModal = ({ isOpen, onClose, onFileSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Upload Your Voice Sample</h3>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => onFileSelect(e.target.files[0])}
          className="w-full border p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Done</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceUploadModal;
