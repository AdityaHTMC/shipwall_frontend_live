import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';

const ModalTable = ({ handleClose, showModal,currentItems,setSelectedInvoice,setInvoiceSelected }) => {
  const {
    PlaceReturnRequest,
    getARInvoice,
    arInvoiceList,
    getARInvoice1,
    singleBPdata,
  } = useApi();
  const [data, setData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (columnName) => {
    setSortDirection((prevDirection) =>
      sortedColumn === columnName ? (prevDirection === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortedColumn(columnName);
  };

  useEffect(() => {
    // Apply searching
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) => {
        const stringValue = typeof value === 'string' ? value : String(value);
        return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    // Apply sorting to the paginated data
    if (sortedColumn) {
      const sortedData = paginatedData.slice().sort((a, b) => {
        const aValue = typeof a[sortedColumn] === 'string' ? a[sortedColumn] : String(a[sortedColumn]);
        const bValue = typeof b[sortedColumn] === 'string' ? b[sortedColumn] : String(b[sortedColumn]);
  
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
      setData(sortedData);
    } else {
      // If no sorting column is selected, update the data with the paginated data
      setData(paginatedData);
    }
  }, [sortedColumn, sortDirection, searchTerm, currentPage]);

  const getSortIcon = (columnName) => {
    if (sortedColumn === columnName) {
      return sortDirection === 'asc' ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getARInvoice();
      setInvoiceSelected(Array(arInvoiceList?.length).fill(false));
    };
    fetchData();
  }, []);
  

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchInput">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width={200}
            />
          </Form.Group>
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('name')}>Name {getSortIcon('name')}</th>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('position')}>Position {getSortIcon('position')}</th>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('office')}>Office {getSortIcon('office')}</th>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('age')}>Age {getSortIcon('age')}</th>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('start_date')}>Start date {getSortIcon('start_date')}</th>
                <th style={{cursor:'pointer'}} onClick={() => handleSort('salary')}>Salary {getSortIcon('salary')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td>{item.office}</td>
                  <td>{item.age}</td>
                  <td>{item.start_date}</td>
                  <td>{item.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const dummyData = [
  { name: 'John Doe', position: 'Developer', office: 'New old', age: 30, start_date: '2022/01/03', salary: '$8,000' },
  { name: 'John ', position: 'salse', office: 'old York', age: 3, start_date: '2022/01/01', salary: '$80' },
  { name: 'dgdh Doe', position: 'engg', office: 'fast York', age: 18, start_date: '2022/01/05', salary: '$800' },
  { name: 'jhdguyd Doe', position: 'Doc', office: 'abcd', age: 20, start_date: '2022/01/014', salary: '$50,000' },
  { name: 'gdf Doe', position: 'dev', office: 'fake', age: 40, start_date: '2022/01/07', salary: '$70,000' },
];

export default ModalTable;
