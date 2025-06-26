import axios from 'axios';

export const logConsentReminderView = async (sessionId, userId) => {
  try {
    await axios.post('/api/audit/log', {
      sessionId,
      userId,
      action: 'Consent modal viewed',
      category: 'telehealth',
      success: true,
      details: 'Therapist was shown HIPAA consent reminder before starting session',
    });
  } catch (err) {
    console.error('Failed to log consent modal view:', err);
  }
};
