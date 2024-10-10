import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const CnicVerificationPage = () => {
  const [cnicFile, setCnicFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selfieImage, setSelfieImage] = useState(null);
  
  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const handleCnicChange = (e) => {
    setCnicFile(e.target.files[0]);
  };

  const startCamera = () => {
    if (videoRef.current) {  // Check if videoRef is not null
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraActive(true);
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
          setMessage('Unable to access the camera. Please check permissions.');
        });
    }
  };

  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const selfieData = canvas.toDataURL('image/png');
      setSelfieImage(selfieData);
    }
  };

  const verifyFaces = async () => {
    // Verification logic...
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>CNIC Verification</h1>
      <input type="file" accept="image/*" onChange={handleCnicChange} required />
      <div>
        {!isCameraActive ? (
          <button type="button" onClick={startCamera}>
            Start Camera
          </button>
        ) : (
          <div>
            <video ref={videoRef} style={{ width: '100%', border: '1px solid black' }}></video>
            <button type="button" onClick={captureSelfie}>
              Capture Selfie
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button type="button" onClick={verifyFaces}>Verify Faces</button>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default CnicVerificationPage;
