
import React, { useEffect, useRef } from "react";

const AdaptiveScoreGauge = ({ score }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const startAngle = -Math.PI / 2;
    const endAngle = (2 * Math.PI * score) / 100 + startAngle;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background circle
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 15;
    ctx.stroke();

    // Dynamic score arc
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, startAngle, endAngle);
    ctx.strokeStyle = score < 50 ? "#f44336" : score < 75 ? "#ff9800" : "#4caf50";
    ctx.lineWidth = 15;
    ctx.stroke();

    // Score text
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${score}%`, radius, radius);
  }, [score]);

  return (
    <div style={{ margin: "20px auto", width: "200px", textAlign: "center" }}>
      <canvas ref={canvasRef} width="200" height="200" />
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        {score < 50 ? "Needs Practice" : score < 75 ? "Good" : "Excellent"}
      </p>
    </div>
  );
};

export default AdaptiveScoreGauge;
