// src/hooks/usePageAnalytics.js
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAnalytics } from '../contexts/AnalyticsContext';

const usePageAnalytics = () => {
  const [startTime, setStartTime] = useState(null);
  const { uploadTimeSpentToFirestore } = useAnalytics();

  useEffect(() => {
    if (localStorage.getItem('cookiesConsent') === 'accepted') {
      setStartTime(new Date());
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const getVisitorID = () => {
    let visitorID = localStorage.getItem('visitorID');
    if (!visitorID) {
      visitorID = uuidv4();
      localStorage.setItem('visitorID', visitorID);
    }
    return visitorID;
  };

  const handleBeforeUnload = () => {
    const endTime = new Date();
    const timeSpent = endTime - startTime;

    if (localStorage.getItem('cookiesConsent') === 'accepted') {
      const visitorID = getVisitorID();
      uploadTimeSpentToFirestore(visitorID, window.location.pathname, timeSpent);
    }
  };
};

export default usePageAnalytics;
