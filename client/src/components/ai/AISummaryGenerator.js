import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AISummaryGenerator = ({ sessionId, onComplete }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
const { logAuditEvent } = require('../utils/logAudit');
await logAuditEvent(sessionId, userId, 'AI_SUMMARY_GENERATED', {
  summarySnippet: aiSummary.slice(0, 100),
});
  const generateSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/schedule/ai-summary/${sessionId}`);
      setSummary(res.data.summary);
      setLoading(false);
      if (onComplete) onComplete(res.data.summary);
    } catch (error) {
      console.error('Summary generation failed:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) generateSummary();
  }, [sessionId]);

  return (
    <div className="mt-4 p-4 bg-gray-100 border rounded shadow-sm">
      {loading ? (
        <p className="text-blue-500">🧠 Generating AI Summary...</p>
      ) : (
        <p><strong>AI Summary:</strong> {summary}</p>
      )}
    </div>
  );
};

export default AISummaryGenerator;
