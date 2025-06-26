// SessionControlPanel.js
import React from 'react';
import SessionTimer from './SessionTimer';
import TherapistNotesEditor from './TherapistNotesEditor';
import ICDCPTTagger from './ICDCPTTagger';
import HIPAAConsentSignature from './HIPAAConsentSignature';
import AuditLogViewer from './AuditLogViewer';
import SessionExportPDF from './SessionExportPDF';
import DownloadAISummaryButton from './DownloadAISummaryButton';
import FlagEditorModal from './FlagEditorModal';

const SessionControlPanel = ({ session, updateSession, userName }) => {
  if (!session) return <p className="text-gray-500">No session selected.</p>;

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">
        Session Control Panel
      </h2>

      {/* Real-Time Timer */}
      <SessionTimer sessionId={session._id} />

      {/* Therapist Notes Editor */}
      <TherapistNotesEditor
        sessionId={session._id}
        initialNotes={session.notes}
        onSave={updateSession}
      />

      {/* ICD/CPT Code Tagging */}
      <ICDCPTTagger
        sessionId={session._id}
        initialICD={session.icdCodes}
        initialCPT={session.cptCodes}
        onSave={updateSession}
      />

      {/* HIPAA Consent Block */}
      <HIPAAConsentSignature
        sessionId={session._id}
        signed={session.hipaaConsentSigned}
        onSign={updateSession}
      />

      {/* Manual Flag Editor */}
      <FlagEditorModal
        sessionId={session._id}
        current
