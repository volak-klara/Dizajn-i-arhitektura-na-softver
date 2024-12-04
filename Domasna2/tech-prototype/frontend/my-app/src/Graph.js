import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Graph = () => {
    const [companies, setCompanies] = useState([]);  
    const [imageUrl, setImageUrl] = useState('');  
    const [companyName, setCompanyName] = useState('');  

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

    const handleFetchGraph = () => {
     
        if (companyName) {
            setImageUrl(`http://localhost:8080/api/graphs/${companyName}`);
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
                    <Link to="/graphs" className="nav-link">Graphs</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            </nav>

            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Company Graphs</h2>

                
                <select
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}  
                    style={{ padding: '10px', fontSize: '1rem', marginRight: '10px' }}
                >
                    <option value="">Select a Company</option>
                    {companyNames.map((company, index) => (
                        <option key={index} value={company}>{company}</option>
                    ))}
                </select>

           
                <button
                    onClick={handleFetchGraph}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#36a0b2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Show Graph
                </button>

                
                {imageUrl && (
                    <div style={{ marginTop: '20px' }}>
                        <img
                            src={imageUrl}
                            alt="Company Graph"
                            style={{ maxWidth: '98%', border: '1px solid #ccc', borderRadius: '6px' }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Graph;
