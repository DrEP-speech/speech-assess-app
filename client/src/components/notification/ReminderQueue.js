import React, { useEffect, useState } from 'react';

const ReminderQueue = ({ checkInTime, onReminderTriggered }) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!checkInTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(checkInTime).getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown("Now");
        onReminderTriggered && onReminderTriggered();
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkInTime, onReminderTriggered]);

  return (
    <div className="text-sm p-2 text-yellow-600">
      {countdown ? `Parent check-in in: ${countdown}` : "No check-in scheduled"}
    </div>
  );
};

export default ReminderQueue;
