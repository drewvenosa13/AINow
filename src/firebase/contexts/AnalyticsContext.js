// src/contexts/AnalyticsContext.js
import React, { useContext, createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { recordPageView } from '../services/pageviewsService';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

export const AnalyticsProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);
      } else {
        setUserId(null);
        setEmail(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const recordPage = (page, timeSpent, startTime) => { // update function parameters to include startTime
    if (email) {
      recordPageView(email, page, timeSpent, startTime); // pass startTime to recordPageView
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{ recordPage, userId }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
