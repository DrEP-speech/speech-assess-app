useEffect(() => {
  if (active) {
    logAuditAction({
      sessionId,
      action: 'Started session timer',
      user: 'Therapist A'
    });
  } else if (seconds > 0) {
    logAuditAction({
      sessionId,
      action: `Stopped session timer at ${formatTime()}`,
      user: 'Therapist A'
    });
  }
}, [active]);
