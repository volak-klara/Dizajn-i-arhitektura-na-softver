// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';

// const TechAnalysisChart = () => {
//     const [companies, setCompanies] = useState([]); // За сите компании
//     const [selectedCompany, setSelectedCompany] = useState(''); // За избрана компанија
//     const [chartData, setChartData] = useState({
//         labels: [], 
//         datasets: [] // Почетни податоци за графикот
//     });

//     // Превземи ги компаниите од серверот
//     useEffect(() => {
//         axios.get('http://localhost:8080/api/companies/names') // URL за компаниите
//             .then(response => {
//                 setCompanies(response.data);  // Постави ги компаниите во state
//             })
//             .catch(error => console.error('Error fetching companies:', error));
//     }, []);

//     // Кога ќе се избере компанија, направи повик до серверот
//     useEffect(() => {
//         if (selectedCompany) {
//             axios.get(`http://localhost:8080/api/companies/tech-analysis?companyName=${selectedCompany}`)
//                 .then(response => {
//                     const data = response.data;

//                     if (data && data.length > 0) {
//                         // Подготовка на податоци за график
//                         const dates = data.map(item => item.Date);
//                         const buySignals = data.map(item => item.Signal === 'Buy' ? 1 : 0);
//                         const sellSignals = data.map(item => item.Signal === 'Sell' ? 1 : 0);
//                         const holdSignals = data.map(item => item.Signal === 'Hold' ? 1 : 0);

//                         // Генерирање на податоците за графикот
//                         setChartData({
//                             labels: dates,
//                             datasets: [
//                                 {
//                                     label: 'Buy Signals',
//                                     data: buySignals,
//                                     borderColor: 'green',
//                                     borderWidth: 1,
//                                     fill: false
//                                 },
//                                 {
//                                     label: 'Sell Signals',
//                                     data: sellSignals,
//                                     borderColor: 'red',
//                                     borderWidth: 1,
//                                     fill: false
//                                 },
//                                 {
//                                     label: 'Hold Signals',
//                                     data: holdSignals,
//                                     borderColor: 'yellow',
//                                     borderWidth: 1,
//                                     fill: false
//                                 }
//                             ]
//                         });
//                     } else {
//                         setChartData({
//                             labels: [],
//                             datasets: [] // Ако нема податоци, постави празни вредности
//                         });
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching tech analysis:', error);
//                     setChartData({
//                         labels: [],
//                         datasets: [] // Ако се појави грешка, постави празни вредности
//                     });
//                 });
//         } else {
//             setChartData({
//                 labels: [],
//                 datasets: [] // Ако нема избрана компанија, постави празни вредности
//             });
//         }
//     }, [selectedCompany]);

//     return (
//         <div>
//             <h3>Technical Analysis Chart</h3>
            
//             {/* Dropdown за избор на компанија */}
//             <div className="dropdown-container">
//                 <label htmlFor="company-select">Select a Company:</label>
//                 <select
//                     id="company-select"
//                     value={selectedCompany}
//                     onChange={(e) => setSelectedCompany(e.target.value)}
//                 >
//                     <option value="">Select a company</option>
//                     {companies.map((company, index) => (
//                         <option key={index} value={company}>
//                             {company}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Ако е избрана компанија, прикажи график */}
//             {selectedCompany && chartData.labels.length > 0 && (
//                 <Line data={chartData} />
//             )}
//         </div>
//     );
// };

// export default TechAnalysisChart;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const TechAnalysisChart = () => {
    const [companies, setCompanies] = useState([]); // За сите компании
    const [selectedCompany, setSelectedCompany] = useState(''); // За избрана компанија
    const [chartData, setChartData] = useState({
        labels: [], 
        datasets: [] // Почетни податоци за графикот
    });

    // Превземи ги компаниите од серверот
    useEffect(() => {
        axios.get('http://localhost:8080/api/companies/names') // URL за компаниите
            .then(response => {
                setCompanies(response.data);  // Постави ги компаниите во state
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    // Кога ќе се избере компанија, направи повик до серверот
    useEffect(() => {
        if (selectedCompany) {
            axios.get(`http://localhost:8080/api/companies/tech-analysis?companyName=${selectedCompany}`)
                .then(response => {
                    console.log(response.data); // Логирајте ги податоците од серверот
                    const data = response.data;

                    if (data && data.length > 0) {
                        // Подготовка на податоци за график
                        const dates = data.map(item => item.Date);
                        const buySignals = data.map(item => item.Signal === 'Buy' ? 1 : 0);
                        const sellSignals = data.map(item => item.Signal === 'Sell' ? 1 : 0);
                        const holdSignals = data.map(item => item.Signal === 'Hold' ? 1 : 0);

                        // Генерирање на податоците за графикот
                        setChartData({
                            labels: dates,
                            datasets: [
                                {
                                    label: 'Buy Signals',
                                    data: buySignals,
                                    borderColor: 'green',
                                    borderWidth: 1,
                                    fill: false
                                },
                                {
                                    label: 'Sell Signals',
                                    data: sellSignals,
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    fill: false
                                },
                                {
                                    label: 'Hold Signals',
                                    data: holdSignals,
                                    borderColor: 'yellow',
                                    borderWidth: 1,
                                    fill: false
                                }
                            ]
                        });
                    } else {
                        setChartData({
                            labels: [],
                            datasets: [] // Ако нема податоци, постави празни вредности
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching tech analysis:', error);
                    setChartData({
                        labels: [],
                        datasets: [] // Ако се појави грешка, постави празни вредности
                    });
                });
        } else {
            setChartData({
                labels: [],
                datasets: [] // Ако нема избрана компанија, постави празни вредности
            });
        }
    }, [selectedCompany]);

    // Конфигурација на графикот (опционално)
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category', // Основање на оска X како категорија (датумите)
            },
            y: {
                min: 0,
                max: 1, // За поедноставност, бидејќи сигналите се 0 или 1
            }
        }
    };

    return (
        <div>
            <h3>Technical Analysis Chart</h3>
            
            {/* Dropdown за избор на компанија */}
            <div className="dropdown-container">
                <label htmlFor="company-select">Select a Company:</label>
                <select
                    id="company-select"
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

            {/* Ако е избрана компанија, прикажи график */}
            {selectedCompany && chartData.labels.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
            ) : (
                <p>Please select a company to see the technical analysis chart.</p>
            )}
        </div>
    );
};

export default TechAnalysisChart;
