import React, { useState, useEffect } from 'react';
import './App.css';
import ReportComponent from './component/ReportComponent';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      getReportData(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.date); // Corrección aquí
  };

  const handleShowReport = () => {
    getReportData(selectedDate);
  };

  const getReportData = async (date) => {
    try {
      const data = await ReportComponent.getReport(date);
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>My App</h1>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <button onClick={handleShowReport}>Show Report</button>
      <ReportComponent reportData={reportData} />
    </div>
  );
}

export default App;
