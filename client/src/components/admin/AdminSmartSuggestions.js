import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSmartSuggestions = () => {
  const [unassignedClients, setUnassignedClients] = useState([]);
  const [flaggedSessions, setFlaggedSessions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const clients = await axios.get('/api/clients/unassigned');
      const flagged = await axios.get('/api/schedule/sessions-with-audit');

      setUnassignedClients(clients.data);
      setFlaggedSessions(flagged.data.filter(s => s.hasAuditWarning));
    };

    load();
  }, []);

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold text-yellow-800">🧠 Smart Suggestions</h3>
      <ul className="list-disc ml-6 mt-2 text-sm text-yellow-900 space-y-1">
        {unassignedClients.length > 0 && (
          <li>{unassignedClients.length} clients need therapist assignment.</li>
        )}
        {flaggedSessions.length > 0 && (
          <li>{flaggedSessions.length} sessions have unresolved ⚠️ audit flags.</li>
        )}
        {unassignedClients.length === 0 && flaggedSessions.length === 0 && (
          <li>🎉 All good! No immediate issues detected.</li>
        )}
      </ul>
    </div>
  );
};

export default AdminSmartSuggestions;
