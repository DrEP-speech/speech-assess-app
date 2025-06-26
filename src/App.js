import React from 'react';
import ScoreChart from './components/ScoreChart';
import BadgeAward from './components/BadgeAward';
import UploadEvaluator from './components/UploadEvaluator';
import AdaptiveScoreGauge from './components/AdaptiveScoreGauge';
import SpeechUploadFeedback from './components/SpeechUploadFeedback';
import HistoryFilter from './components/HistoryFilter';
import InteractiveScenarioPrompt from './components/InteractiveScenarioPrompt';
import SpeechTrend from './components/SpeechTrend';
import SpeechAnalytics from './components/SpeechAnalytics';
import RealTimePronunciation from './components/RealTimePronunciation';
import SessionRecommendation from './components/SessionRecommendation';
import NarratedPrompt from './components/NarratedPrompt';
import SummaryReport from './components/SummaryReport';
import RewardsDashboard from './components/RewardsDashboard';
import SpeechEmotionAnalyzer from './components/SpeechEmotionAnalyzer';
import SpeechComplexityMeter from './components/SpeechComplexityMeter';
import GrammarFluencyChecker from './components/GrammarFluencyChecker';
import ArticulationHeatMap from './components/ArticulationHeatMap';
import TherapyTimeEstimator from './components/TherapyTimeEstimator';
import SpeechPacingTracker from './components/SpeechPacingTracker';
import LiveTranscript from './components/LiveTranscript';
import AIQuizComponent from './components/AIQuizComponent';
import AdaptiveAICoach from './components/AdaptiveAICoach';
import PronunciationFeedbackMeter from './components/PronunciationFeedbackMeter';
import InteractiveTherapyPlanner from './components/InteractiveTherapyPlanner';
import AssessmentHistoryTimeline from './components/AssessmentHistoryTimeline';
import TherapyGoalTracker from './components/TherapyGoalTracker';
import VoiceProfileAnalysis from './components/VoiceProfileAnalysis';
import ProgressHeatMap from './components/ProgressHeatMap';
import SpeechTherapyInsights from './components/SpeechTherapyInsights';
import ScoreHistoryTable from './components/ScoreHistoryTable';
import VirtualTherapySession from './components/VirtualTherapySession';
import SessionComplianceTracker from './components/SessionComplianceTracker';
import TelehealthVitalsOverlay from './components/TelehealthVitalsOverlay';
import VoicePitchRecognition from './components/VoicePitchRecognition';
import AccentReduction from './components/AccentReduction';
import VocalCoach from './components/VocalCoach';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrammarFluencyChecker from './components/GrammarFluencyChecker';
import ReportCenter from './components/ReportCenter';
import ScoreHistory from './components/ScoreHistory';
import TherapyPlanDownload from './components/TherapyPlanDownload';
import TherapistDashboard from './components/TherapistDashboard';
import ParentDashboard from './components/ParentDashboard';
import TeletherapyLauncher from './components/TeletherapyLauncher';
import PrivateRoute from './components/PrivateRoute';

import AdminControlPanel from './components/AdminControlPanel';
import AssignPatients from './components/AssignPatients';
import SOAPNoteEditor from './components/SOAPNoteEditor';
import VideoRecorder from './components/VideoRecorder';

import GrowthGraphDashboard from './components/GrowthGraphDashboard';
import BenchmarkTracker from './components/BenchmarkTracker';
import ParentProgressSummary from './components/ParentProgressSummary';
import ParentChildSelector from './components/ParentChildSelector';
import SessionScheduler from './components/SessionScheduler';

