import React from 'react';

const SessionConfirmationModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const { date, time, type } = session;
  const calendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Therapy+Session+-+${type}&dates=${date.replaceAll(
    '-',
    ''
  )}T${time.replace(':', '')}00Z/${date.replaceAll('-', '')}T${time.replace(':', '')}30Z&details=Speech+therapy+session`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center w-96">
        <h2 className="text-xl font-bold mb-4">✅ Session Scheduled</h2>
        <p className="mb-4">
          A session for <strong>{type}</strong> was scheduled on <strong>{date}</strong> at <strong>{time}</strong>.
        </p>
        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        >
          📅 Add to Google Calendar
        </a>
        <button
          onClick={onClose}
          className="text-blue-600 font-semibold underline hover:text-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SessionConfirmationModal;
