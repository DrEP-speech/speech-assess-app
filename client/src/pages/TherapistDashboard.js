import React from 'react';
import TherapistSessionList from '../components/therapist/TherapistSessionList';
import TherapistProgressSnapshot from '../components/therapist/TherapistProgressSnapshot';

const TherapistDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">👩‍⚕️ Therapist Dashboard</h1>
      <TherapistProgressSnapshot />
      <TherapistSessionList />
    </div>
  );
};

export default TherapistDashboard;
