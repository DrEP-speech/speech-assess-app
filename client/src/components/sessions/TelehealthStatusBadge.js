import React from 'react';

const TelehealthStatusBadge = ({ session }) => {
  if (!session.telehealthLink) {
    return <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">No Link</span>;
  }
  if (!session.hipaaConsent) {
    return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Consent Missing</span>;
  }
  return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Ready</span>;
};

export default TelehealthStatusBadge;
