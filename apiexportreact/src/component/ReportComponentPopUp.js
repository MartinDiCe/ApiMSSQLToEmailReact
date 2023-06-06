import React from 'react';
import './ReportComponentPopUp.css';

const ITEMS_PER_PAGE = 10;

const ReportComponentPopUp = ({
  report,
  items,
  currentPage,
  onPageChange,
  onClose,
  filterOrder,
  onFilterOrderChange,
}) => {
  if (!report) {
    return null;
  }

  const { order, executeDate, type } = report;
  const filteredItems = items.filter((item) => item.order === order && item.order.includes(filterOrder));

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="popup-container">
      <div className="popup-inner">
        <h2>ORDER ITEMS ({order})</h2>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
        <div className="filter-container">
          <label htmlFor="filterOrder">Filtrar por Order:</label>
          <input type="text" id="filterOrder" value={filterOrder} onChange={onFilterOrderChange} />
        </div>
        {paginatedItems.length > 0 ? (
          <>
            <table className="popup-table">
              <thead>
                <tr>
                  <th>EXECUTE DATE</th>
                  <th>ITEM</th>
                  <th>TYPE</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id}>
                    <td>{executeDate}</td>
                    <td>{item.item}</td>
                    <td>{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length > ITEMS_PER_PAGE && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredItems.length / ITEMS_PER_PAGE) }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>No hay items disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ReportComponentPopUp;
