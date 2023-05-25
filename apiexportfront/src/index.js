import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReportComponent from './reportComponent';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ReportComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
