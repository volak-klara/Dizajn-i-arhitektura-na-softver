

// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import './CompanyList.css';
// // // import { Link } from 'react-router-dom';

// // // const CompanyList = () => {
// // //     const [companies, setCompanies] = useState([]); 
// // //     const [companyNames, setCompanyNames] = useState([]); 
// // //     const [selectedCompanyName, setSelectedCompanyName] = useState(''); 
// // //     const [currentPage, setCurrentPage] = useState(0);
// // //     const [pageSize, setPageSize] = useState(50);
// // //     const [totalPages, setTotalPages] = useState(0); 

// // //     useEffect(() => {
        
// // //         axios
// // //             .get('http://localhost:8080/api/companies/names')
// // //             .then(response => {
// // //                 setCompanyNames(response.data);
// // //             })
// // //             .catch(error => console.error('Error fetching company names:', error));
// // //     }, []);

// // //     useEffect(() => {
        
// // //         const params = {
// // //             page: currentPage,
// // //             size: pageSize,
// // //             name: selectedCompanyName || undefined, 
// // //         };
// // //         axios
// // //             .get('http://localhost:8080/api/companies', { params })
// // //             .then(response => {
// // //                 setCompanies(response.data.content || []);
// // //                 setTotalPages(response.data.totalPages); 
// // //             })
// // //             .catch(error => console.error('Error fetching companies:', error));
// // //     }, [currentPage, pageSize, selectedCompanyName]); 

// // //     const handleNextPage = () => {
// // //         if (currentPage < totalPages - 1) {
// // //             setCurrentPage(prev => prev + 1);
// // //         }
// // //     };

// // //     const handlePreviousPage = () => {
// // //         if (currentPage > 0) {
// // //             setCurrentPage(prev => prev - 1);
// // //         }
// // //     };

    
// // //     const companyList = companies.map(company => (
// // //         <tr key={company.id}>
// // //             <td>{company.name}</td>
// // //             <td>{company.stockSymbol}</td>
// // //             <td>${parseFloat(company.lastPrice).toFixed(2)}</td>
// // //             <td>${parseFloat(company.averagePrice).toFixed(2)}</td>
// // //             <td>{company.date}</td>
// // //         </tr>
// // //     ));

// // //     return (
// // //         <>
// // //             <nav className="navbar">
// // //                 <div className="logo">
// // //                     <Link to="/" className="nav-link">StocksMK</Link>
// // //                 </div>
// // //                 <div className="nav-links">
// // //                     <Link to="/" className="nav-link">Home</Link>
// // //                     <Link to="/tech-analysis" className="nav-link">TechAnalysis</Link>
// // //                     <Link to="/login" className="nav-link">Login</Link>
// // //                     <Link to="/register" className="nav-link">Register</Link>
// // //                 </div>
// // //             </nav>

// // //             <div className="app-container">
// // //                 <header className="header">
// // //                     <h2>Company List</h2>
// // //                 </header>
// // //                 <div className="content">
// // //                     <div className="filter-container">
// // //                         <label htmlFor="company-select" className="filter-label">
// // //                             Show information for particular company:
// // //                         </label>
// // //                         <select
// // //                             id="company-select"
// // //                             className="dropdown"
// // //                             value={selectedCompanyName}
// // //                             onChange={(e) => setSelectedCompanyName(e.target.value)}
// // //                         >
// // //                             <option value="">All Companies</option>
// // //                             {companyNames.map((name, index) => (
// // //                                 <option key={index} value={name}>
// // //                                     {name}
// // //                                 </option>
// // //                             ))}
// // //                         </select>
// // //                     </div>
// // //                     <table className="company-table">
// // //                         <thead>
// // //                             <tr>
// // //                                 <th>Company Name</th>
// // //                                 <th>Stock Symbol</th>
// // //                                 <th>Last Price</th>
// // //                                 <th>Average Price</th>
// // //                                 <th>Date</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {companyList}
// // //                         </tbody>
// // //                     </table>
// // //                     <div className="pagination-controls">
// // //                         <button 
// // //                             onClick={handlePreviousPage} 
// // //                             disabled={currentPage === 0}>
// // //                             Previous
// // //                         </button>
// // //                         <span>Page {currentPage + 1} of {totalPages}</span>
// // //                         <button 
// // //                             onClick={handleNextPage} 
// // //                             disabled={currentPage === totalPages - 1}>
// // //                             Next
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </>
// // //     );
// // // };

// // // export default CompanyList;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './CompanyList.css';
// // import { Link } from 'react-router-dom';

// // const CompanyList = () => {
// //     const [companies, setCompanies] = useState([]);
// //     const [companyNames, setCompanyNames] = useState([]);
// //     const [selectedCompanyName, setSelectedCompanyName] = useState('');
// //     const [availableDates, setAvailableDates] = useState([]); // Достапни датуми за селектираната компанија
// //     const [startDate, setStartDate] = useState('');
// //     const [endDate, setEndDate] = useState('');
// //     const [currentPage, setCurrentPage] = useState(0);
// //     const [pageSize, setPageSize] = useState(50);
// //     const [totalPages, setTotalPages] = useState(0);

