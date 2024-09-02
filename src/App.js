import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';

function App() {
  const currRef = useRef(null);
  const qrScan = useRef(null);

  const [hasQR, setHasQR] = useState(false);
  const navigate = useNavigate();

  const getCurrCamera = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        let video = currRef.current;
        let canvas = qrScan.current;
        const context = canvas.getContext('2d');
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          canvas.width = videoWidth;
          canvas.height = videoHeight;

          video.play().then(() => {
            console.log("Video is playing");
            scanQRCode(); 
          }).catch((error) => {
            console.error("Error while trying to play video", error);
          });
        });
      })
      .catch((err) => {
        console.error("Exception while using camera", err);
      });
  };

  const scanQRCode = () => {
    const video = currRef.current;
    const canvas = qrScan.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        drawBoundingBox(context, code.location);
        console.log("QR Code detected:", code.data);
        setHasQR(true);

        // Future approach -- Check the android manifest of the app in realtime to 
        // check for beckn and domain host support to redirect to current app's store page

        if (code.data.includes("beckn://")) {
            console.log("Supports beckn");
            window.location.href = code.data;
          } else {
            console.log("Does not support beckn");
            navigate("https://ondc.org/");
          }
      } else {
        console.log("No QR code detected");
      }
    }
    requestAnimationFrame(scanQRCode); 
  };

  const drawBoundingBox = (context, location) => {
    if (!location) return;

    console.log("context -- ", context, "location -- ", location);

    context.beginPath();
    context.moveTo(location.topLeftCorner.x, location.topLeftCorner.y);
    context.lineTo(location.topRightCorner.x, location.topRightCorner.y);
    context.lineTo(location.bottomRightCorner.x, location.bottomRightCorner.y);
    context.lineTo(location.bottomLeftCorner.x, location.bottomLeftCorner.y);
    context.closePath();
    context.lineWidth = 4;
    context.strokeStyle = 'red';
    context.stroke();
  };

  useEffect(() => {
    getCurrCamera();
  }, []);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div className='camera' style={{ width: '100%', height: '100%' }}>
        <video ref={currRef} style={{ width: '100%', height: '100%' }}></video>
        <canvas ref={qrScan} style={{ display: 'none' }}></canvas>
        <p>Scan a QR Code</p>
      </div>
      {hasQR && (
        <div className="result hasQR">
          <button onClick={() => setHasQR(false)}>CLOSE</button>
        </div>
      )}
    </div>
  );
}

export default App;


