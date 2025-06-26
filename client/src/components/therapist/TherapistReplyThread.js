import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TherapistReplyThread = ({ childId }) => {
  const [messages, setMessages] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    axios.get(`/api/messages/thread/${childId}`).then(res => {
      setMessages(res.data);
    });
  }, [childId]);

  const sendReply = async () => {
    if (!newReply.trim()) return;
    const res = await axios.post(`/api/messages/send`, {
      childId,
      senderRole: 'therapist',
      content: newReply,
    });
    setMessages([...messages, res.data]);
    setNewReply('');
  };

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h3 className="text-md font-semibold mb-2">🗨️ Parent Message Thread</h3>
      <div className="overflow-y-auto max-h-48 text-sm border p-2 rounded mb-2">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-1">
            <strong className="capitalize">{msg.senderRole}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          className="flex-1 px-2 py-1 border rounded text-sm"
          placeholder="Reply to parent..."
        />
        <button
          onClick={sendReply}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default TherapistReplyThread;
