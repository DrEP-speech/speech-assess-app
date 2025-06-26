import React, { useState } from 'react';

const SpeechSessionRating = ({ onRate }) => {
  const [rating, setRating] = useState(null);

  const handleRating = (score) => {
    setRating(score);
    onRate && onRate(score);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Rate This Session</h3>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          style={{ margin: '5px', fontSize: '20px', color: rating >= star ? 'gold' : 'gray' }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default SpeechSessionRating;
