import axios from 'axios';

const logAuditAction = async ({ sessionId, action, user }) => {
  try {
    await axios.post(`/api/schedule/audit/${sessionId}`, { action, user });
  } catch (err) {
    console.error('Audit log failed:', err);
  }
};

export default logAuditAction;
