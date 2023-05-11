import React, { useContext, createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../components/firebase';
import { logPageTimeSpent } from '../services/firestoreService';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();
  const [startTime, setStartTime] = useState(new Date());

  const uploadTimeSpentToFirestore = () => {
    const endTime = new Date();
    const timeSpent = endTime - startTime;
    logEvent(analytics, 'time_spent', {
      page_path: location.pathname,
      time_spent: timeSpent
    });
  };

  const logPageView = () => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname
    });
  };

  return (
    <AnalyticsContext.Provider value={{ uploadTimeSpentToFirestore, logPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
