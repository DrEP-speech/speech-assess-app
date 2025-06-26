import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SmartSessionMatcher = ({ userPreferredTimes }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const { data } = await axios.get('/api/availability');
      const best = [];

      data.forEach((day) => {
        const overlap = day.slots.filter((slot) => userPreferredTimes.includes(slot));
        if (overlap.length) {
          best.push({ date: day.date, slots: overlap });
        }
      });

      setMatches(best);
    };

    fetchAvailability();
  }, [userPreferredTimes]);

  return (
    <div className="mt-6 bg-white shadow p-6 rounded-xl">
      <h2 className="text-lg font-bold mb-3">🧠 Matched Session Times</h2>
      {matches.length === 0 ? (
        <p>No matches found. Adjust preferred time range.</p>
      ) : (
        matches.map((m) => (
          <div key={m.date}>
            <strong>{m.date}:</strong> {m.slots.join(', ')}
          </div>
        ))
      )}
    </div>
  );
};

export default SmartSessionMatcher;
