import React from 'react';
import { Link } from 'react-router-dom';

const ReportCenter = () => {
  return (
    <div className="p-6 space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold">📊 Report Center</h2>
      <p>Access, download, and email your assessment results and feedback reports.</p>

      <ul className="space-y-3">
        <li><Link to="/score-history" className="text-blue-600 underline">📈 View Score History</Link></li>
        <li><Link to="/grammar-check" className="text-blue-600 underline">✍️ Grammar & Fluency Check</Link></li>
        <li><Link to="/vocal-coach" className="text-blue-600 underline">🎤 Vocal Coach Analysis</Link></li>
        <li><Link to="/therapy-plan" className="text-blue-600 underline">📥 Download Therapy Plan</Link></li>
      </ul>
    </div>
  );
};

export default ReportCenter;
