import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SessionStatusBadge from './SessionStatusBadge';
import AuditLogViewer from './AuditLogViewer';
import AISOAPGenerator from './AISOAPGenerator';

const SessionDetailsModal = ({ sessionId, isOpen, onClose }) => {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('scheduled');
  const [notes, setNotes] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [cptCode, setCptCode] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionId && isOpen) {
      setLoading(true);
      axios.get(`/api/schedule/${sessionId}`).then((res) => {
        setSession(res.data);
        setStatus(res.data.status || 'scheduled');
        setNotes(res.data.notes || '');
        setConsentGiven(res.data.hipaaConsent || false);
        setRescheduleDate(res.data.date ? new Date(res.data.date).toISOString().slice(0, 16) : '');
        setIcdCode(res.data.icdCode || '');
        setCptCode(res.data.cptCode || '');
        setLoading(false);
      });
    }
  }, [sessionId, isOpen]);

  const handleSave = async () => {
    await axios.put(`/api/schedule/update/${sessionId}`, {
      status,
      notes,
      date: rescheduleDate,
      icdCode,
      cptCode,
      hipaaConsent: consentGiven,
    });
    onClose();
  };

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">Session Details</h2>

        <div className="text-sm text-gray-600">
          <p><strong>Child:</strong> {session.childId?.name}</p>
          <p><strong>Therapist:</strong> {session.therapistId?.name}</p>
          <p><strong>Current Time:</strong> {new Date(session.date).toLocaleString()}</p>
        </div>

        <SessionStatusBadge status={status} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Update Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="scheduled">🕒 Scheduled</option>
            <option value="completed">✅ Completed</option>
            <option value="no-show">❌ No Show</option>
            <option value="cancelled">🚫 Cancelled</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">Clinical Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded px-2 py-1" rows={3} />

          <label className="block text-sm font-medium text-gray-700">Reschedule Date/Time</label>
          <input type="datetime-local" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} className="w-full border rounded px-2 py-1" />

          <label className="block text-sm font-medium text-gray-700">ICD Code</label>
          <input type="text" value={icdCode} onChange={(e) => setIcdCode(e.target.value)} className="w-full border rounded px-2 py-1" />

          <label className="block text-sm font-medium text-gray-700">CPT Code</label>
          <input type="text" value={cptCode} onChange={(e) => setCptCode(e.target.value)} className="w-full border rounded px-2 py-1" />

          <label className="flex items-center space-x-2 pt-2">
            <input type="checkbox" checked={consentGiven} onChange={() => setConsentGiven(!consentGiven)} />
            <span className="text-sm text-gray-700">HIPAA Consent Given</span>
          </label>
        </div>

        {/* ✅ PDF Export Button */}
        <div className="pt-4 flex justify-end">
          <a
            href={`/api/session-export/export/${sessionId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 bg-gray-600 text-white rounded"
          >
            Download PDF
          </a>
        </div>

        {/* ✅ Audit Trail Panel */}
        <div className="pt-4">
          <AuditLogViewer sessionId={sessionId} />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button onClick={onClose} className="px-4 py-1 border border-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-1 bg-blue-600 text-white rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsModal;
