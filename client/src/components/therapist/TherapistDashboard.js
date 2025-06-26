import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TherapistProgressSnapshot from './TherapistProgressSnapshot';
import UpcomingSessionList from './UpcomingSessionList';

const TherapistDashboard = ({ therapistId }) => {
  const [snapshot, setSnapshot] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    axios.get(`/api/therapists/${therapistId}/progress-snapshot`).then((res) => {
      setSnapshot(res.data);
    });
    axios.get(`/api/schedule/upcoming?therapistId=${therapistId}`).then((res) => {
      setUpcomingSessions(res.data);
    });
  }, [therapistId]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Welcome Back, Therapist</h1>
      <TherapistProgressSnapshot snapshot={snapshot} />
      <UpcomingSessionList sessions={upcomingSessions} />
    </div>
  );
};

export default TherapistDashboard;
