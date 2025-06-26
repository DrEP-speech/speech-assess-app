import React, { useState } from 'react';
import axios from 'axios';

const TherapistNotesEditor = ({ sessionId, initialNotes, onSave }) => {
  const [notes, setNotes] = useState(initialNotes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.put(`/api/schedule/notes/${sessionId}`, { notes });
      onSave({ notes: response.data.notes });
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <label className="block font-semibold mb-1 text-gray-700">Therapist Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        className="w-full border p-2 rounded shadow-sm"
        placeholder="Write session notes here..."
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {saving ? 'Saving...' : 'Save Notes'}
      </button>
    </div>
  );
};

export default TherapistNotesEditor;
