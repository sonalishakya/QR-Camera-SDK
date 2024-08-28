import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScan, onError }) => {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      if (onScan) onScan(data); // Callback for handling scan results
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (onError) onError(err); // Callback for handling errors
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>Scan Result: {scanResult}</p>
    </div>
  );
};

export default QRScanner;
