const QRScanner = ({
    onScan,
    onError,
    facingMode = 'environment', // Default to back camera
    scanDelay = 300, // Default scan delay
  }) => {
    const [scanResult, setScanResult] = useState('');
  
    const handleScan = (data) => {
      if (data) {
        setScanResult(data);
        if (onScan) onScan(data);
  
        if (data.startsWith('https://beckn')) {
          window.location.href = data;
        }
      }
    };
  
    const handleError = (err) => {
      console.error(err);
      if (onError) onError(err);
    };
  
    return (
      <div>
        <QrReader
          delay={scanDelay}
          onError={handleError}
          onScan={handleScan}
          facingMode={facingMode}
          style={{ width: '100%' }}
        />
        <p>Scan Result: {scanResult}</p>
      </div>
    );
  };
  