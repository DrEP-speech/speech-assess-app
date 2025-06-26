import React from 'react';
import Modal from 'react-modal';
import DownloadAISummaryButton from './DownloadAISummaryButton';
import axios from 'axios';

const SessionDetailsModal = ({ isOpen, onRequestClose, session, refreshSessions }) => {
  if (!session) return null;

  const {
    clientName,
    therapistName,
    date,
    sessionType,
    duration,
    notes,
    icdTags,
    cptTags,
    aiSummary,
    status,
  } = session;

  const handleRegenerateSummary = async () => {
    try {
      const res = await axios.post(`/api/session/regenerate-summary/${session._id}`, {
        userName: therapistName || 'System',
      });
      alert('✅ Summary regenerated!');
      refreshSessions(); // Refresh session data
    } catch (err) {
      console.error(err);
      alert('❌ Error regenerating summary.');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Session Details" ariaHideApp={false}>
      <div className="modal-header">
        <h4>📋 Session Details</h4>
        <button className="btn btn-sm btn-outline-secondary" onClick={onRequestClose}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <p><strong>Client:</strong> {clientName}</p>
        <p><strong>Therapist:</strong> {therapistName}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Type:</strong> {sessionType}</p>
        <p><strong>Duration:</strong> {duration} minutes</p>
        <p><strong>Status:</strong> {status}</p>
        {icdTags?.length > 0 && (
          <p><strong>ICD Tags:</strong> {icdTags.join(', ')}</p>
        )}
        {cptTags?.length > 0 && (
          <p><strong>CPT Tags:</strong> {cptTags.join(', ')}</p>
        )}
        {notes && (
          <div>
            <strong>Notes:</strong>
            <p>{notes}</p>
          </div>
        )}

        {/* AI Summary Section */}
        {aiSummary ? (
          <>
            <h5 className="mt-4">🧠 AI-Generated Summary</h5>
            <div className="alert alert-light">{aiSummary}</div>
            <span className="badge bg-success mb-2">✅ AI Summary Generated</span>
            <DownloadAISummaryButton session={session} />
            <button onClick={handleRegenerateSummary} className="btn btn-sm btn-warning mt-2">
              🔁 Regenerate Summary
            </button>
          </>
        ) : (
          <div className="alert alert-warning mt-3">
            ⚠️ No AI summary found for this session.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SessionDetailsModal;
