
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { color } from 'chart.js/helpers';

const FundamentalAnalysis = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [recommendation, setRecommendation] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/companies/names')
            .then(response => setCompanies(response.data))
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            axios.get(`http://localhost:8080/api/companies/analysis?companyName=${selectedCompany}&type=fund`)
                .then(response => {
                    const recommendationData = response.data[0]?.Recommendation;
                    setRecommendation(recommendationData || 'No recommendation available');
                })
                .catch(error => console.error('Error fetching recommendation:', error));
        }
    }, [selectedCompany]);

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/" className="nav-link">StocksMK</Link>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/tech-analysis" className="nav-link">Tech Analysis</Link>
                    <Link to="/fund-analysis" className="nav-link">Fundamental Analysis</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            </nav>

            <div className="app-container">
                <header className="header">
                    <h2>Fundamental Analysis</h2>
                </header>

                <div className="content">
                    <div className="filter-container">
                        <label htmlFor="company-select" className="filter-label">
                            Select company for fundamental analysis:
                        </label>
                        <select
                            id="company-select"
                            className="dropdown"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Select a company</option>
                            {companies.map((company, index) => (
                                <option key={index} value={company}>
                                    {company}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="recommendation-container">
                        {selectedCompany && recommendation && (
                            <div className="recommendation">
                                <h3>Recommendation based on Fundamental Analysis: {recommendation}</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundamentalAnalysis;
