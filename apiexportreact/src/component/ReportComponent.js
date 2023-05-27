import React, { useEffect, useState } from 'react';
import apiExport from '../apies/ApiExport';

const ReportComponent = ({ reportData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      console.log('Fecha:', date);
      const data = await apiExport.getReport(date); // Llama a getReport directamente sin hacer referencia a ReportComponent
      setData(data);
    } catch (error) {
      console.error('Error al obtener el informe:', error);// Depuración: muestra el error capturado
    }
  };

  return (
    <div>
      <h1>Report Component</h1>
      <ul>
        {data.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>
    </div>
  );
};

ReportComponent.getReport = async (date) => {
  try {
    const response = await apiExport.get(`/export/getReport?date=${date}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el informe');
  }
};

export default ReportComponent;

