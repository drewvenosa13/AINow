import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../contexts/AnalyticsContext';

const CookiesConsent = () => {
  const { ga } = useAnalytics();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookiesConsent');
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    ga('send', 'event', 'Cookies', 'Accept');
    localStorage.setItem('cookiesConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    ga('send', 'event', 'Cookies', 'Deny');
    localStorage.setItem('cookiesConsent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookies-consent">
      <p>
        We use cookies to improve your experience on our website. By browsing this website, you agree to
        our use of cookies.
      </p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleDeny}>Deny</button>
    </div>
  );
};

export default CookiesConsent;
