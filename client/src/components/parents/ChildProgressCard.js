import React from 'react';

const ChildProgressCard = ({ data }) => {
  return (
    <div className="p-4 rounded-xl bg-white border shadow space-y-2">
      <h3 className="text-lg font-semibold">{data.childName}</h3>
      <p className="text-sm text-gray-600">Therapist: {data.therapistName || 'Unassigned'}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="text-blue-600 text-md font-bold">
          {data.recentScore || 'N/A'}%
        </div>
        <div className="text-sm text-gray-500">
          {data.lastSessionDate ? `Last session: ${new Date(data.lastSessionDate).toLocaleDateString()}` : 'No sessions yet'}
        </div>
      </div>
      <div className="text-xs text-green-700">
        {data.progressNote || 'Progress tracking in progress.'}
      </div>
    </div>
  );
};

export default ChildProgressCard;
