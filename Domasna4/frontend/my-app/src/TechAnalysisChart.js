

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TechAnalysisChart = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/companies/names')
            .then(response => setCompanies(response.data))
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    useEffect(() => {
        if (selectedCompany) {
            axios.get(`http://localhost:8080/api/companies/analysis?companyName=${selectedCompany}&type=tech`)
            // axios.get(`http://localhost:8080/api/analysis/${selectedCompany}`)
            // axios.get(`http://localhost:8080/api/companies/analysis?companyName=${selectedCompany}`)
                .then(response => {
                    let data = response.data;
                    if (typeof data === 'string') {
                        data = JSON.parse(data);
                    }

                    // Sort data by date
                    data.sort((a, b) => {
                        const dateA = a.Date.split('.').reverse().join('-');
                        const dateB = b.Date.split('.').reverse().join('-');
                        return new Date(dateA) - new Date(dateB);
                    });

                    const dates = data.map(item => item.Date);
                    const lastPrices = data.map(item => item.PoslednaCena);
                    const signalLabels = data.map(item => item.Signal); 

                    setChartData({
                        labels: dates,
                        datasets: [
                            {
                                label: 'Posledna Cena',
                                data: lastPrices,
                                borderColor: 'rgb(59, 130, 246)', 
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                borderWidth: 2
                            }
                        ]
                    });
                    setSignals(signalLabels);
                })
                .catch(error => console.error('Error fetching tech analysis:', error));
        }
    }, [selectedCompany]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const index = tooltipItem.dataIndex;
                        const price = tooltipItem.raw;
                        const signal = signals[index];
                        return `Price: ${price} | Signal: ${signal}`;
                    }
                }
            },
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Posledna Cena'
                }
            }
        }
    };

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
                    <h2>Technical Analysis</h2>
                </header>
                <div className="content">
                    <div className="filter-container">
                        <label htmlFor="company-select" className="filter-label">
                            Select company for technical analysis:
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

                    <div className="chart-container" style={{ height: '400px' }}>
                        {selectedCompany && chartData.labels.length > 0 ? (
                            <Line data={chartData} options={options} />
                        ) : (
                            <div className="empty-state">
                                <p>Select a company to view technical analysis</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TechAnalysisChart;



