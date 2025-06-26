import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FailureAlertBadge = ({ therapistId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (therapistId) {
      axios
        .get(`/api/analytics/failures-count?therapistId=${therapistId}`)
        .then((res) => setCount(res.data.count))
        .catch((err) => console.error(err));
    }
  }, [therapistId]);

  if (!count) return null;

  return (
    <span className="ml-2 inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full">
      {count} failures
    </span>
  );
};

export default FailureAlertBadge;
