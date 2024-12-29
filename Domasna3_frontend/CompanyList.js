


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CompanyList.css';
// import { Link } from 'react-router-dom';

// const CompanyList = () => {
//     const [companies, setCompanies] = useState([]); // За сите компании
//     const [companyNames, setCompanyNames] = useState([]); // За имињата на компаниите
//     const [selectedCompanyName, setSelectedCompanyName] = useState(''); // За избраната компанија
//     const [currentPage, setCurrentPage] = useState(0);
//     const [pageSize, setPageSize] = useState(50);

//     useEffect(() => {
//         // Превземи имиња на компании
//         axios
//             .get(`http://localhost:8080/api/companies/names`)
//             .then(response => {
//                 setCompanyNames(response.data);
//             })
//             .catch(error => console.error('Error fetching company names:', error));
//     }, []);

//     useEffect(() => {
//         // Превземи податоци за компаниите
//         axios
//             .get(`http://localhost:8080/api/companies?page=${currentPage}&size=${pageSize}`)
//             .then(response => {
//                 setCompanies(response.data.content || []);
//             })
//             .catch(error => console.error('Error fetching companies:', error));
//     }, [currentPage, pageSize]);

//     const handleNextPage = () => setCurrentPage(prev => prev + 1);
//     const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

//     // Филтрирање на компаниите според избраната компанија
//     const filteredCompanies = selectedCompanyName
//         ? companies.filter(company => company.name === selectedCompanyName)
//         : companies;

//     const companyList = filteredCompanies.map(company => (
//         <tr key={company.id}>
//             <td>{company.name}</td>
//             <td>{company.stockSymbol}</td>
//             <td>${parseFloat(company.lastPrice).toFixed(2)}</td>
//             <td>${parseFloat(company.averagePrice).toFixed(2)}</td>
//             <td>{company.date}</td>
//         </tr>
//     ));

//     return (
//         <>
//             <nav className="navbar">
//                 <div className="logo">
//                     <Link to="/" className="nav-link">StocksMK</Link>
//                 </div>
//                 <div className="nav-links">
//                     <Link to="/" className="nav-link">Home</Link>
//                     <Link to="/graphs" className="nav-link">Graphs</Link>
//                     <Link to="/login" className="nav-link">Login</Link>
//                     <Link to="/register" className="nav-link">Register</Link>
//                 </div>
//             </nav>

//             <div className="app-container">
//                 <header className="header">
//                     <h2>Company List</h2>
//                 </header>
//                 <div className="content">
//                     <div className="filter-container">
//                         <label htmlFor="company-select" className="filter-label">
//                             Show information for particular company:
//                         </label>
//                         <select
//                             id="company-select"
//                             className="dropdown"
//                             value={selectedCompanyName}
//                             onChange={(e) => setSelectedCompanyName(e.target.value)}
//                         >
//                             <option value="">All Companies</option>
//                             {companyNames.map((name, index) => (
//                                 <option key={index} value={name}>
//                                     {name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <table className="company-table">
//                         <thead>
//                             <tr>
//                                 <th>Company Name</th>
//                                 <th>Stock Symbol</th>
//                                 <th>Last Price</th>
//                                 <th>Average Price</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {companyList}
//                         </tbody>
//                     </table>
//                     <div className="pagination-controls">
//                         <button 
//                             onClick={handlePreviousPage} 
//                             disabled={currentPage === 0}>
//                             Previous
//                         </button>
//                         <span>Page {currentPage + 1}</span>
//                         <button 
//                             onClick={handleNextPage}>
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CompanyList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyList.css';
import { Link } from 'react-router-dom';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]); // За сите компании
    const [companyNames, setCompanyNames] = useState([]); // За имињата на компаниите
    const [selectedCompanyName, setSelectedCompanyName] = useState(''); // За избраната компанија
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(0); // За вкупен број на страници

    useEffect(() => {
        // Превземи имиња на компании
        axios
            .get('http://localhost:8080/api/companies/names')
            .then(response => {
                setCompanyNames(response.data);
            })
            .catch(error => console.error('Error fetching company names:', error));
    }, []);

    useEffect(() => {
        // Превземи податоци за компаниите
        const params = {
            page: currentPage,
            size: pageSize,
            name: selectedCompanyName || undefined, // Додај name параметар ако е избрано
        };
        axios
            .get('http://localhost:8080/api/companies', { params })
            .then(response => {
                setCompanies(response.data.content || []);
                setTotalPages(response.data.totalPages); // Постави вкупен број на страници
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, [currentPage, pageSize, selectedCompanyName]); // Повторно повикај кога е избран ново име или се менува страната

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Филтрирање на компаниите според избраната компанија
    const companyList = companies.map(company => (
        <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.stockSymbol}</td>
            <td>${parseFloat(company.lastPrice).toFixed(2)}</td>
            <td>${parseFloat(company.averagePrice).toFixed(2)}</td>
            <td>{company.date}</td>
        </tr>
    ));

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/" className="nav-link">StocksMK</Link>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/graphs" className="nav-link">Graphs</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            </nav>

            <div className="app-container">
                <header className="header">
                    <h2>Company List</h2>
                </header>
                <div className="content">
                    <div className="filter-container">
                        <label htmlFor="company-select" className="filter-label">
                            Show information for particular company:
                        </label>
                        <select
                            id="company-select"
                            className="dropdown"
                            value={selectedCompanyName}
                            onChange={(e) => setSelectedCompanyName(e.target.value)}
                        >
                            <option value="">All Companies</option>
                            {companyNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <table className="company-table">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Stock Symbol</th>
                                <th>Last Price</th>
                                <th>Average Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyList}
                        </tbody>
                    </table>
                    <div className="pagination-controls">
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span>Page {currentPage + 1} of {totalPages}</span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyList;
