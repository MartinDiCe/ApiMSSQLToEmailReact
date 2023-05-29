import React, { useEffect, useState } from 'react';
import apiExport from '../apies/ApiExport';

const ReportComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      console.log('Fecha:', date);
      const reportData = await apiExport.getReport(date);
      console.log(reportData);
      setData(reportData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener el informe:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Report Component</h1>
      {data.length === 0 ? (
        <div>Sin datos para la fecha seleccionada</div>
      ) : (
        <ul>
          {data.map((report, index) => (
            <li key={index}>{report}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportComponent;


