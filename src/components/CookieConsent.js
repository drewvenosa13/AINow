import React, { useState } from 'react';

const CookieConsent = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  if (consentGiven) {
    return null;
  }

  const handleConsent = () => {
    setConsentGiven(true);
    // Save consent to localStorage or a cookie to persist across sessions
    localStorage.setItem('cookieConsent', 'true');
    // Enable additional tracking scripts or analytics here
  };

  return (
    <div className="cookie-consent-banner">
      <p>
        This website uses cookies to enhance your user experience. By clicking "Accept," you consent to the use of cookies.
      </p>
      <button onClick={handleConsent}>Accept</button>
    </div>
  );
};

export default CookieConsent;
