import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyList.css'; 
import { Link } from 'react-router-dom';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyName, setSelectedCompanyName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/companies/all')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCompanies(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const companyNames = [...new Set(companies.map(company => company.name))];
    const filteredCompanies = selectedCompanyName
        ? companies.filter(company => company.name === selectedCompanyName)
        : companies;

    const companyList = filteredCompanies.map(company => (
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
                    <label htmlFor="company-select" className="filter-label">Show information for particular company:</label>
                    <select
                        id="company-select"
                        className="dropdown"
                        value={selectedCompanyName}
                        onChange={(e) => setSelectedCompanyName(e.target.value)}
                    >
                        <option value="">All Companies</option>
                        {companyNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
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
            </div>
        </div>
        </>
    );
};

export default CompanyList;
