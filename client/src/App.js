import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LiveTranscript from "./components/LiveTranscript";
import AIScoreForm from "./components/AIScoreForm";
import ScoreChart from "./components/ScoreChart";
import BadgeAward from "./components/BadgeAward";
import NarratedPrompt from "./components/NarratedPrompt";
import SummaryReport from "./components/SummaryReport";
import SessionRecommendation from "./components/SessionRecommendation";
import RewardsDashboard from "./components/RewardsDashboard";
import RealTimePronunciation from "./components/RealTimePronunciation";
import AdaptiveScoreGauge from "./components/AdaptiveScoreGauge";
import SpeechUploadFeedback from "./components/SpeechUploadFeedback";
import ProgressGauge from "./components/ProgressGauge";
import HistoryFilter from "./components/HistoryFilter";
import UploadEvaluator from "./components/UploadEvaluator";
import AIQuizComponent from "./components/AIQuizComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LiveTranscript />} />
        <Route path="/score" element={<AIScoreForm />} />
        <Route path="/chart" element={<ScoreChart />} />
        <Route path="/badges" element={<BadgeAward />} />
        <Route path="/prompt" element={<NarratedPrompt />} />
        <Route path="/report" element={<SummaryReport />} />
        <Route path="/recommend" element={<SessionRecommendation />} />
        <Route path="/rewards" element={<RewardsDashboard />} />
        <Route path="/pronunciation" element={<RealTimePronunciation />} />
        <Route path="/gauge" element={<AdaptiveScoreGauge />} />
        <Route path="/feedback" element={<SpeechUploadFeedback />} />
        <Route path="/progress" element={<ProgressGauge />} />
        <Route path="/history" element={<HistoryFilter />} />
        <Route path="/evaluate" element={<UploadEvaluator />} />
        <Route path="/quiz" element={<AIQuizComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