// //     useEffect(() => {
// //         // Земаме имиња на компании
// //         axios
// //             .get('http://localhost:8080/api/companies/names')
// //             .then(response => {
// //                 setCompanyNames(response.data);
// //             })
// //             .catch(error => console.error('Error fetching company names:', error));
// //     }, []);

// //     useEffect(() => {
// //         // Земаме листа на достапни датуми за селектираната компанија
// //         if (selectedCompanyName) {
// //             axios
// //                 .get(`http://localhost:8080/api/companies/dates`, {
// //                     params: { companyName: selectedCompanyName }
// //                 })
// //                 .then(response => {
// //                     setAvailableDates(response.data);
// //                 })
// //                 .catch(error => console.error('Error fetching dates:', error));
// //         } else {
// //             setAvailableDates([]);
// //         }
// //     }, [selectedCompanyName]);

// //     useEffect(() => {
// //         // Земаме компании според селектирани филтри (компанија, датум од, датум до)
// //         const params = {
// //             page: currentPage,
// //             size: pageSize,
// //             name: selectedCompanyName || undefined,
// //             startDate: startDate || undefined,
// //             endDate: endDate || undefined
// //         };
// //         axios
// //             .get('http://localhost:8080/api/companies', { params })
// //             .then(response => {
// //                 setCompanies(response.data.content || []);
// //                 setTotalPages(response.data.totalPages);
// //             })
// //             .catch(error => console.error('Error fetching companies:', error));
// //     }, [currentPage, pageSize, selectedCompanyName, startDate, endDate]);

// //     const handleNextPage = () => {
// //         if (currentPage < totalPages - 1) {
// //             setCurrentPage(prev => prev + 1);
// //         }
// //     };

// //     const handlePreviousPage = () => {
// //         if (currentPage > 0) {
// //             setCurrentPage(prev => prev - 1);
// //         }
// //     };

// //     const companyList = companies.map(company => (
// //         <tr key={company.id}>
// //             <td>{company.name}</td>
// //             <td>{company.stockSymbol}</td>
// //             <td>${parseFloat(company.lastPrice).toFixed(2)}</td>
// //             <td>${parseFloat(company.averagePrice).toFixed(2)}</td>
// //             <td>{company.date}</td>
// //         </tr>
// //     ));

// //     return (
// //         <>
// //             <nav className="navbar">
// //                 <div className="logo">
// //                     <Link to="/" className="nav-link">StocksMK</Link>
// //                 </div>
// //                 <div className="nav-links">
// //                     <Link to="/" className="nav-link">Home</Link>
// //                     <Link to="/tech-analysis" className="nav-link">TechAnalysis</Link>
// //                     <Link to="/login" className="nav-link">Login</Link>
// //                     <Link to="/register" className="nav-link">Register</Link>
// //                 </div>
// //             </nav>

// //             <div className="app-container">
// //                 <header className="header">
// //                     <h2>Company List</h2>
// //                 </header>
// //                 <div className="content">
// //                     <div className="filter-container">
// //                         <label htmlFor="company-select" className="filter-label">
// //                             Show information for particular company:
// //                         </label>
// //                         <select
// //                             id="company-select"
// //                             className="dropdown"
// //                             value={selectedCompanyName}
// //                             onChange={(e) => {
// //                                 setSelectedCompanyName(e.target.value);
// //                                 setStartDate(''); // Reset filters when company changes
// //                                 setEndDate('');
// //                             }}
// //                         >
// //                             <option value="">All Companies</option>
// //                             {companyNames.map((name, index) => (
// //                                 <option key={index} value={name}>
// //                                     {name}
// //                                 </option>
// //                             ))}
// //                         </select>

// //                         {availableDates.length > 0 && (
// //                             <>
// //                                 <label htmlFor="start-date" className="filter-label">
// //                                     Start Date:
// //                                 </label>
// //                                 <select
// //                                     id="start-date"
// //                                     className="dropdown"
// //                                     value={startDate}
// //                                     onChange={(e) => setStartDate(e.target.value)}
// //                                 >
// //                                     <option value="">Select Start Date</option>
// //                                     {availableDates.map((date, index) => (
// //                                         <option key={index} value={date}>
// //                                             {date}
// //                                         </option>
// //                                     ))}
// //                                 </select>

// //                                 <label htmlFor="end-date" className="filter-label">
// //                                     End Date:
// //                                 </label>
// //                                 <select
// //                                     id="end-date"
// //                                     className="dropdown"
// //                                     value={endDate}
// //                                     onChange={(e) => setEndDate(e.target.value)}
// //                                 >
// //                                     <option value="">Select End Date</option>
// //                                     {availableDates.map((date, index) => (
// //                                         <option key={index} value={date}>
// //                                             {date}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </>
// //                         )}
// //                     </div>
// //                     <table className="company-table">
// //                         <thead>
// //                             <tr>
// //                                 <th>Company Name</th>
// //                                 <th>Stock Symbol</th>
// //                                 <th>Last Price</th>
// //                                 <th>Average Price</th>
// //                                 <th>Date</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {companyList}
// //                         </tbody>
// //                     </table>
// //                     <div className="pagination-controls">
// //                         <button
// //                             onClick={handlePreviousPage}
// //                             disabled={currentPage === 0}>
// //                             Previous
// //                         </button>
// //                         <span>Page {currentPage + 1} of {totalPages}</span>
// //                         <button
// //                             onClick={handleNextPage}
// //                             disabled={currentPage === totalPages - 1}>
// //                             Next
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default CompanyList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CompanyList.css';
// import { Link } from 'react-router-dom';

