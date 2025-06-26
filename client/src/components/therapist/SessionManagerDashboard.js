import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import RescheduleModal from '../shared/RescheduleModal';
import FlagIndicator from '../shared/FlagIndicator';
import SessionDetailsModal from '../shared/SessionDetailsModal';
import 'react-calendar/dist/Calendar.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BatchSessionPDFDocument from '../pdf/BatchSessionPDFDocument';

const SessionManagerDashboard = ({ therapistId }) => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionType, setSessionType] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selected, setSelected] = useState([]);
  const [modalSession, setModalSession] = useState(null);
  const [detailsModalSession, setDetailsModalSession] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, [therapistId]);

  const fetchSessions = async () => {
    const { data } = await axios.get(`/api/schedule/therapist/${therapistId}`);
    setSessions(data);
  };

  const now = new Date();

  const filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    const dateMatch = selectedDate ? sessionDate.toDateString() === selectedDate.toDateString() : true;
    const typeMatch = sessionType === 'all' ? true : s.type === sessionType;
    const searchMatch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const timeMatch = filter === 'upcoming' ? sessionDate >= now : filter === 'past' ? sessionDate < now : true;
    return dateMatch && typeMatch && searchMatch && timeMatch;
  });

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectAll = () => {
    const all = filteredSessions.map((s) => s._id);
    setSelected((prev) => (prev.length === all.length ? [] : all));
  };

  const markSelectedComplete = async () => {
    for (const id of selected) {
      await axios.put(`/api/schedule/complete/${id}`);
    }
    alert('Sessions marked complete.');
    setSelected([]);
    fetchSessions();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white shadow rounded">
      {/* Calendar Filter */}
      <div className="col-span-1">
        <h3 className="font-bold mb-2">🗓 Filter by Date</h3>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        {selectedDate && (
          <button className="mt-2 text-sm text-red-600 hover:underline" onClick={() => setSelectedDate(null)}>
            Clear date filter
          </button>
        )}
      </div>

      {/* Session List + Filters */}
      <div className="col-span-2">
   const regenerateAISummary = async (sessionId) => {
  try {
    const res = await fetch(`/api/schedule/ai-summary/${sessionId}`, {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      alert('✅ AI Summary regenerated.');
      setSession({ ...session, aiSummary: data.aiSummary }); // optional: rehydrate modal
    } else {
      alert('⚠️ Failed to generate AI Summary.');
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error regenerating summary.');
  }
};
    
 <h2 className="text-xl font-semibold mb-4">📋 Manage Sessions</h2>
{session && (
  <button
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    onClick={() => regenerateAISummary(session._id)}
  >
    🔁 Regenerate AI Summary
  </button>
)}

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} className="border p-2 rounded">
            <option value="all">All Types</option>
            <option value="Articulation">Articulation</option>
            <option value="Language">Language</option>
            <option value="Swallowing">Swallowing</option>
            <option value="Cognitive">Cognitive</option>
            <option value="Fluency">Fluency</option>
          </select>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-3">
          <button onClick={selectAll} className="text-sm text-blue-600 hover:underline">
            {selected.length === filteredSessions.length ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={markSelectedComplete}
            disabled={selected.length === 0}
            className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            ✅ Mark Complete ({selected.length})
{selected.length > 0 && (
  <PDFDownloadLink
    document={<BatchSessionPDFDocument sessions={sessions.filter(s => selected.includes(s._id))} />}
    fileName="batch_session_export.pdf"
    className="bg-indigo-700 text-white px-3 py-1 text-sm rounded"
  >
    {({ loading }) => loading ? 'Preparing PDF...' : '📄 Export Selected'}
  </PDFDownloadLink>
)}
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {filteredSessions.map((s) => (
            <li key={s._id} className="py-3 flex justify-between items-start">
              <div className="flex items-start gap-3 w-full">
                <input type="checkbox" checked={selected.includes(s._id)} onChange={() => toggleSelect(s._id)} />
                <div className="w-full">
                  <p className="font-medium">
                    {s.name} – {s.date} at {s.time}
                    {s.attended && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✅ Completed
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{s.type}</p>

                  {/* Flag Viewer */}
                  <FlagIndicator flags={s.flags} autoAlerts={s.autoAlerts} />

                  {/* View Details Button */}
                  <div className="flex gap-3 mt-2 text-xs">
                    <button
                      onClick={() => setDetailsModalSession(s)}
                      className="text-purple-600 hover:underline"
                    >
                      🗂 View Details
                    </button>
                    <button
                      onClick={() => setModalSession(s)}
                      className="text-blue-600 hover:underline"
                    >
                      🕒 Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Reschedule Modal */}
        {modalSession && (
          <RescheduleModal
            session={modalSession}
            onClose={() => setModalSession(null)}
            onReschedule={fetchSessions}
          />
        )}

        {/* Session Detail Modal (full control) */}
        {detailsModalSession && (
          <SessionDetailsModal
            session={detailsModalSession}
            onClose={() => setDetailsModalSession(null)}
            onSave={fetchSessions}
          />
        )}
{session.aiSummary && (
  <span className="ml-2 text-green-600 text-xs font-semibold">✅ AI Summary Generated</span>
)}
      </div>
    </div>
  );
};

export default SessionManagerDashboard;

