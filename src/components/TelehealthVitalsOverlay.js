import React, { useEffect, useState } from 'react';

const TelehealthVitalsOverlay = () => {
  const [vitals, setVitals] = useState({ heartRate: 0, oxygen: 0 });

  useEffect(() => {
    // Simulated data fetch or sensor input
    const interval = setInterval(() => {
      setVitals({
        heartRate: Math.floor(Math.random() * 30) + 70,
        oxygen: Math.floor(Math.random() * 5) + 95,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vitals-overlay">
      <h2>🫀 Live Vitals</h2>
      <p>Heart Rate: {vitals.heartRate} bpm</p>
      <p>Oxygen Saturation: {vitals.oxygen}%</p>
    </div>
  );
};

export default TelehealthVitalsOverlay;
