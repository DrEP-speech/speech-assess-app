import React from 'react';

const SpeechEmotionAnalyzer = ({ transcript }) => {
  const safeTranscript = typeof transcript === 'string' ? transcript.toLowerCase() : '';
  const emotionKeywords = {
    happy: ['great', 'awesome', 'happy'],
    sad: ['sad', 'upset', 'tired'],
    angry: ['angry', 'mad', 'furious']
  };

  const emotions = Object.entries(emotionKeywords).reduce((acc, [emotion, words]) => {
    acc[emotion] = words.some(word => safeTranscript.includes(word));
    return acc;
  }, {});

  return (
    <div className="emotion-analyzer">
      <h3>😊 Emotion Analyzer</h3>
      {Object.entries(emotions).map(([emotion, found]) => (
        <p key={emotion}>{emotion}: <strong>{found ? 'Detected' : 'Not Detected'}</strong></p>
      ))}
    </div>
  );
};

export default SpeechEmotionAnalyzer;
