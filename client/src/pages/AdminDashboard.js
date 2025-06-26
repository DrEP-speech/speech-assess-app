import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExportFlaggedSessions from '../components/admin/ExportFlaggedSessions';
import ResolveAuditFlagButton from '../components/admin/ResolveAuditFlagButton';
import ViewAuditLogsModal from '../components/admin/ViewAuditLogsModal';
import GlobalAuditViewer from '../components/admin/GlobalAuditViewer';
import AdminSmartSuggestions from '../components/admin/AdminSmartSuggestions';
import AssignedClientsPanel from '../components/admin/AssignedClientsPanel';

<AdminSmartSuggestions />

const AdminDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [auditModalSession, setAuditModalSession] = useState(null);
  const [showOnlyWarnings, setShowOnlyWarnings] = useState(false);

  const fetchSessions = async () => {
    const res = await axios.get('/api/schedule/sessions-with-audit');
    setSessions(res.data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const flaggedSessions = sessions.filter((s) => s.hasAuditWarning);
  const displaySessions = showOnlyWarnings ? flaggedSessions : sessions;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧠 Admin Dashboard</h1>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOnlyWarnings}
            onChange={(e) => setShowOnlyWarnings(e.target.checked)}
            className="form-checkbox"
          />
          <span className="text-sm text-gray-700">Show Only ⚠️ Audit Warnings</span>
        </label>

        {/* Export Flagged Sessions */}
        <ExportFlaggedSessions flaggedSessions={flaggedSessions} />
      </div>

      {/* Session Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Audit</th>
              <th className="px-4 py-2">Tools</th>
            </tr>
          </thead>
          <tbody>
            {displaySessions.map((session) => (
              <tr key={session._id} className="border-t">
                <td className="px-4 py-2">{session.clientId?.name || 'N/A'}</td>
                <td className="px-4 py-2">{new Date(session.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{session.status}</td>
                <td className="px-4 py-2">
                  {session.hasAuditWarning ? (
                    <span className="text-yellow-600 font-bold">⚠️</span>
                  ) : (
                    <span className="text-green-600">✅</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {session.hasAuditWarning && (
                    <div className="flex items-center space-x-2">
                      <ResolveAuditFlagButton
                        sessionId={session._id}
                        onResolved={fetchSessions}
                      />
                      <button
                        onClick={() => setAuditModalSession(session)}
                        className="text-blue-600 underline text-xs"
                      >
                        View Logs
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global Audit Viewer */}
      <div className="mt-8">
        <GlobalAuditViewer />
      </div>

      {/* View Audit Modal */}
      {auditModalSession && (
        <ViewAuditLogsModal
          sessionId={auditModalSession._id}
          onClose={() => setAuditModalSession(null)}
        />
      )}
    </div>
  );
};
<AssignedClientsPanel />
<AdminThreadViewer childId={selectedChildId} />

export default AdminDashboard;
