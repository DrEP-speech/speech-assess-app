import React from 'react';
import axios from 'axios';

const ResolveAuditFlagButton = ({ sessionId, onResolved }) => {
  const handleResolve = async () => {
    await axios.post(`/api/audit/resolve-flag`, { sessionId });
    if (onResolved) onResolved();
  };

  return (
    <button
      onClick={handleResolve}
      className="text-xs text-green-700 underline ml-2"
      title="Mark as resolved"
    >
      ✅ Resolve Flag
    </button>
  );
};

export default ResolveAuditFlagButton;
