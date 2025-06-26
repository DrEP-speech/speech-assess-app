import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChildProgressCard from './ChildProgressCard';
import UpcomingSessionList from './UpcomingSessionList';

const ParentDashboard = ({ parentId }) => {
  const [childrenProgress, setChildrenProgress] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    axios.get(`/api/parents/${parentId}/children-progress`).then((res) => {
      setChildrenProgress(res.data);
    });
    axios.get(`/api/schedule/upcoming?parentId=${parentId}`).then((res) => {
      setUpcomingSessions(res.data);
    });
  }, [parentId]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Hello, Parent</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childrenProgress.map((child) => (
          <ChildProgressCard key={child.childId} data={child} />
        ))}
      </div>
      <UpcomingSessionList sessions={upcomingSessions} />
    </div>
  );
};

export default ParentDashboard;
