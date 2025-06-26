import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SessionComplianceTracker = () => {
  const [complianceData, setComplianceData] = useState([]);

  useEffect(() => {
    axios.get('/api/sessions/compliance')
      .then(response => setComplianceData(response.data))
      .catch(error => console.error("Compliance fetch error:", error));
  }, []);

  return (
    <div className="compliance-tracker">
      <h2>📋 Session Compliance Tracker</h2>
      <ul>
        {complianceData.map((item, index) => (
          <li key={index}>
            {item.name} - {item.status} ({item.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionComplianceTracker;
