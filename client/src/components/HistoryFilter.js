
import React from "react";

const HistoryFilter = ({ userId, onLoad }) => {
  const handleLoad = () => {
    if (!userId) return alert("User ID required.");
    onLoad(userId);
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Enter User ID"
        onChange={(e) => onLoad(e.target.value)}
        style={{ padding: "5px", width: "200px" }}
      />
      <button onClick={handleLoad} style={{ marginLeft: "10px" }}>
        Load History
      </button>
    </div>
  );
};

export default HistoryFilter;
