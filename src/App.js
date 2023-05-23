import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/header';
import AppRoutes from './components/Routes';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import { AnalyticsProvider, useAnalytics } from './contexts/AnalyticsContext';
import axios from './axiosConfig';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const { recordPage } = useAnalytics();

  useEffect(() => {
    const startTime = new Date();

    return () => {
      const endTime = new Date();
      const timeSpent = endTime - startTime;
      recordPage(location.pathname, timeSpent, startTime); // pass startTime here
    };
  }, [location, recordPage]);

  return <>{children}</>;
};

function App() {
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get('/'); // no longer using /api/ping
        console.log(response.data);
      } catch (error) {
        console.log('Failed to connect to the server:', error);
      }
    };
  
    checkServerConnection();
  }, []);
  
  return (
    <AuthProvider>
      <Router>
        <AnalyticsProvider>
          <PageWrapper>
            <div className="App">
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
