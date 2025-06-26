import React, { useRef, useState } from 'react';

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => setRecordedChunks((prev) => [...prev, e.data]);
    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      setVideoURL(URL.createObjectURL(blob));
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold">🎥 Record Session</h2>
      <video ref={videoRef} autoPlay className="w-full h-64 border my-4" />
      <div className="space-x-2">
        <button onClick={startRecording} className="bg-blue-600 text-white px-4 py-2 rounded">Start</button>
        <button onClick={stopRecording} className="bg-red-600 text-white px-4 py-2 rounded">Stop</button>
      </div>
      {videoURL && (
        <div className="mt-4">
          <h3 className="font-semibold">📺 Playback</h3>
          <video controls src={videoURL} className="w-full h-64 mt-2" />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
