import React, { useRef, useEffect, useState, useCallback } from 'react';
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
        video.srcObject = stream;
        video.play();

        video.onPlay = () => {
          console.log("video on play");
          const video = currRef.current;
          console.log("video in function --", video);
          const canvas = qrScan.current;
          const context = canvas.getContext('2d');
      
          console.log("-- video --", currRef);
          console.log("-- canvas --", qrScan);
          console.log("-- context --", context);
      
          const width = video.videoWidth;
          const height = video.videoHeight;
      
          console.log(" -- video vw-- ", currRef.current.videoWidth, " video vh-- ", currRef.current.videoHeight);
      
          canvas.width = width;
          canvas.height = height;
      
          context.drawImage(video, 0, 0, width, height);
      
          const imageData = context.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, width, height);
      
          console.log(code);
          alert(code);

        };
      })
      .catch((err) => {
        console.error("Exception while using camera", err);
      });
  };

  // const scanQRCode = useLayoutEffect(() => {
  //   const video = currRef.current;
  //   const canvas = qrScan.current;
  //   const context = canvas.getContext('2d');

  //   console.log("video --", currRef);
  //   console.log("canvas --", qrScan);
  //   console.log("context --", context);

  //   const width = video.videoWidth;
  //   const height = video.videoHeight;

  //   console.log("video vw-- ", currRef.current.videoWidth, " video vh-- ", currRef.current.videoHeight);

  //   canvas.width = 38;
  //   canvas.height = 38;

  //   context.drawImage(video, 0, 0, width, height);

  //   const imageData = context.getImageData(0, 0, width, height);
  //   const code = jsQR(imageData.data, width, height);

  //   console.log(code);
  //   alert(code);

  //   if (code) {


  //     // check underlying OS
  //     // if android
  //     // use android manifest
  //     // check beckn support
  //     // check domain and if current app supports both -- if yes redirect to it || playstore
  //     // if not -- show popup with apps that support


  //     // else
  //     // use ios manifest
  //     // check beckn support
  //     // check domain and if current app supports both -- if yes redirect to it
  //     // if not -- show popup with apps that support or redirect to concerned app || appstore

      
  //     setHasQR(true);

  //     if (code.data.includes("beckn://")) {

  //     }


  //     if (code.data.includes('product')) {
  //       navigate(`/products/${code.data.split('product/')[1]}`);
  //     } else if (code.data.includes('profile')) {
  //       navigate(`/users/${code.data.split('profile/')[1]}`);
  //     } else {
  //       console.log('Unrecognized QR Code format');
  //     }
  //   } else {
  //     requestAnimationFrame(scanQRCode);
  //   }
  // }, [navigate]);

  useEffect(() => {
    getCurrCamera();
  }, []);

  // useEffect(() => {
  //   if (currRef.current) {
  //     currRef.current.addEventListener('play', () => {
  //       scanQRCode();
  //     });
  //   }
  // }, [scanQRCode]);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div className='camera' style={{ width: '100%' , height: '100%' }}>
        <video ref={currRef} style={{ width: 1366, height: 768 }}></video>
        <canvas ref={qrScan} style={{ width: 38, height: 38, display: 'none' }}></canvas>
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
