import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import AppRoutes from './components/Routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;