function App() {
  return (
    <div className="App" style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧠 AI Speech Therapy Platform</h1>
<h1>🧠 AI Speech Therapy Dashboard</h1>

      <LiveTranscript />
      <NarratedPrompt />
      <PronunciationFeedbackMeter />
      <RealTimePronunciation />
      <ScoreChart />
      <BadgeAward />
      <SummaryReport />
      <SessionRecommendation />
      <RewardsDashboard />
      <AIQuizComponent />
      <AdaptiveAICoach />
      <InteractiveTherapyPlanner />
      <AssessmentHistoryTimeline />
      <TherapyGoalTracker />
      <VoiceProfileAnalysis />
      <ProgressHeatMap />
      <SpeechTherapyInsights />

      <UploadEvaluator />
      <AdaptiveScoreGauge />
      <SpeechUploadFeedback />
      <HistoryFilter />
      <InteractiveScenarioPrompt />
      <SpeechTrend />
      <SpeechAnalytics />
      <SpeechEmotionAnalyzer />
      <SpeechComplexityMeter />
      <GrammarFluencyChecker />
      <ArticulationHeatMap />
      <TherapyTimeEstimator />
      <SpeechPacingTracker />
      <ScoreHistoryTable />
<GrammarTips />
<Route path="/vocal-coach" element={<VocalCoach />} />
<Route path="/grammar-check" element={<GrammarFluencyChecker />} />
 <Route path="/grammar-check" element={<GrammarFluencyChecker />} />
        <Route path="/vocal-coach" element={<VocalCoach />} />
        <Route path="/report-center" element={<ReportCenter />} />
        <Route path="/score-history" element={<ScoreHistory />} />
        <Route path="/therapy-plan" element={<TherapyPlanDownload />} />
<Route path="/therapist-dashboard" element={<TherapistDashboard />} />
<Route path="/admin-panel" element={<PrivateRoute role="admin"><AdminControlPanel /></PrivateRoute>} />
<Route path="/assign-patients" element={<PrivateRoute role="admin"><AssignPatients /></PrivateRoute>} />
<Route path="/soap-editor" element={<PrivateRoute role="therapist"><SOAPNoteEditor /></PrivateRoute>} />
<Route path="/video-recorder" element={<PrivateRoute><VideoRecorder /></PrivateRoute>} /><Route path="/parent-dashboard" element={<ParentDashboard />} />

<Route path="/teletherapy" element={<TeletherapyLauncher />} />
      </Routes>
    </Router>
  );
}
<Route
  path="/therapist-dashboard"
  element={
    <PrivateRoute role="therapist">
      <TherapistDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/parent-dashboard"
  element={
    <PrivateRoute role="parent">
      <ParentDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/admin-panel"
  element={
    <PrivateRoute role="admin">
      <AdminControlPanel />
    </PrivateRoute>
  }
/>
<Route
  path="/progress-dashboard"
  element={
    <PrivateRoute role="therapist">
      <GrowthGraphDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/admin-benchmark-tracker"
  element={
    <PrivateRoute role="admin">
      <BenchmarkTracker />
    </PrivateRoute>
  }
/>
<Route
  path="/parent-summary"
  element={
    <PrivateRoute role="parent">
      <ParentProgressSummary />
    </PrivateRoute>
  }
      {/* 🧑‍💻 Telehealth & Virtual Session Components */}
      <VirtualTherapySession />
      <SessionComplianceTracker />
      <TelehealthVitalsOverlay />
 {/* Voice Pitch Recognition Module */}
      <section style={{ marginTop: '40px' }}>
        <h2>🎵 Voice Pitch Recognition</h2>
        <VoicePitchRecognition />
      </section>

      {/* Accent Reduction Module */}
      <section style={{ marginTop: '40px' }}>
        <h2>🌍 Accent Reduction</h2>
        <AccentReduction />
<ScoreRadarChart data={{
  fluencyScore: 8,
  grammarScore: 7,
  clarityScore: 9,
  pacingScore: 8,
  toneScore: 7
}} />
    </div>
  );
}

<Route
  path="/therapy-plan"
  element={
    <PrivateRoute role="parent">
      <>
        <ParentChildSelector onSelect={(childId) => {/* handle per-child logic */}} />
        <TherapyPlanDownload />
      </>
    </PrivateRoute>
  }
/>

<Route
  path="/schedule-session"
  element={
    <PrivateRoute>
      <SessionScheduler />
    </PrivateRoute>
  }
/>
export default App;
