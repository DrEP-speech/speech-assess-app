
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Cron Jobs
const { startAutoExportJob } = require('./cron/autoExport');
startAutoExportJob();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/scores', require('./routes/scoreRoutes'));
app.use('/api/accent', require('./routes/accentRoutes'));
app.use('/api/pitch', require('./routes/pitchRoutes'));
app.use('/api/emotion', require('./routes/emotionRoutes'));
app.use('/api/vocal-coach', require('./routes/vocalCoachRoutes'));
app.use('/api/grammar', require('./routes/grammarRoutes'));
app.use('/api/email', require('./routes/emailRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/scoring', require('./routes/scoringRoutes'));
app.use('/api/norms', require('./routes/normRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));
app.use('/api/therapists', require('./routes/therapistRoutes'));
app.use('/api/parents', require('./routes/parentRoutes'));
app.use('/api/follow-up', require('./routes/followUpRoutes'));
app.use('/api/soap-export', require('./routes/soapExportRoutes'));
app.use('/api/session-export', require('./routes/sessionExportRoutes'));
app.use('/api/session-ai', require('./routes/generateAISOAPSummary'));
app.use('/api/admin', require('./routes/adminClientExportRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('🎤 Speech Assessment API is running...');
});

// ✅ Render-compatible PORT binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
