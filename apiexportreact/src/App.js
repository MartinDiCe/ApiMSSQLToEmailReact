import React, { useState, useEffect } from 'react';
import './App.css';
import { getReport } from './apies/ApiExport';
import { ReportComponent } from './component/ReportComponent';

function App() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = async () => {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      const data = await getReport(currentDate);
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>My App</h1>
      <ReportComponent reportData={reportData} />
    </div>
  );
}

export default App;


