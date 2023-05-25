import React, { Component } from 'react';
import ApiExport from '../apies/ApiExport';

class ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchReportData();
  }

  fetchReportData = async () => {
    try {
      const reportData = await ApiExport.getReport();
      this.setState({ reportData, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { reportData, isLoading, error } = this.state;

    if (isLoading) {
      return React.createElement('div', null, 'Loading...');
    }

    if (error) {
      return React.createElement('div', null, 'Error: ', error);
    }

    return (
      React.createElement('div', null,
        React.createElement('h1', null, 'Report Component'),
        React.createElement('ul', null,
          reportData.map((report, index) => React.createElement('li', { key: index }, report))
        )
      )
    );
  }
}

export default ReportComponent;
