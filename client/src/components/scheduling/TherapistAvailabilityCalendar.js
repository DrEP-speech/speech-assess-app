import React from 'react';

const mockAvailability = [
  { date: '2025-06-25', slots: ['10:00', '11:00', '13:00'] },
  { date: '2025-06-26', slots: ['09:00', '14:00'] },
  { date: '2025-06-27', slots: ['08:30', '12:30', '15:30'] }
];

const TherapistAvailabilityCalendar = ({ onSelect }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl mt-6">
      <h3 className="text-lg font-bold mb-3">🗓️ Available Time Slots</h3>
      {mockAvailability.map((day) => (
        <div key={day.date} className="mb-4">
          <div className="font-semibold">{day.date}</div>
          <div className="flex gap-2 mt-1">
            {day.slots.map((slot) => (
              <button
                key={slot}
                onClick={() => onSelect(day.date, slot)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TherapistAvailabilityCalendar;
