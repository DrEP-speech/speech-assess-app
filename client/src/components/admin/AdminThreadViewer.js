import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminThreadViewer = ({ childId }) => {
  const [thread, setThread] = useState([]);

  useEffect(() => {
    if (!childId) return;
    axios.get(`/api/admin/messages/thread/${childId}`).then((res) => {
      setThread(res.data);
    });
  }, [childId]);

  return (
    <div className="border p-4 rounded-xl bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Message Thread</h3>
      {thread.map((msg, idx) => (
        <div key={idx} className="mb-2">
          <strong>{msg.senderType === 'parent' ? 'Parent' : 'Therapist'}:</strong>
          <p>{msg.text}</p>
          <small className="text-gray-500">{new Date(msg.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default AdminThreadViewer;
