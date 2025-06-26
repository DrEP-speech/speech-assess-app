import React, { useState } from 'react';
import axios from 'axios';

const ExportAssignedClients = () => {
  const [therapistId, setTherapistId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const downloadExport = async (type) => {
    const params = { therapistId, startDate, endDate };
    const response = await axios.get(`/api/admin/assigned-clients/export?type=${type}`, {
      params,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `assigned_clients.${type}`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow space-y-3">
      <h3 className="text-lg font-semibold">Export Assigned Clients</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Therapist ID (optional)"
          value={therapistId}
          onChange={(e) => setTherapistId(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>
      <div className="space-x-2">
        <button
          onClick={() => downloadExport('csv')}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={() => downloadExport('pdf')}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Export PDF
        </button>
<button
  onClick={() => downloadExport('xlsx')}
  className="bg-purple-600 text-white px-4 py-1 rounded"
>
  Export XLSX
</button>
      </div>
    </div>
  );
};
<button
  onClick={async () => {
    await axios.post('/api/admin/assigned-clients/email-export', {
      therapistId,
      startDate,
      endDate,
    });
    alert('Email sent to your inbox');
  }}
  className="bg-gray-800 text-white px-4 py-1 rounded"
>
  Email CSV Export
</button>


export default ExportAssignedClients;
