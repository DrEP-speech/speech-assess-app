import React from 'react';

const statusStyles = {
  scheduled: {
    label: '🕒 Upcoming',
    className: 'bg-yellow-100 text-yellow-700',
  },
  completed: {
    label: '✅ Completed',
    className: 'bg-green-100 text-green-700',
  },
  'no-show': {
    label: '❌ No Show',
    className: 'bg-red-100 text-red-700',
  },
  cancelled: {
    label: '🚫 Cancelled',
    className: 'bg-gray-300 text-gray-700',
  },
};

const SessionStatusBadge = ({ status }) => {
  if (!statusStyles[status]) return null;

  const { label, className } = statusStyles[status];

  return (
    <span className={`text-xs px-2 py-1 rounded ${className}`}>
      {label}
    </span>
  );
};

export default SessionStatusBadge;
