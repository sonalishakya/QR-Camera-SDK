const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      if (onScan) onScan(data);
  
      // Example Beckn URL detection (customize based on actual Beckn URL pattern)
      if (data.startsWith('https://beckn')) {
        window.location.href = data; // Redirect to Beckn link
      } else {
        console.warn('Scanned QR code is not a Beckn link.');
      }
    }
  };
  