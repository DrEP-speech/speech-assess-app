import React, { useState } from 'react';
import axios from 'axios';

const FlagEditorModal = ({ sessionId, currentFlags = [], onClose, onSave }) => {
  const [flags, setFlags] = useState(currentFlags);
  const [input, setInput] = useState('');

  const addFlag = () => {
    if (input && !flags.includes(input)) {
      setFlags([...flags, input]);
      setInput('');
    }
  };

  const removeFlag = (flag) => {
    setFlags(flags.filter((f) => f !== flag));
  };

  const handleSave = async () => {
    await axios.put(`/api/schedule/flags/${sessionId}`, { flags });
    onSave(flags);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">🧷 Edit Session Flags</h2>
        <ul className="mb-3 space-y-1">
          {flags.map((flag, idx) => (
            <li key={idx} className="flex justify-between items-center text-sm">
              {flag}
              <button onClick={() => removeFlag(flag)} className="text-red-500 text-xs ml-2">✕</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new flag..."
            className="border p-1 rounded w-full text-sm"
          />
          <button onClick={addFlag} className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
            Add
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm text-gray-600">Cancel</button>
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlagEditorModal;
