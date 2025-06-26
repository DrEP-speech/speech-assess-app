import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BellCurveChart from './BellCurveChart';
import StandardScoreInfo from './StandardScoreInfo';
import { calculateStandardScore } from '../api/api';

const SummaryReport = ({ transcript, score }) => {
  const generatePDF = () => {
    const input = document.getElementById("report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("speech_session_summary.pdf");
    });
  };

const [standardInfo, setStandardInfo] = useState(null);

const handleScoreSubmit = async () => {
  const rawScore = 37;
  const age = 6;

  const { data } = await calculateStandardScore(rawScore, age);
  setStandardInfo(data);
};
{standardInfo && (
  <>
    <StandardScoreInfo stdScore={standardInfo.standardScore} />
    <BellCurveChart stdScore={standardInfo.standardScore} />
  </>
)}
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div
        id="report"
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
import BellCurveChart from './BellCurveChart';
import StandardScoreInfo from './StandardScoreInfo';

<BellCurveChart stdScore={result.standardScore} />
<StandardScoreInfo stdScore={result.standardScore} />

        <h2>📋 Session Summary</h2>
        <p><strong>Transcript:</strong> {transcript}</p>
        <p><strong>AI Score:</strong> {score}</p>
      </div>
      <button onClick={generatePDF} style={{ marginTop: "20px" }}>⬇️ Download PDF</button>
    </div>
  );
};
export default SummaryReport;