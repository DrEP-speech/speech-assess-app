import React from 'react';

const FlagIndicator = ({ flags = [], autoAlerts = {} }) => {
  const allFlags = [...flags];
  if (autoAlerts?.missingNotes) allFlags.push('📝 Missing Notes');
  if (autoAlerts?.missingAttendance) allFlags.push('🚫 Not Marked Attended');

  return allFlags.length > 0 ? (
    <ul className="text-xs text-red-600 mt-1 list-disc ml-4 space-y-0.5">
      {allFlags.map((f, idx) => (
        <li key={idx}>{f}</li>
      ))}
    </ul>
  ) : null;
};

export default FlagIndicator;
