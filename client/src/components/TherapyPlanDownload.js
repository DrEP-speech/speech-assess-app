import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { fetchUserProgress } from '../api/api';
import { useAuth } from '../context/AuthContext';

const TherapyPlanDownload = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.userId) return;
      try {
        const { data } = await fetchUserProgress(user.userId);
        setProgress(data.slice(-1)); // Get most recent entry
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };
    loadProgress();
  }, [user]);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('📋 Personalized Therapy Plan', 20, 20);

    if (progress[0]) {
      const recent = progress[0];
      const avg = Math.round((recent.fluency + recent.grammar + recent.clarity) / 3);

      doc.text(`Client: ${user.name}`, 20, 30);
      doc.text(`Most Recent Score: ${avg}/100`, 20, 40);
      doc.text(`Date: ${new Date(recent.date).toLocaleDateString()}`, 20, 50);

      doc.text('Recommended Focus Areas:', 20, 70);
      if (recent.fluency < 70) {
        doc.text('- Practice slow, connected speech using sentence repetition.', 25, 80);
      }
      if (recent.grammar < 70) {
        doc.text('- Engage in language games targeting subject-verb agreement.', 25, 90);
      }
      if (recent.clarity < 70) {
        doc.text('- Mirror exercises to improve articulation and enunciation.', 25, 100);
      }

      doc.text('General Recommendations:', 20, 120);
      doc.text('1. Daily home practice (10–15 min).', 25, 130);
      doc.text('2. Weekly voice recordings for review.', 25, 140);
      doc.text('3. Attend virtual therapy sessions as scheduled.', 25, 150);
    } else {
      doc.text('No recent progress data found. Please complete an assessment.', 20, 30);
    }

    doc.save('therapy_plan.pdf');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">📥 Download Therapy Plan</h2>
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download Personalized Plan
      </button>
    </div>
  );
};

export default TherapyPlanDownload;
