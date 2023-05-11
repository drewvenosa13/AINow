// src/hooks/usePageAnalytics.js
import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const usePageAnalytics = () => {
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('cookiesConsent') === 'accepted') {
      setStartTime(new Date());
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    const endTime = new Date();
    const timeSpent = endTime - startTime;
    console.log('Time spent on the page:', timeSpent, 'ms');
    // Here, you can send the timeSpent data to your server or Firebase for further processing
  };
};

export default usePageAnalytics;
