import React, { useState } from 'react';
import axios from 'axios';

await axios.put(`/api/schedule/notes/${sessionId}`, {
  notes,
  telehealthLink: teleLink
});

logAuditAction({
  sessionId,
  action: 'Updated therapist notes and telehealth link',
  user: 'Therapist A'
});

const TherapistNotesEditor = ({ sessionId }) => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
const [teleLink, setTeleLink] = useState('');
<input
  type="url"
  placeholder="Paste Zoom/Meet link"
  value={teleLink}
  onChange={(e) => setTeleLink(e.target.value)}
  className="w-full border p-2 rounded mt-2"
  required
/>

const saveAll = async () => {
  try {
    await axios.put(`/api/schedule/notes/${sessionId}`, {
      notes,
      telehealthLink: teleLink
    });
    setStatus('✅ Notes & link saved');
  } catch (err) {
    setStatus('❌ Failed to save');
  }
};

  const saveNotes = async () => {
    try {
      await axios.put(`/api/schedule/notes/${sessionId}`, { notes });
      setStatus('✅ Notes saved');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to save notes');
    }
  };

<input
  type="url"
  placeholder="Paste Zoom or Google Meet link"
  className="w-full border p-2 rounded mt-3"
  value={teleLink}
  onChange={(e) => setTeleLink(e.target.value)}
/>
  return (
    <div className="bg-white p-4 shadow rounded mt-6">
      <h3 className="font-bold mb-2">📝 Therapist Notes</h3>
      <textarea
        rows="4"
        className="w-full border p-2 rounded"
        placeholder="Enter post-session notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        onClick={saveNotes}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Notes
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default TherapistNotesEditor;
