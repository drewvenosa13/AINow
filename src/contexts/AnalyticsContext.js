import React, { useContext, createContext, useState, useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../components/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

export const AnalyticsProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const gtag = (event, action, parameters) => {
    logEvent(analytics, event, { ...parameters, event_action: action });
  };

  return (
    <AnalyticsContext.Provider
      value={{ gtag }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
