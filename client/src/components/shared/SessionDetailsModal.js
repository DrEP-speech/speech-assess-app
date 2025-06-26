import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SessionPDFDocument from '../pdf/SessionPDFDocument';
import SessionPrintView from '../print/SessionPrintView';

const SessionDetailsModal = ({ session, onClose, onSave }) => {
  const [notes, setNotes] = useState(session.notes || '');
  const [soap, setSoap] = useState(session.soap || '');
  const [flags, setFlags] = useState(session.flags || []);
  const [icdCode, setIcdCode] = useState(session.icdCode || '');
  const [cptCode, setCptCode] = useState(session.cptCode || '');
  const [aiSummary, setAiSummary] = useState(session.aiSummary || '');
  const [generating, setGenerating] = useState(false);
  const [newFlag, setNewFlag] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const regenerateAISummary = async (sessionId) => {
  try {
    setIsGenerating(true);

    const res = await fetch(`/api/schedule/ai-summary/${sessionId}`, {
      method: 'POST',
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ AI Summary regenerated successfully!');
      setSession((prev) => ({
        ...prev,
        aiSummary: data.aiSummary,
      }));
    } else {
      alert('⚠️ Failed to regenerate summary.');
    }
  } catch (error) {
    console.error('AI Summary generation failed:', error);
    alert('❌ Error during AI summary regeneration.');
  } finally {
    setIsGenerating(false);
  }
};


  const addFlag = () => {
    if (newFlag && !flags.includes(newFlag)) {
      setFlags([...flags, newFlag]);
      setNewFlag('');
    }
  };

  const removeFlag = (flag) => {
    setFlags(flags.filter((f) => f !== flag));
  };

  const generateSummary = async () => {
    setGenerating(true);
    try {
      const { data } = await axios.post(`/api/sessions/ai-summary/${session._id}`);
      setAiSummary(data.summary);
    } catch (err) {
      alert('AI summary generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    await axios.put(`/api/schedule/session-details/${session._id}`, {
      notes,
      soap,
      flags,
      icdCode,
      cptCode,
      aiSummary
    });
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">🗂️ Session Details</h2>

        {/* Notes */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">📝 Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* SOAP */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">💬 SOAP Comments</label>
          <textarea
            value={soap}
            onChange={(e) => setSoap(e.target.value)}
            rows={4}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Flags */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">🧷 Flags</label>
          <ul className="mb-2 text-sm">
            {flags.map((flag, idx) => (
              <li key={idx} className="flex justify-between items-center">
                {flag}
                <button onClick={() => removeFlag(flag)} className="text-red-500 text-xs">✕</button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              value={newFlag}
              onChange={(e) => setNewFlag(e.target.value)}
              placeholder="Add flag..."
              className="border p-1 rounded w-full text-sm"
            />
            <button onClick={addFlag} className="px-2 text-xs bg-blue-600 text-white rounded">Add</button>
          </div>
        </div>

        {/* ICD Code */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">🏷️ ICD Code</label>
          <input
            value={icdCode}
            onChange={(e) => setIcdCode(e.target.value)}
            className="border p-2 rounded w-full text-sm"
            placeholder="e.g., R13.10"
          />
        </div>

        {/* CPT Code */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">🏷️ CPT Code</label>
          <input
            value={cptCode}
            onChange={(e) => setCptCode(e.target.value)}
            className="border p-2 rounded w-full text-sm"
            placeholder="e.g., 92507"
          />
        </div>

        {/* AI Summary */}
        <div className="mb-4">
          <label className="text-sm font-semibold block">🧠 AI-Generated Summary</label>
          {aiSummary ? (
            <div className="border p-2 rounded bg-gray-50 text-sm whitespace-pre-wrap">{aiSummary}</div>
          ) : (
            <button onClick={generateSummary} className="text-sm text-blue-600 hover:underline">
              {generating ? 'Generating...' : '✨ Generate AI Summary'}
            </button>
          )}
        </div>

        {/* Print Preview */}
        <SessionPrintView session={{ ...session, notes, soap, flags, icdCode, cptCode, aiSummary }} />

        {/* PDF Export */}
        <div className="flex justify-end gap-2 mb-3">
          <PDFDownloadLink
            document={
              <SessionPDFDocument session={{ ...session, notes, soap, flags, icdCode, cptCode, aiSummary }} />
            }
            fileName={`session_${session.name}_${session.date}.pdf`}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded"
          >
            {({ loading }) => (loading ? 'Preparing PDF...' : '📄 Download PDF')}
          </PDFDownloadLink>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="text-sm text-gray-600">Cancel</button>
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
{session?.status === 'completed' && !session?.aiSummary && (
  <AISummaryGenerator sessionId={session._id} onComplete={fetchSessionData} />
)}
  {session?.aiSummary && (
  <div className="bg-green-50 p-2 border border-green-300 rounded mt-2">
    <h4 className="font-semibold text-green-700">✅ AI Summary Generated</h4>
    <p>{session.aiSummary}</p>
  </div>
)}
{session?.aiSummary && (
  <div className="ai-summary-container">
    <h3>🧠 AI-Generated Summary</h3>
    <p>{session.aiSummary}</p>
  </div>
<DownloadAISummaryButton session={session} />
)}

      {session && (
  <div className="mt-4">
    <button
      className={`px-4 py-2 rounded text-white ${isGenerating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      onClick={() => regenerateAISummary(session._id)}
      disabled={isGenerating}
    >
      {isGenerating ? '⏳ Generating...' : '🔁 Regenerate AI Summary'}
    </button>
  </div>
)}
<h3 className="text-lg font-semibold mt-6">🖥️ Telehealth Tools</h3>
<hr className="mb-2" />
</div>
  );
};

export default SessionDetailsModal;

