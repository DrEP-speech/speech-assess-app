import React, { useState } from 'react';
import axios from 'axios';

const FlagEditorModal = ({ sessionId, currentFlags = [], onSave }) => {
  const [flags, setFlags] = useState(currentFlags);
  const [newFlag, setNewFlag] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const addFlag = () => {
    if (newFlag && !flags.includes(newFlag)) {
      setFlags([...flags, newFlag]);
      setNewFlag('');
    }
  };

  const removeFlag = (flag) => {
    setFlags(flags.filter((f) => f !== flag));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`/api/schedule/flags/${sessionId}`, { manualFlags: flags });
      onSave({ manualFlags: res.data.manualFlags });
      setIsOpen(false);
    } catch (err) {
      console.error('Error saving flags:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit Flags
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Session Flags</h2>

            <div className="mb-3">
              <input
                value={newFlag}
                onChange={(e) => setNewFlag(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="e.g., Needs Follow-Up"
              />
              <button
                onClick={addFlag}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Add Flag
              </button>
            </div>

            <ul className="space-y-1 mb-4">
              {flags.map((flag, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{flag}</span>
                  <button
                    onClick={() => removeFlag(flag)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              {saving ? 'Saving...' : 'Save Flags'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagEditorModal;
