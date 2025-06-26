import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParentSessionList from '../components/parent/ParentSessionList';
import ChildProgressCard from '../components/parent/ChildProgressCard';
import ParentTipsModule from '../components/parent/ParentTipsModule';
import ExportProgressPDF from '../components/parent/ExportProgressPDF';
import ExportTipsPDF from '../components/parent/ExportTipsPDF';

const ParentDashboard = ({ currentUser }) => {
  const [childData, setChildData] = useState(null);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const childRes = await axios.get('/api/parents/child-data');
        setChildData(childRes.data);

        const tipsRes = await axios.get('/api/parents/tips');
        setTips(tipsRes.data);
      } catch (err) {
        console.error('Parent dashboard fetch error:', err);
      }
    };

    fetchDashboardData();
  }, []);

{childData && (
  <>
    <ChildProgressCard child={childData} />
    <ExportProgressPDF child={childData} />
  </>
)}
<ParentTipsModule tips={tips} />
{tips.length > 0 && <ExportTipsPDF tips={tips} />}
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">👪 Welcome, {currentUser.name}</h1>

      <ParentTipsModule tips={tips} />

      {childData && <ChildProgressCard child={childData} />}

      <ParentSessionList currentUser={currentUser} />
    </div>
  );
};

export default ParentDashboard;
