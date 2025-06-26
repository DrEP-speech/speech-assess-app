import React from 'react';

const RecentlyAssignedFilter = ({ selectedRange, setSelectedRange }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <label className="text-sm font-medium text-gray-700">Filter:</label>
      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
        className="border px-2 py-1 rounded text-sm"
      >
        <option value="all">All Clients</option>
        <option value="7">Assigned in Last 7 Days</option>
        <option value="30">Assigned in Last 30 Days</option>
      </select>
    </div>
  );
};

export default RecentlyAssignedFilter;
