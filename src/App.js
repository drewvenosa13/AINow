import React from 'react';
import dotenv from 'dotenv';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import AppRoutes from './components/Routes';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import CookieConsent from './components/CookieConsent';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import 'path-browserify';
import 'os-browserify/browser';

dotenv.config();

function App() {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <Router>
          <div className="App">
            <CookieConsent />
            <Header />
            <AppRoutes />
          </div>
        </Router>
      </AnalyticsProvider>
    </AuthProvider>
  );
}

export default App;