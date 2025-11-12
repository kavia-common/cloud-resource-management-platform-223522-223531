import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Keep App for theme demo; Router renders actual pages */}
      <App />
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
