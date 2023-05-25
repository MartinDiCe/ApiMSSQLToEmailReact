import React from 'react';
import './App.css';
import ReportComponent from './component/ReportComponent';

function App() {
  return (
    React.createElement('div', { className: 'App' },
      React.createElement('h1', null, 'My App'),
      React.createElement(ReportComponent, null)
    )
  );
}

export default App;