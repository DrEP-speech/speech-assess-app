import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { fetchUserProgress } from '../api/api';
import { useAuth } from '../context/AuthContext';

const TherapyPlanDownload = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.userId) return;
      try {
        const { data } = await fetchUserProgress(user.userId);
        setProgress(data.slice(-1)); // Most recent entry
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    loadProgress();
  }, [user]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('📋 Personalized Therapy Plan', 20, 20);

    if (progress[0]) {
      const recent = progress[0];
      const avg = Math.round((recent.fluency + recent.grammar + recent.clarity) / 3);

      doc.text(`Client: ${user.name}`, 20, 30);
      doc.text(`Score: ${avg}/100`, 20, 40);
      doc.text(`Date: ${new Date(recent.date).toLocaleDateString()}`, 20, 50);

      doc.text('Recommended Focus:', 20, 70);
      if (recent.fluency < 70) doc.text('- Slow connected speech practice.', 25, 80);
      if (recent.grammar < 70) doc.text('- Grammar games & storytelling.', 25, 90);
      if (recent.clarity < 70) doc.text('- Mirror-based articulation drills.', 25, 100);

      doc.text('General Actions:', 20, 120);
      doc.text('1. 15-min home practice daily', 25, 130);
      doc.text('2. Submit weekly recordings', 25, 140);
      doc.text('3. Attend scheduled sessions', 25, 150);

      doc.text('_________________________', 20, 180);
      doc.text('Parent Signature', 20, 185);

      doc.text('_________________________', 120, 180);
      doc.text('Therapist Signature', 120, 185);
    } else {
      doc.text('No recent progress found.', 20, 30);
    }

    return doc;
  };

  const handleDownload = () => {
    const doc = generatePDF();
    doc.save('therapy_plan.pdf');
  };

  const handleEmail = async () => {
    try {
      const doc = generatePDF();
      const pdfBase64 = btoa(doc.output('bloburi').split(',')[1]);

      await axios.post('/api/email/send', {
        email,
        pdfBase64,
        fileName: 'therapy_plan.pdf'
      });

      setStatus('✅ Plan emailed successfully!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Email failed');
    }
  };

  const handleSchedule = () => {
    // For future integration — trigger scheduling modal or route
    alert('📅 Therapy session scheduling feature coming soon!');
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">📥 Therapy Plan Options</h2>

      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
      >
        Download PDF
      </button>

      <div className="my-4">
        <input
          type="email"
          placeholder="Parent/Therapist Email"
          className="border p-2 rounded w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleEmail}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📧 Email Therapy Plan
        </button>
        {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
      </div>

      <button
        onClick={handleSchedule}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        📅 Link to Session Scheduler
      </button>
    </div>
  );
};

export default TherapyPlanDownload;