// const CompanyList = () => {
//     const [companies, setCompanies] = useState([]);
//     const [companyNames, setCompanyNames] = useState([]);
//     const [selectedCompanyName, setSelectedCompanyName] = useState('');
//     const [dates, setDates] = useState([]);
//     const [selectedDate, setSelectedDate] = useState('');
//     const [currentPage, setCurrentPage] = useState(0);
//     const [pageSize, setPageSize] = useState(50);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/companies/names')
//             .then(response => setCompanyNames(response.data))
//             .catch(error => console.error('Error fetching company names:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedCompanyName) {
//             axios.get(`http://localhost:8080/api/companies/dates`, {
//                 params: { name: selectedCompanyName }
//             })
//             .then(response => setDates(response.data))
//             .catch(error => console.error('Error fetching dates:', error));
//         } else {
//             setDates([]);
//         }
//     }, [selectedCompanyName]);

//     useEffect(() => {
//         const params = {
//             page: currentPage,
//             size: pageSize,
//             name: selectedCompanyName || undefined,
//             date: selectedDate || undefined,
//         };

//         axios.get('http://localhost:8080/api/companies', { params })
//             .then(response => {
//                 setCompanies(response.data.content || []);
//                 setTotalPages(response.data.totalPages);
//             })
//             .catch(error => console.error('Error fetching companies:', error));
//     }, [currentPage, pageSize, selectedCompanyName, selectedDate]);

//     const handleNextPage = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(prev => prev - 1);
//         }
//     };

//     const companyList = companies.map(company => (
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
//             <div className="filter-container">
//                 <label htmlFor="company-select">Company:</label>
//                 <select
//                     id="company-select"
//                     value={selectedCompanyName}
//                     onChange={(e) => setSelectedCompanyName(e.target.value)}
//                 >
//                     <option value="">All Companies</option>
//                     {companyNames.map((name, index) => (
//                         <option key={index} value={name}>{name}</option>
//                     ))}
//                 </select>

//                 {dates.length > 0 && (
//                     <>
//                         <label htmlFor="date-select">Date:</label>
//                         <select
//                             id="date-select"
//                             value={selectedDate}
//                             onChange={(e) => setSelectedDate(e.target.value)}
//                         >
//                             <option value="">All Dates</option>
//                             {dates.map((date, index) => (
//                                 <option key={index} value={date}>{date}</option>
//                             ))}
//                         </select>
//                     </>
//                 )}
//             </div>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Company Name</th>
//                         <th>Stock Symbol</th>
//                         <th>Last Price</th>
//                         <th>Average Price</th>
//                         <th>Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {companyList}
//                 </tbody>
//             </table>

//             <div>
//                 <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
//                 <span>Page {currentPage + 1} of {totalPages}</span>
//                 <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
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
    const [companies, setCompanies] = useState([]);
    const [companyNames, setCompanyNames] = useState([]);
    const [selectedCompanyName, setSelectedCompanyName] = useState('');
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/companies/names')
            .then(response => {
                setCompanyNames(response.data);
            })
            .catch(error => console.error('Error fetching company names:', error));
    }, []);

    useEffect(() => {
        if (selectedCompanyName) {
            axios
                .get('http://localhost:8080/api/companies/dates', {
                    params: { name: selectedCompanyName }
                })
                .then(response => {
                    setDates(response.data);
                })
                .catch(error => console.error('Error fetching dates:', error));
        } else {
            setDates([]);
        }
    }, [selectedCompanyName]);

    useEffect(() => {
        const params = {
            page: currentPage,
            size: pageSize,
            name: selectedCompanyName || undefined,
            date: selectedDate || undefined,
        };

        axios
            .get('http://localhost:8080/api/companies', { params })
            .then(response => {
                setCompanies(response.data.content || []);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, [currentPage, pageSize, selectedCompanyName, selectedDate]);

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
                    <Link to="/tech-analysis" className="nav-link">TechAnalysis</Link>
                    <Link to="/fund-analysis" className="nav-link">Fundamental Analysis</Link>
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
                            onChange={(e) => {
                                setSelectedCompanyName(e.target.value);
                                setSelectedDate(''); // Reset the date when changing company
                            }}
                        >
                            <option value="">All Companies</option>
                            {companyNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>

                        {dates.length > 0 && (
                            <>
                                <label htmlFor="date-select" className="filter-label">
                                    Select a date:
                                </label>
                                <select
                                    id="date-select"
                                    className="dropdown"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                >
                                    <option value="">All Dates</option>
                                    {dates.map((date, index) => (
                                        <option key={index} value={date}>
                                            {date}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
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
