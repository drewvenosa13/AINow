import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import AppRoutes from './components/Routes';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import CookieConsent from './components/CookieConsent';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import usePageAnalytics from './hooks/usePageAnalytics';

const PageWrapper = ({ children }) => {
  usePageAnalytics();
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsProvider>
          <PageWrapper>
            <div className="App">
              <CookieConsent />
              <Header />
              <AppRoutes />
            </div>
          </PageWrapper>
        </AnalyticsProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
