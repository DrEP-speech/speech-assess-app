import React, { useState } from 'react';
import axios from 'axios';

const AttendanceEditorModal = ({ isOpen, onClose, sessionId, onStatusUpdated }) => {
  const [status, setStatus] = useState('completed');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.put(`/api/schedule/attendance/${sessionId}`, { status, notes });
      onStatusUpdated && onStatusUpdated(status);
      onClose();
    } catch (error) {
      alert('Failed to update session.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Mark Attendance</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="completed">✅ Completed</option>
            <option value="no-show">❌ No Show</option>
            <option value="cancelled">🚫 Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-gray-300 text-gray-600"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 rounded bg-blue-600 text-white"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceEditorModal;
