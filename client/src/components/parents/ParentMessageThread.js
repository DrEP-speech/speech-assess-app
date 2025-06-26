import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentMessageThread = ({ childId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/thread/${childId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages', err);
      }
    };
    fetchMessages();
  }, [childId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(`/api/messages/send`, {
        childId,
        senderRole: 'parent',
        content: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  return (
    <div className="bg-white border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">🗨️ Message Therapist</h3>
      <div className="h-40 overflow-y-auto mb-3 border rounded p-2 text-sm">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <span className="font-medium text-gray-700">{msg.senderRole}:</span>{' '}
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border px-2 py-1 rounded text-sm"
          placeholder="Type your message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ParentMessageThread;
