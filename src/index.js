import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'C:/Users/drewv/Downloads/__pycache__/newBlogSite/ai-now/ai-now/src/contexts/AuthContext.js';
import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
