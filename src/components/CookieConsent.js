// CookiesConsent.js
import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from '../components/firebase';

const CookieConsent = () => {
  const { gtag, userId } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookiesConsent');
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    gtag('event', 'Accept', { event_category: 'Cookies' });
    localStorage.setItem('cookiesConsent', 'accepted');
    setIsVisible(false);
    if (userId) {
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, { cookiesAccepted: true }, { merge: true });
    }
  };

  const handleDeny = async () => {
    gtag('event', 'Deny', { event_category: 'Cookies' });
    localStorage.setItem('cookiesConsent', 'denied');
    setIsVisible(false);
    if (userId) {
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, { cookiesAccepted: false }, { merge: true });
    }
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

export default CookieConsent;
