import React from 'react';

const AutoSummaryFeedback = ({ summary }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h3>AI Summary Feedback</h3>
      <p>{summary || "Summary feedback will appear here after the session."}</p>
    </div>
  );
};

export default AutoSummaryFeedback;
