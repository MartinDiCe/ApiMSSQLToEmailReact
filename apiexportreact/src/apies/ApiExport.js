import axios from 'axios';

// Conexión con la API
const API_BASE_URL = 'http://apies.apiexport.diceprojects.com:8008/export';

const getReport = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getReport?date=${date}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const downloadCSV = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/downloadCSV?date=${date}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte.csv');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const downloadExcel = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/downloadExcel?date=${date}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte.xlsx');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const sendReportByEmail = async (requestData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendReportByEmail`, requestData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {
  getReport,
  downloadCSV,
  downloadExcel,
  sendReportByEmail,
};
