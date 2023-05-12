import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../contexts/AnalyticsContext';

const CookiesConsent = () => {
  const { gtag } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookiesConsent');
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    gtag('event', 'Accept', { event_category: 'Cookies' });
    localStorage.setItem('cookiesConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    gtag('event', 'Deny', { event_category: 'Cookies' });
    localStorage.setItem('cookiesConsent', 'denied');
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="cookie-consent-banner">
      <p>
        We use cookies to improve your experience on our website. By browsing
        this website, you agree to our use of cookies.
      </p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleDeny}>Deny</button>
    </div>
  ) : null;
};

export default CookiesConsent;
