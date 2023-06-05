import React, { useEffect, useState, useCallback } from 'react';
import { getReport } from '../apies/ApiExport';
import './ReportComponent.css';
import Popup from './ReportComponentPopUp'; 


const ReportComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchReportData = useCallback(async () => {
    try {
      const date = selectedDate ? selectedDate : new Date().toISOString().slice(0, 10);
      console.log('Fecha:', date);
      const reportData = await getReport(date);
      const uniqueData = removeDuplicates(reportData, 'order', 'executeDate');
      if (uniqueData.length === 0) {
        setError('Sin datos para la fecha seleccionada');
        setData([]);
      } else {
        setData(uniqueData);
        setError(null);
      }
      console.log('Data: ', uniqueData);
    } catch (error) {
      console.error('Error al obtener el informe:', error);
      setError('Error al obtener el informe');
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    fetchReportData();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderItems = () => {
    if (currentItems.length === 0) {
      return <div>Sin datos para la fecha seleccionada</div>;
    }
  
    return (
      <table className="report-table">
        <thead>
          <tr>
            <th>Execute Date</th>
            <th>Error Message</th>
            <th>Order</th>
            <th>Type</th>
            <th>Sap Code</th>
            <th>File Name</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((report, index) => (
            <tr key={index}>
              <td>{getFormattedDate(report.executeDate)}</td>
              <td className="error-message" data-full-text={report.errorMessage}>
                {report.errorMessage.length > 20
                  ? `${report.errorMessage.substring(0, 20)}...`
                  : report.errorMessage}
                <div className="warning-popup">{report.errorMessage}</div>
              </td>
              <td>{report.order}</td>
              <td>{report.type}</td>
              <td>{report.sapCode}</td>
              <td>{report.fileName}</td>
              <td>{report.status}</td>
              <td>
                <button onClick={() => handleOpenPopup(report)}>Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleOpenPopup = (report) => {
    setSelectedReport(report);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  };

  const pageNumbers = Math.ceil(data.length / itemsPerPage);
  const pagination = Array.from({ length: pageNumbers }, (_, index) => index + 1);

  const removeDuplicates = (data, field1, field2) => {
    const uniqueData = [];
    const uniqueSet = new Set();

    data.forEach((item) => {
      const key = `${item[field1]}_${item[field2]}`;
      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        uniqueData.push(item);
      }
    });

    return uniqueData;
  };

  return (
    <div>
      <h1>Report Component</h1>
      <div>
        <label htmlFor="date">Seleccionar fecha:</label>
        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error ? <div>Error: {error}</div> : renderItems()}
      <div>
        {pagination.map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      {isPopupOpen && (
        <Popup report={selectedReport} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export { getReport, ReportComponent };

