function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

function parseBecknURI(uri) {
  const url = new URL(uri);
  return {
    scheme: url.protocol.replace(':', ''), // Remove trailing colon
    host: url.host,
  };
}

// Function to check if the parsed URI matches the manifest configuration
function checkBecknLinkCompatibility(parsedURI) {
  // Values from your Android Manifest
  const supportedScheme = 'beckn';
  const supportedHosts = ['ret10.ondc', 'ret11.ondc'];

  // Check if the scheme and host match the manifest
  return (
    parsedURI.scheme === supportedScheme &&
    supportedHosts.includes(parsedURI.host)
  );
}

// Main function to handle the Beckn URI
function handleBecknURI(uri) {
  if (!isAndroid()) {
    alert('This function is only supported on Android devices.');
    return;
  }

  const parsedURI = parseBecknURI(uri);
  const isCompatible = checkBecknLinkCompatibility(parsedURI);

  if (isCompatible) {
    alert('The current app supports this Beckn link.');
    // Proceed with handling the URI (e.g., deep linking)
    window.location.href = uri;
  } else {
    alert('The current app does not support this Beckn link.');
    // Optionally, redirect to Play Store or show other supported apps
    window.location.href = 'https://play.google.com/store/search?q=beckn';
  }
}

// Example usage
const becknLink = 'beckn://ret10.ondc/path/to/resource';
handleBecknURI(becknLink);
